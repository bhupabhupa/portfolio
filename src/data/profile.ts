export const profile = {
  name: "Bhupendra Tandel",
  fullName: "Bhupendra Prakash Tandel",
  headline: "Engineering Manager · Delivery Lead · Full-Stack Engineer",
  tagline:
    "I build and ship enterprise SaaS platforms, and lead the teams that make them, while staying hands-on in React, TypeScript and Node.js.",
  location: "Navi Mumbai, India",
  availability: "Open to hybrid & remote roles (Mumbai / Navi Mumbai / Pune)",
  // Short form of `availability` for the hero status badge.
  availabilityShort: "Open to hybrid & remote roles",
  workPreference: "Hybrid in Mumbai / Navi Mumbai / Pune, or remote",
  email: "bhupabhupa@gmail.com",
  linkedin: "https://www.linkedin.com/in/bhupendra-tandel-76264367",
  github: "https://github.com/bhupabhupa",
  resume: "/Bhupendra_Tandel_Resume.pdf",
  photo: "/bhupendra-tandel.jpg",
  about: [
    "Engineering Manager and Delivery Lead with 17+ years of experience building and delivering enterprise SaaS platforms. For the last 6 years I've been on the founding engineering team at Scitara, helping scale an enterprise laboratory iPaaS for regulated pharma customers from early prototype to a production platform serving 20+ customers.",
    "I was promoted from Senior Developer to Principal Engineer to Delivery Manager, and now lead a team of 15+ engineers across Agile/Scrum delivery, sprint planning, release management, CI/CD and stakeholder communication.",
    "I'm an early adopter of AI-assisted software development (Claude Code, Cursor, GitHub Copilot) across the full SDLC, from architecture and code generation to review, testing and documentation.",
  ],
  languages: ["English", "Hindi", "Marathi"],
};

export const stats = [
  { value: "17+", label: "Years building software" },
  { value: "15+", label: "Engineers led" },
  { value: "20+", label: "Enterprise pharma customers" },
  { value: "~60%", label: "Faster code reviews with AI" },
];

export type Job = {
  role: string;
  company: string;
  period: string;
  context?: string;
  points: string[];
  /** Highlighted as the current role. */
  current?: boolean;
  /** Promotion path within this company, earliest first. */
  promotions?: string[];
  /** Collapsed behind "Show earlier roles". */
  early?: boolean;
};

export const experience: Job[] = [
  {
    role: "Principal Engineer & Delivery Manager",
    company: "Scitara Corporation",
    period: "Jun 2020 – Present",
    current: true,
    promotions: ["Senior Developer", "Principal Engineer", "Delivery Manager"],
    context:
      "Scitara DLX: enterprise laboratory integration platform (iPaaS) for pharma and life sciences · Remote",
    points: [
      "Core member of the founding engineering team; helped take Scitara DLX from early build to an enterprise platform serving 20+ pharma and life-sciences customers.",
      "Promoted from Senior Developer to Principal Engineer to Delivery Manager; own end-to-end delivery, sprint and release planning, and roadmap execution for a team of 15+ engineers.",
      "Led frontend architecture in React, TypeScript, Redux-Saga and Material UI, including a JSON Forms-driven dynamic form engine powering core configuration workflows.",
      "Built and operated the CI/CD release-candidate pipeline: packaging, versioned tagging and publishing of artifacts and Helm charts to AWS S3 for Kubernetes deployments.",
      "Designed Node.js / Express services and REST APIs for platform features and laboratory instrument integrations.",
      "Established PR review standards and mentored engineers; primary technical interface for product, QA and customer stakeholders.",
      "Drove AI adoption across the SDLC (AI-assisted review, unit-test generation, API docs), cutting code review cycle time by ~60%.",
    ],
  },
  {
    role: "Senior Full Stack Developer",
    company: "Avotima Systech",
    period: "Feb 2020 – Jun 2020",
    points: [
      "Built eBusiness Card, a MERN-stack digital business-card web app with shareable, trackable cards.",
    ],
  },
  {
    role: "Senior Full Stack Developer",
    company: "Tradesocio Pvt. Ltd.",
    period: "Jun 2019 – Dec 2019",
    points: [
      "Developed features for an in-house trading platform used by financial institutions: React frontends and Node.js REST services.",
    ],
  },
  {
    role: "Lead Developer (React Full Stack)",
    company: "Precision Automation & Robotics India",
    period: "May 2018 – May 2019",
    points: [
      "Led an R&D analytics platform (React, Node.js) analysing machine workflows across manufacturing plants, giving engineers visibility into production bottlenecks.",
    ],
  },
  {
    role: "Senior Software Developer",
    company: "EKI Communication Pvt. Ltd.",
    period: "Jul 2012 – Oct 2017",
    points: [
      "Core developer of Survelytics and Survelytics Next, cross-platform market-research products (MEAN + Android) used by Nielsen, Ipsos, L'Oréal, GroupM and Dun & Bradstreet.",
      "Delivered the L'Oréal iConnect Android app for global consumer-insight capture, with photo, video and audio collection at scale.",
    ],
  },
  {
    role: "System Programmer (Java)",
    company: "Konkan Railway Corporation Ltd.",
    early: true,
    period: "Aug 2011 – Jun 2012",
    points: [
      "Built the live train-position module and online ticket booking with payment-gateway integration for the public Konkan Railway website, plus an internal tender-management system.",
    ],
  },
  {
    role: "Java Developer",
    company: "Technolink Solutions Pvt. Ltd.",
    early: true,
    period: "May 2010 – Jul 2011",
    points: [
      "Built an institute management system, an online examination platform and multiple client websites (Java, JSP, MySQL).",
    ],
  },
  {
    role: "Java Developer (Trainee)",
    company: "Navsya Technologies Pvt. Ltd.",
    early: true,
    period: "Mar 2009 – Apr 2010",
    points: [
      "End-to-end development of client web applications in Java, from requirements to deployment.",
    ],
  },
];

export type Project = {
  title: string;
  org: string;
  description: string;
  tags: string[];
  /** Shown as the large lead card. */
  featured?: boolean;
  /** Headline numbers for the card, taken from the resume. */
  metrics?: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    title: "Scitara DLX platform",
    org: "Scitara",
    featured: true,
    metrics: [
      { value: "20+", label: "production customers" },
      { value: "15+", label: "engineers on the team I lead" },
    ],
    description:
      "Enterprise laboratory iPaaS connecting instruments and systems for regulated pharma. Grew from prototype to 20+ production customers.",
    tags: ["React", "TypeScript", "Node.js", "Kubernetes"],
  },
  {
    title: "Dynamic form engine",
    org: "Scitara",
    description:
      "JSON Forms-driven engine that renders the platform's core configuration workflows from schema, not hand-written screens.",
    tags: ["JSON Forms", "Material UI", "Redux-Saga"],
  },
  {
    title: "Release-candidate pipeline",
    org: "Scitara",
    description:
      "CI/CD that packages, version-tags and publishes artifacts and Helm charts to AWS S3, improving release traceability and rollback safety.",
    tags: ["CI/CD", "Helm", "AWS S3", "Docker"],
  },
  {
    title: "AI-assisted SDLC",
    org: "Scitara",
    metrics: [{ value: "~60%", label: "faster review cycles" }],
    description:
      "Rolled out AI-assisted code review, unit-test generation and API documentation across the team, cutting review cycle time by ~60%.",
    tags: ["Claude Code", "Cursor", "Copilot"],
  },
  {
    title: "Survelytics & Survelytics Next",
    org: "EKI Communication",
    description:
      "Cross-platform market-research survey products used by Nielsen, Ipsos, L'Oréal, GroupM and Dun & Bradstreet.",
    tags: ["MEAN", "Android"],
  },
  {
    title: "Konkan Railway online booking",
    org: "Konkan Railway",
    description:
      "Public ticket booking with payment-gateway integration and a live train-position module.",
    tags: ["Java", "JSP"],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Leadership & Delivery",
    items: [
      "Engineering Management",
      "Delivery Management",
      "Agile / Scrum",
      "Sprint & Release Planning",
      "Roadmap Execution",
      "Stakeholder Management",
      "Mentoring & Coaching",
      "PR Review Governance",
    ],
  },
  {
    group: "Frontend",
    items: [
      "React",
      "TypeScript",
      "JavaScript (ES6+)",
      "Redux / Redux-Saga",
      "Material UI",
      "JSON Forms",
      "AngularJS",
      "HTML5 / CSS3",
    ],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express.js", "REST API Design", "Java", "JSP"],
  },
  {
    group: "Cloud & DevOps",
    items: [
      "AWS",
      "CI/CD",
      "Docker",
      "Kubernetes",
      "Helm",
      "Git / GitHub",
      "Release & Artifact Management",
    ],
  },
  {
    group: "Databases",
    items: ["MongoDB", "MySQL", "Oracle", "SQLite"],
  },
  {
    group: "AI-Assisted Engineering",
    items: ["Claude Code", "Cursor", "GitHub Copilot", "ChatGPT"],
  },
];

export const education = {
  degree: "Bachelor of Engineering (B.E.), Computer Engineering",
  school: "University of Mumbai",
  period: "2003 – 2007",
};

export type OpenSourceProject = {
  name: string;
  kind: "code" | "guide";
  summary: string;
  highlights: string[];
  tags: string[];
  url: string;
  /** Link to an animated demo in the repo (linked, not embedded, to keep the page light). */
  demo?: string;
  /** Shown as the large lead card. */
  featured?: boolean;
  /** Slug of the architecture write-up at /projects/<slug>. */
  caseStudy?: string;
};

/** Public repositories on GitHub. Facts come from each repo's own description and README. */
export const openSource: OpenSourceProject[] = [
  {
    name: "labdocs-ai",
    kind: "code",
    summary:
      "A RAG assistant over lab instrument documentation. Answers are grounded in the uploaded manuals, or it says the topic isn't covered instead of guessing.",
    highlights: [
      "Answers streamed token by token over SSE, with clickable citations",
      "Local embeddings (all-MiniLM-L6-v2 via transformers.js) in a SQLite vector store",
      "Tested prompt-injection guardrail and LLM-mocked tests",
    ],
    tags: ["RAG", "Claude", "Node.js", "React", "SSE"],
    url: "https://github.com/bhupabhupa/labdocs-ai",
    featured: true,
    caseStudy: "labdocs-ai",
  },
  {
    name: "miniflow",
    kind: "code",
    summary:
      "A miniature iPaaS: simulated lab instruments feed an ingestion API and a Redis/BullMQ queue, and a worker transforms and delivers the data to a mock LIMS.",
    highlights: [
      "Retries with jittered exponential backoff and a replayable dead-letter queue",
      "Immutable, sha256-checksummed audit trail in SQLite",
      "Live dashboard: break the target and watch the pipeline heal",
      "At-least-once delivery with idempotent consumers",
    ],
    tags: ["Node.js", "Redis", "BullMQ", "SQLite", "Docker Compose"],
    url: "https://github.com/bhupabhupa/miniflow",
    demo: "https://github.com/bhupabhupa/miniflow/blob/main/docs/demo.gif",
    caseStudy: "miniflow",
  },
  {
    name: "secure-portal",
    kind: "code",
    summary:
      "An enterprise SSO demo: a React SPA and Node/Express API secured by Keycloak with OIDC (Authorization Code + PKCE).",
    highlights: [
      "Offline JWT verification via cached JWKS, plus server-side RBAC (viewer / manager / admin)",
      "Back-channel logout with session revocation and an append-only SQLite audit log",
      "14 tests, CI and one-command Docker Compose",
    ],
    tags: ["Keycloak", "OIDC", "React", "Express", "Docker Compose"],
    url: "https://github.com/bhupabhupa/secure-portal",
    demo: "https://github.com/bhupabhupa/secure-portal/blob/main/docs/demo.gif",
    caseStudy: "secure-portal",
  },
  {
    name: "ai-sdlc-playbook",
    kind: "guide",
    summary:
      "A practical playbook for adopting AI in a team's SDLC without lowering the quality bar. Principle: AI drafts, humans decide.",
    highlights: [
      "Workflow, guardrails, prompt templates and a 4-week rollout plan",
      "Honest metrics, from leading adoption on a 15+ engineer team",
      "PR review rounds went from 3–5 to 1–3",
    ],
    tags: ["AI-assisted SDLC", "Engineering leadership"],
    url: "https://github.com/bhupabhupa/ai-sdlc-playbook",
  },
];

/** "How I lead": each line is phrased from facts in the experience above. */
export const principles: { icon: "delivery" | "quality" | "stakeholders" | "ai"; title: string; body: string }[] = [
  {
    icon: "delivery",
    title: "Predictable delivery",
    body: "End-to-end ownership of Agile/Scrum delivery, sprint and release planning, and roadmap execution for a team of 15+ engineers.",
  },
  {
    icon: "quality",
    title: "Raising the engineering bar",
    body: "Established PR review standards and mentored engineers, while staying hands-on in React, TypeScript and Node.js architecture.",
  },
  {
    icon: "stakeholders",
    title: "One technical voice",
    body: "Primary technical interface for product, QA and customer stakeholders on a platform built for regulated pharma.",
  },
  {
    icon: "ai",
    title: "AI across the SDLC",
    body: "Rolled out AI-assisted code review, unit-test generation and API documentation, cutting review cycle time by ~60%.",
  },
];

/** Section eyebrows, headings and one-line intros. */
export const sections = {
  about: { eyebrow: "About", title: "Building platforms, and the teams behind them" },
  leadership: { eyebrow: "Leadership", title: "How I lead", intro: "The principles behind how I run teams." },
  work: { eyebrow: "Work", title: "Selected work", intro: "Platforms, pipelines and products I've built or led." },
  openSource: {
    eyebrow: "Hands-on",
    title: "GenAI & architecture projects",
    intro: "My own public repositories, each with CI, tests and a README. Every code project has an architecture write-up covering the design decisions and trade-offs.",
    more: "More on GitHub",
    writeUp: "Read the architecture write-up",
  },
  experience: {
    eyebrow: "Experience",
    title: "From Java developer to engineering leader",
    intro: "17+ years across enterprise SaaS, trading, manufacturing analytics and market research.",
    earlier: "earlier roles",
  },
  skills: { eyebrow: "Skills", title: "Skills & toolkit" },
  contact: {
    eyebrow: "Contact",
    title: "Let's build something together",
    intro: "I'm open to engineering leadership and delivery roles, hybrid or remote. The fastest way to reach me is email.",
  },
};
