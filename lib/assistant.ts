import "server-only";
import { createClient } from "@/lib/supabase/server";
import { docFromSitePage, staticKnowledge, type KnowledgeDoc } from "@/lib/assistant-knowledge";
import type { SitePage } from "@/lib/site-content";

const STOP_WORDS = new Set(["the", "and", "for", "are", "you", "your", "with", "that", "this", "have", "has", "how", "what", "who", "where", "when", "why", "can", "does", "did", "was", "were", "will", "would", "could", "should", "about", "from", "into", "there", "their", "they", "them", "our", "out", "any", "all", "some", "want", "need", "please", "tell", "give", "get", "know", "like", "more", "much", "many", "may", "his", "her", "its", "not", "but", "yes", "hello"]);

/** Short words that still carry meaning here; every other 1-2 letter token is dropped. */
const SHORT_TERMS = new Set(["un", "fkf", "sdg", "3d", "ai"]);

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
const tokenize = (value: string) =>
  normalize(value)
    .split(/\s+/)
    .map(word => (word.length > 3 && word.endsWith("s") ? word.slice(0, -1) : word))
    .filter(word => !STOP_WORDS.has(word) && (word.length >= 3 || SHORT_TERMS.has(word)));

/** Whole-word occurrences of a (de-pluralised) token, so "is" cannot match "vision". */
const countMatches = (haystack: string, token: string) =>
  haystack.match(new RegExp(`\\b${token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:e?s)?\\b`, "g"))?.length ?? 0;

/**
 * The knowledge base the assistant may answer from: every published page (CMS copy wins
 * over the built-in copy) plus the hand-written docs for pages that are not CMS driven.
 */
export async function getKnowledgeBase(): Promise<KnowledgeDoc[]> {
  const docs = [...staticKnowledge];
  try {
    const { data } = await (await createClient())
      .from("cms_pages")
      .select("path,eyebrow,title,description,sections,cta")
      .eq("published", true);
    for (const row of data ?? []) {
      const page: SitePage = {
        path: row.path,
        eyebrow: row.eyebrow ?? "",
        title: row.title,
        description: row.description ?? "",
        sections: Array.isArray(row.sections) ? row.sections : [],
        cta: row.cta ?? undefined,
      };
      const doc = docFromSitePage(page);
      const index = docs.findIndex(existing => existing.id === doc.id);
      if (index === -1) docs.push(doc);
      else docs[index] = doc;
    }
  } catch {
    // Live content is optional - the built-in copy already covers every public page.
  }
  return docs;
}

export type ScoredDoc = { doc: KnowledgeDoc; score: number };

/** Keyword retrieval over the knowledge base. Small corpus, so a plain scorer is enough. */
export function retrieve(question: string, docs: KnowledgeDoc[], limit = 6): ScoredDoc[] {
  const asked = normalize(question);
  const tokens = tokenize(question);
  if (!tokens.length) return [];

  const scored = docs.map(doc => {
    const title = normalize(doc.title);
    const keywords = normalize(doc.keywords.join(" "));
    const body = normalize(doc.body);
    let score = 0;
    let bodyScore = 0;

    for (const keyword of doc.keywords) {
      const phrase = normalize(keyword).trim();
      if (phrase.includes(" ") && asked.includes(phrase)) score += 6;
    }
    for (const token of new Set(tokens)) {
      if (countMatches(title, token)) score += 4;
      if (countMatches(keywords, token)) score += 3;
      bodyScore += Math.min(countMatches(body, token), 2);
    }

    // Long documents (the founder biography, for instance) hit common words in almost
    // every question, so body matches are damped by length while title and keyword
    // matches keep their full weight.
    return { doc, score: score + bodyScore * (600 / (600 + body.length)) };
  });

  return scored
    .filter(entry => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/** Formats retrieved documents as the grounding context handed to the model. */
export function buildContext(results: ScoredDoc[], maxChars = 9000): string {
  const blocks: string[] = [];
  let used = 0;
  for (const { doc } of results) {
    const block = `--- ${doc.title} (page: ${doc.path}) ---\n${doc.body}`;
    if (used + block.length > maxChars) break;
    blocks.push(block);
    used += block.length;
  }
  return blocks.join("\n\n");
}

/** Pages worth linking under an answer - only the ones that clearly matched the question. */
export function sourcesFrom(results: ScoredDoc[], limit = 3) {
  const seen = new Set<string>();
  const sources: { title: string; path: string }[] = [];
  const best = results[0]?.score ?? 0;
  const floor = Math.max(3, best * 0.6);
  for (const { doc, score } of results) {
    if (score < floor || seen.has(doc.path)) continue;
    seen.add(doc.path);
    sources.push({ title: doc.title, path: doc.path });
    if (sources.length === limit) break;
  }
  return sources;
}
