"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type Source = { title: string; path: string };
type Message = { role: "user" | "assistant"; content: string; sources?: Source[] };

const GREETING: Message = {
  role: "assistant",
  content: "Hello! I can answer questions about the Francis Koroma Foundation using the information published on this website. What would you like to know?",
};

const SUGGESTIONS = ["What does the Foundation do?", "Tell me about the founder", "How can I volunteer?", "How do I donate?"];

const CONTACT_EMAIL = "info@franciskoromafoundation.org";

/** Turns site paths and email addresses inside an answer into real links. */
function renderAnswer(text: string) {
  const pattern = /(\/[a-z][a-z0-9-]*(?:\/[a-z0-9-]+)*|[\w.+-]+@[\w-]+\.[\w.-]+\w)/g;
  return text.split("\n").map((line, lineIndex) => {
    const parts: React.ReactNode[] = [];
    let cursor = 0;
    for (const match of line.matchAll(pattern)) {
      const value = match[0];
      const start = match.index ?? 0;
      const previous = start > 0 ? line[start - 1] : " ";
      if (value.startsWith("/") && /[\w/]/.test(previous)) continue;
      if (start > cursor) parts.push(line.slice(cursor, start));
      parts.push(
        value.includes("@") ? (
          <a key={`${lineIndex}-${start}`} href={`mailto:${value}`} className="font-medium text-[#9b7600] underline underline-offset-2 break-all">
            {value}
          </a>
        ) : (
          <Link key={`${lineIndex}-${start}`} href={value} className="font-medium text-[#9b7600] underline underline-offset-2">
            {value}
          </Link>
        ),
      );
      cursor = start + value.length;
    }
    if (cursor < line.length) parts.push(line.slice(cursor));
    return (
      <span key={lineIndex} className="block [&+&]:mt-2">
        {parts.length ? parts : line}
      </span>
    );
  });
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [csrf, setCsrf] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || csrf) return;
    fetch("/api/auth/csrf")
      .then(response => response.json())
      .then(data => setCsrf(data.csrfToken))
      .catch(() => setError("The assistant is unavailable right now."));
  }, [open, csrf]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function send(question: string) {
    const message = question.trim();
    if (!message || busy) return;

    const history = messages.filter(entry => entry !== GREETING).slice(-6).map(({ role, content }) => ({ role, content }));
    setMessages(current => [...current, { role: "user", content: message }]);
    setInput("");
    setError("");
    setBusy(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "content-type": "application/json", "x-csrf-token": csrf },
        body: JSON.stringify({ message, history }),
      });
      const data = await response.json();
      if (!response.ok) setError(data.error ?? "Something went wrong. Please try again.");
      else setMessages(current => [...current, { role: "assistant", content: data.reply, sources: data.sources }]);
    } catch {
      setError(`The assistant could not be reached. Please email ${CONTACT_EMAIL}.`);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen(value => !value)}
        aria-expanded={open}
        aria-controls="fkf-assistant"
        aria-label={open ? "Close the FKF Assistant" : "Open the FKF Assistant"}
        className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#d4a501] text-black shadow-xl transition hover:bg-[#e1b726] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>

      {/* Chat window */}
      {open && (
        <div
          id="fkf-assistant"
          role="dialog"
          aria-label="FKF Assistant"
          className="fixed bottom-24 left-4 right-4 z-50 flex h-[70vh] max-h-[34rem] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl sm:left-auto sm:right-6 sm:w-96"
        >
          <div className="flex items-center justify-between border-b bg-[#d4a501] px-4 py-3">
            <div>
              <p className="font-semibold text-black">FKF Assistant</p>
              <p className="text-xs text-black/70">Answers based on this website</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close the assistant" className="rounded-full p-1 text-black hover:bg-black/10">
              <X className="size-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={index} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    message.role === "user"
                      ? "max-w-[85%] rounded-2xl rounded-br-sm bg-[#d4a501] px-4 py-2.5 text-sm text-black"
                      : "max-w-[90%] rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-2.5 text-sm leading-6 text-slate-800"
                  }
                >
                  {message.role === "assistant" ? renderAnswer(message.content) : message.content}

                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-3 border-t border-slate-200 pt-2">
                      <p className="text-xs font-semibold text-slate-500">Related pages</p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {message.sources.map(source => (
                          <Link
                            key={source.path}
                            href={source.path}
                            onClick={() => setOpen(false)}
                            className="rounded-full bg-white px-2.5 py-1 text-xs text-slate-700 shadow-sm ring-1 ring-slate-200 hover:ring-[#d4a501]"
                          >
                            {source.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {messages.length === 1 && !busy && (
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map(suggestion => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => send(suggestion)}
                    disabled={!csrf}
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-700 transition hover:border-[#d4a501] hover:bg-amber-50 disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {busy && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-3" aria-hidden="true">
                  <span className="size-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                  <span className="size-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                  <span className="size-2 animate-bounce rounded-full bg-slate-400" />
                </div>
              </div>
            )}

            <p aria-live="polite" className="sr-only">
              {busy ? "The assistant is typing" : messages.at(-1)?.role === "assistant" ? messages.at(-1)?.content : ""}
            </p>

            {error && (
              <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}
          </div>

          <form
            onSubmit={event => { event.preventDefault(); send(input); }}
            className="flex items-center gap-2 border-t p-3"
          >
            <label htmlFor="fkf-assistant-input" className="sr-only">Ask the FKF Assistant a question</label>
            <input
              id="fkf-assistant-input"
              ref={inputRef}
              value={input}
              onChange={event => setInput(event.target.value)}
              maxLength={600}
              autoComplete="off"
              placeholder="Type a message..."
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-[#d4a501]"
            />
            <button
              type="submit"
              disabled={busy || !csrf || !input.trim()}
              aria-label="Send message"
              className="rounded-lg bg-[#d4a501] p-2.5 text-black transition hover:bg-[#e1b726] disabled:opacity-40"
            >
              <Send className="size-4" />
            </button>
          </form>

          <p className="border-t bg-slate-50 px-4 py-2 text-center text-[11px] text-slate-500">
            Need a person? <Link href="/contact" onClick={() => setOpen(false)} className="underline">Contact the Foundation</Link>
          </p>
        </div>
      )}
    </>
  );
}
