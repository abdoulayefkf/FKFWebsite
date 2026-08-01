import { pages, siteUrl, type SitePage } from "@/lib/site-content";

export type KnowledgeDoc = {
  id: string;
  title: string;
  path: string;
  keywords: string[];
  body: string;
};

export const assistantContact = {
  email: "info@franciskoromafoundation.org",
  donationEmail: "donate@franciskoromafoundation.org",
  contactPath: "/contact",
};

/** Turns a CMS/static page record into a retrievable document. */
export function docFromSitePage(page: SitePage): KnowledgeDoc {
  const sections = page.sections.map(section => {
    const items = section.items?.length ? ` Includes: ${section.items.join(", ")}.` : "";
    return `${section.title}: ${section.body}${items}`;
  });
  const cta = page.cta ? `Related link: ${page.cta.label} (${page.cta.href}).` : "";
  return {
    id: `page:${page.path}`,
    title: page.title,
    path: page.path,
    keywords: [page.eyebrow, ...(page.sections.flatMap(section => section.items ?? []))],
    body: [page.eyebrow, page.description, ...sections, cta].filter(Boolean).join("\n"),
  };
}

/**
 * Content that lives in hand-built pages (home, founder, leadership) rather than in
 * `site-content.ts` / the CMS. Keep this in sync when those pages change.
 */
export const handWrittenDocs: KnowledgeDoc[] = [
  {
    id: "foundation-overview",
    title: "Francis Koroma Foundation overview",
    path: "/",
    keywords: ["who are you", "what is fkf", "nonprofit", "501c3", "charity", "organization", "mission", "purpose", "social media", "linkedin", "instagram", "facebook", "youtube"],
    body: `The Francis Koroma Foundation (FKF) is a United States-based 501(c)(3) nonprofit organization. It empowers the next generation of global leaders and changemakers by helping young people navigate the transition into adulthood through academic support, mentorship opportunities, leadership training, and personal development initiatives.
Mission: empower students to realize their full potential and become active contributors to society. The Foundation works to create equal educational opportunities for all regardless of financial circumstances, providing financial resources, support, and guidance to bridge the gap between educational aspirations and the means to achieve them.
General contact email: ${assistantContact.email}. Donation questions: ${assistantContact.donationEmail}. Website: ${siteUrl}.
Official social channels: LinkedIn (https://www.linkedin.com/company/franciskoromafoundation/), Instagram (https://www.instagram.com/franciskoromafoundation/), Facebook (https://www.facebook.com/franciskoromafoundation/), YouTube (https://www.youtube.com/channel/UCKZT3HpsOhZ_r1TmU2sY7Og).`,
  },
  {
    id: "vision-values",
    title: "Vision and values",
    path: "/about",
    keywords: ["vision", "values", "equity", "equality", "future", "beliefs"],
    body: `Vision: a more just and equitable society that offers equal access to education, resources, and opportunities, irrespective of race, gender, or socio-economic background. The Foundation aspires to empower its community so each individual can reach their full potential.
By promoting education, fostering personal growth, and cultivating sustainable development, FKF aims to build a brighter future for all and empower the next generation to transform their lives and contribute to the betterment of society.
Values that ground the work: leadership, integrity, service, innovation, collaboration, and empowerment.`,
  },
  {
    id: "focus-areas",
    title: "Focus areas: academic support, mentorship, leadership development",
    path: "/programs",
    keywords: ["focus areas", "what we do", "academic support", "tutoring", "study help", "mentorship", "leadership development", "programs"],
    body: `FKF supports young people through structured programs that build academic strength, leadership capacity, and long-term opportunity. The three focus areas shown on the home page are:
1. Academic Support - educational resources and structured support systems that help students achieve academic excellence.
2. Mentorship Programs - connecting young people with mentors who provide guidance, encouragement, and career insight.
3. Leadership Development - equipping future leaders with the skills, confidence, and opportunities to create meaningful change.
The public program pages are Mentorship (/programs/mentorship), Scholarship (/programs/scholarship), Community Service (/programs/community-service), and the FKF Speaker Series (/programs/speaker-series).`,
  },
  {
    id: "impact-numbers",
    title: "Impact figures",
    path: "/",
    keywords: ["impact", "numbers", "statistics", "how many", "students helped", "results", "reach", "countries"],
    body: `Impact figures published on the FKF website: 1,200+ lives impacted, 500+ students supported, 50+ mentors engaged, 15+ programs delivered, 10+ partner organizations, and 20+ communities reached. The Foundation describes itself as 100% mission driven with global representation.
Figures published on the founder's page: more than 2,500 young people impacted, 300+ global volunteers, volunteers and mentees across 8 countries and four continents, and a podcast audience in 54 countries.`,
  },
  {
    id: "sdg-alignment",
    title: "United Nations Sustainable Development Goals alignment",
    path: "/resources",
    keywords: ["sdg", "sustainable development goals", "united nations", "un", "global goals", "2030"],
    body: `FKF aligns its work with the United Nations Sustainable Development Goals to promote education, innovation, inclusion, sustainable communities, and strategic partnerships. The goals highlighted on the website are SDG 4 (Quality Education), SDG 9 (Industry, Innovation and Infrastructure), SDG 10 (Reduced Inequalities), SDG 11 (Sustainable Cities and Communities), and SDG 17 (Partnerships for the Goals). More information is available at https://globalgoals.org/goals/.`,
  },
  {
    id: "founder-overview",
    title: "Francis Koroma, Founder and President",
    path: "/about/founder",
    keywords: ["francis koroma", "founder", "president", "who founded", "leader", "bio", "biography"],
    body: `Francis Koroma is the Founder and President of the Francis Koroma Foundation. He is a founder, speaker, entrepreneur, and global advocate dedicated to empowering young leaders and advancing sustainable development.
Through the Foundation he has created opportunities for students and emerging leaders through mentorship, scholarships, leadership development, advocacy, and professional growth initiatives. His work spans education, youth empowerment, entrepreneurship, diplomacy, innovation, and global advocacy, helping young people turn ideas into solutions that contribute to the United Nations Sustainable Development Goals.
His areas of impact are education, youth empowerment, leadership development, entrepreneurship, global advocacy, and community service.
In his words: "Young people are not leaders of tomorrow. They are leaders of today whose ideas and actions can transform communities around the world."`,
  },
  {
    id: "founder-recognition",
    title: "Francis Koroma: recognition, awards, and advocacy",
    path: "/about/founder",
    keywords: ["award", "awards", "forbes", "recognition", "honors", "united nations speaker", "ambassador", "milestones", "achievements"],
    body: `Francis Koroma is an official member of the Forbes Council, selected through a review process recognizing professional achievement, business impact, and demonstrated influence. As a member he collaborates with leaders across industries, publishes expert insights, and takes part in thought leadership initiatives.
Recognition includes the African Pacesetter for Development Award, the 25 Under 25 Global Legacy Award, appointment as Youth Ambassador to the Sierra Leone Permanent Mission to the United Nations, and selection as Secretary General of the Organization of African Youth.
As a United Nations speaker he has taken part in high-level events including the High-Level Political Forum, the ECOSOC Youth Forum, and sessions of the United Nations General Assembly, championing youth leadership and sustainable development.
Milestones listed on the website: 2018 FranTech3D at Yale University; 2020 recognition in the New Jersey Institute of Technology New Business Model Challenge; 2022 African Pacesetter for Development Award; 2023 25 Under 25 Global Legacy Award; 2023 New York Fashion Week runway appearance; and presently Secretary General of the Organization of African Youth.`,
  },
  {
    id: "founder-background",
    title: "Francis Koroma: professional and educational background",
    path: "/about/founder",
    keywords: ["frantech3d", "3d printing", "yale", "database", "computer science", "career", "education", "podcast", "decade goal", "fashion", "vogue", "recording academy"],
    body: `In the summer of 2018 Francis Koroma developed FranTech3D at Yale University, an initiative addressing Sustainable Development Goal 6 by using modern technology to create affordable water storage solutions for underserved communities in Africa and South America. He was selected as one of the top entrepreneurs in the New Jersey Institute of Technology New Business Model Challenge, and has run 3D printing workshops for students in Sierra Leone.
He has a background in database administration and computer science, previously serving as a SQL Server Database Administrator at Poshem Technologies Institute and volunteering as an instructor teaching Microsoft Azure AI Fundamentals and SQL Server Administration. His studies cover computer science and business administration, with professional certifications in artificial intelligence and emerging technologies.
He has also worked in the fashion industry as a runway model, appearing at New York Fashion Week in September 2023, and is an active member of ForbesBLK, Vogue's global fashion community, and The Recording Academy, where he mentors aspiring professionals in music, entertainment, and creative industries.
During the pandemic he launched the Decade Goal Podcast, exploring how individuals and communities can prepare for the coming decade. It has reached listeners in 54 countries and more than 300 cities.`,
  },
  {
    id: "foundation-results",
    title: "Scholarships and opportunities the Foundation has delivered",
    path: "/programs/scholarship",
    keywords: ["scholarship awarded", "tuition", "books", "berea college", "asia pacific university", "yale young global scholars", "internship", "results"],
    body: `The Foundation has awarded scholarships to college and high school students, helping cover tuition, books, and academic expenses. It has assisted students in securing fully funded scholarships to institutions such as Berea College in the United States and Asia Pacific University in Japan.
Mentees have gained admission to programs such as Yale Young Global Scholars, and students have received internship opportunities and professional development experiences through the Foundation's network of more than 300 volunteers.
Scholarship application workflows are planned for a later phase; eligibility details and open cycles will be published on the scholarship page (/programs/scholarship) when announced.`,
  },
  {
    id: "board-of-directors",
    title: "Board of Directors",
    path: "/about/leadership",
    keywords: ["board", "directors", "leadership team", "governance", "who leads", "trustees"],
    body: `The Francis Koroma Foundation is guided by experienced leaders committed to advancing education, youth empowerment, leadership, and global impact. The board brings experience in international development, humanitarian service, climate action, education, and community leadership. The three board directors listed on the leadership page (/about/leadership) are Hawa Taylor Kamara Diallo, Dr. Andrise Bass, and Dr. Gbujie Daniel Chidubem.`,
  },
  {
    id: "board-hawa-diallo",
    title: "Hawa Taylor Kamara Diallo, Board Director",
    path: "/about/leadership",
    keywords: ["hawa", "diallo", "kamara", "united nations", "peacekeeping", "un-habitat"],
    body: `Hawa Taylor Kamara Diallo is a Board Director. She has 30+ years of United Nations experience in positions in the Department of Public Information and the Office of the Deputy Secretary-General, United Nations peacekeeping experience in Somalia and Cambodia, and country-level and community development programme management experience focused on youth, girls, and women with UN-Habitat's Nairobi and New York offices. Her work includes public information and outreach and fostering partnerships with civil society, local government, and the private sector.`,
  },
  {
    id: "board-andrise-bass",
    title: "Dr. Andrise Bass, Board Director",
    path: "/about/leadership",
    keywords: ["andrise", "bass", "humanitarian focus foundation", "climate reality", "sdg impact awards", "aspafrique", "priscon"],
    body: `Dr. Andrise Bass is a Board Director. She is President and founder of the Humanitarian Focus Foundation, Vice President of ASPAFrique, CEO of PRISCON, a Mentor/Leader at Al Gore's Climate Reality Project, and sits on the Global Board of Advisors for the SDG Impact Awards. She is a transformational strategist coach, entrepreneur, and philanthropist with over 28 years of experience, and has worked as a community organizer, author, keynote speaker, and business strategist for nonprofits, training and mentoring thousands of professionals and entrepreneurs worldwide.`,
  },
  {
    id: "board-daniel-chidubem",
    title: "Dr. Gbujie Daniel Chidubem, Board Director",
    path: "/about/leadership",
    keywords: ["gbujie", "daniel", "chidubem", "team54project", "climate", "unfccc", "cop22", "nigeria"],
    body: `Dr. Gbujie Daniel Chidubem is a Board Director. He hails from Ahiazu-Mbaise, Imo State, Nigeria, and in 2016 became the first African to represent the World Medical Association at the United Nations Framework Convention on Climate Change (COP 22) in Marrakech, Morocco. He founded Team54Project International (team54project.org), a youth-based group promoting localized climate solutions and advocating for environmental health regulations, and believes character-driven leadership is the direction young people need.`,
  },
  {
    id: "get-involved",
    title: "Ways to get involved: volunteer, mentor, partner, donate",
    path: "/volunteer",
    keywords: ["volunteer", "join", "get involved", "mentor", "apply", "help", "partnership", "partner", "collaborate", "internship", "work with you", "careers", "jobs"],
    body: `Ways to take part in the Foundation's work:
Volunteer (/volunteer) - volunteers strengthen programs, mentor young people, support events, and help extend the Foundation's reach through mentoring, program support, community service, and professional expertise. Opportunities vary by program and location.
Mentorship (/programs/mentorship) - people with experience to share can volunteer as mentors.
Donate (/donate and /support-us) - contributions support academic opportunity, mentorship, leadership development, and community engagement. Online gifts are processed through the Foundation's external donation provider; the website itself does not store payment processing.
Partnerships, applications, volunteering enquiries, and anything needing a decision or a person should go to the Foundation team by email at ${assistantContact.email} or through the contact page (${assistantContact.contactPath}). Donation-specific questions go to ${assistantContact.donationEmail}.`,
  },
  {
    id: "site-map",
    title: "Website page directory",
    path: "/",
    keywords: ["where", "find", "page", "site map", "navigation", "menu", "link"],
    body: `Pages on this website:
Home (/), About the Foundation (/about), Founder (/about/founder), Leadership (/about/leadership), Board of Directors (/about/board-of-directors).
Programs (/programs), Mentorship Program (/programs/mentorship), Scholarship Program (/programs/scholarship), Community Service (/programs/community-service), Speaker Series (/programs/speaker-series).
Impact News (/impact-news), Gallery (/gallery), Videos (/videos), Resources (/resources), Annual Reports (/annual-reports).
Volunteer (/volunteer), Support Us (/support-us), Donate (/donate), Contact (/contact), Privacy Policy (/privacy-policy).`,
  },
  {
    id: "contact-details",
    title: "Contacting the Foundation",
    path: "/contact",
    keywords: ["contact", "email", "phone", "address", "reach", "speak to someone", "talk to a person", "office", "hours", "location"],
    body: `Questions, partnership ideas, and messages are welcome. Email the Foundation at ${assistantContact.email}, or use the contact form on the contact page (${assistantContact.contactPath}). Donation questions go to ${assistantContact.donationEmail}. The Francis Koroma Foundation is a United States-based 501(c)(3) nonprofit organization. The website does not publish a phone number, street address, or office hours.`,
  },
];

/** The full static knowledge base: every public page plus the hand-written pages. */
export const staticKnowledge: KnowledgeDoc[] = [...pages.map(docFromSitePage), ...handWrittenDocs];
