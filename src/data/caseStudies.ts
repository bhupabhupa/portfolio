/**
 * Architecture write-ups for the public GitHub projects.
 * Every fact here comes from the project's own README; keep it that way.
 */

export type FlowStep = { name: string; detail: string };

export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  problem: string[];
  stack: string[];
  /** One or more left-to-right pipelines, e.g. "Ingestion" and "Answering". */
  lanes: { title: string; steps: FlowStep[] }[];
  /** The alternative path that shows the interesting engineering (failure, refusal, revocation). */
  branch: { title: string; steps: string[] };
  /** Small supporting table or list shown under the diagram. */
  aside?: { title: string; rows: [string, string][] };
  decisions: { title: string; body: string }[];
  testing: string[];
  production: string[];
  repo: string;
  demo?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "labdocs-ai",
    name: "LabDocs AI",
    category: "GenAI · Retrieval-augmented generation",
    tagline:
      "A RAG assistant that answers questions from lab instrument manuals with citations, and declines when the manuals don't cover the question.",
    problem: [
      "Lab teams depend on long instrument manuals. A general-purpose chatbot will answer anything with confidence, including questions the manuals never cover. In a regulated lab, an untraceable answer is worse than no answer.",
      "The goal: answers grounded only in the uploaded documents, every answer traceable to its source excerpts, and an honest \"that isn't covered in the uploaded documents\" instead of a guess.",
    ],
    stack: ["Node.js", "React", "Claude", "transformers.js", "all-MiniLM-L6-v2", "SQLite", "Server-Sent Events"],
    lanes: [
      {
        title: "Ingestion (per document)",
        steps: [
          { name: "Upload", detail: "Markdown or text manual" },
          { name: "Chunk", detail: "Split on headings first, then by size with overlap" },
          { name: "Embed locally", detail: "all-MiniLM-L6-v2 (384-d) in-process, no API key" },
          { name: "Store", detail: "SQLite: chunks + vectors" },
        ],
      },
      {
        title: "Answering (per question)",
        steps: [
          { name: "Embed question", detail: "Same local model" },
          { name: "Retrieve", detail: "Cosine similarity, top 5 chunks" },
          { name: "Threshold check", detail: "Best match must score ≥ 0.35" },
          { name: "Prompt", detail: "Rules + chunks as delimited data + question" },
          { name: "Stream answer", detail: "Claude, over SSE: sources → tokens → done" },
        ],
      },
    ],
    branch: {
      title: "Refusal path: below the threshold",
      steps: [
        "No chunk scores ≥ 0.35",
        "Return \"not covered in the uploaded documents\"",
        "The LLM is never called, so zero tokens",
      ],
    },
    decisions: [
      {
        title: "RAG instead of fine-tuning",
        body: "Documents change, retraining is slow and expensive, and a fine-tuned model still can't cite its sources. Retrieval keeps the corpus outside the model, updatable in seconds, with every answer traceable to a source, which regulated environments require.",
      },
      {
        title: "The refusal is code, not model behaviour",
        body: "Below the similarity threshold the LLM is never called. The system cannot hallucinate about topics the corpus doesn't cover, and refusals cost nothing.",
      },
      {
        title: "Threshold calibrated, not guessed",
        body: "A calibration script measured real question scores against the corpus: legitimate hits scored 0.406–0.636 and unrelated questions scored lower. 0.35 sits below the weakest legitimate hit with margin.",
      },
      {
        title: "Uploaded documents are untrusted input",
        body: "Anyone can upload a manual containing \"ignore previous instructions\". Retrieved text reaches the model only inside explicit data delimiters, and the system prompt treats delimited text as data, never instructions. It's the same principle as SQL parameterisation, and a test proves it.",
      },
      {
        title: "Chunk on headings before size",
        body: "In manuals, section boundaries are meaning boundaries, so a chunk never spans two sections. Oversized sections split at paragraph breaks with overlap, so boundary sentences survive in both neighbours.",
      },
      {
        title: "Sources stream before the answer",
        body: "The SSE stream sends sources, then answer tokens, then done. Users see where the answer comes from while it's still being generated, so perceived latency is close to retrieval time, not generation time.",
      },
      {
        title: "The LLM is a dependency, not the system",
        body: "One module owns the model call, its failure maps to a 502, and everything is testable with it mocked, the same way you'd treat any external service. Local embeddings and a SQLite vector store keep ingestion and retrieval free and offline; a vector index is the scaling step, with the same contract.",
      },
    ],
    testing: [
      "17 tests on Node's built-in test runner, with no test dependencies.",
      "The LLM is always mocked at the transport seam, so tests assert on the exact prompt the model would receive.",
      "Retrieval tests use the real local embedding model, including a paraphrased question with no shared keywords.",
      "Covers chunking, retrieval, threshold refusal, citation grounding, deletion, prompt-injection defence and SSE event order.",
    ],
    production: [
      "PDF ingestion and queued background embedding for large corpora",
      "Authentication and authorisation on upload and delete",
      "Retrieval evaluations on a golden Q&A set, plus a re-ranking stage for larger corpora",
      "Rate limiting and per-user token budgets",
      "Observability: retrieval scores, refusal rates and token spend per answer",
    ],
    repo: "https://github.com/bhupabhupa/labdocs-ai",
  },
  {
    slug: "miniflow",
    name: "MiniFlow",
    category: "Integration architecture · Event-driven",
    tagline:
      "A miniature integration platform (iPaaS) that delivers lab instrument data to a LIMS without losing it, even while the LIMS is down.",
    problem: [
      "Lab instruments produce readings that must reach a laboratory information management system (LIMS). If instruments call the LIMS directly, a LIMS outage means lost data.",
      "The goal: durable delivery that turns downstream failure into delay instead of loss, never delivers duplicates, and leaves an audit trail that can prove what happened to every message.",
    ],
    stack: ["Node.js", "Express", "Redis", "BullMQ", "SQLite", "React", "Docker Compose"],
    lanes: [
      {
        title: "Happy path",
        steps: [
          { name: "Instruments", detail: "Simulated HPLC and balance producers" },
          { name: "Ingest API", detail: "Validate, dedupe by messageId, reply 202 Accepted" },
          { name: "Queue", detail: "Redis + BullMQ, jobId = messageId" },
          { name: "Worker", detail: "Per-instrument field mapping" },
          { name: "Mock LIMS", detail: "Receives results; can be switched off" },
        ],
      },
    ],
    branch: {
      title: "Failure path: LIMS outage",
      steps: [
        "Retry up to 3 times with jittered exponential backoff",
        "Still failing → park in the dead-letter queue",
        "Operator replays it under the same messageId",
        "Delivered, with no duplicate",
      ],
    },
    aside: {
      title: "Audit trail (append-only, sha256-checksummed)",
      rows: [
        ["Events", "RECEIVED · DUPLICATE · TRANSFORMED · DELIVERED · RETRY · DLQ · REPLAYED"],
        ["Example", "RECEIVED → TRANSFORMED → RETRY ×3 → DLQ → REPLAYED → DELIVERED"],
        ["Verification", "The audit endpoint re-checks stored payloads against their checksums; tampering shows MISMATCH"],
      ],
    },
    decisions: [
      {
        title: "Why a queue at all?",
        body: "Direct calls couple fragile instruments to a fragile target. The queue turns downstream failure into delay instead of loss: producers fire and forget (202 Accepted) and the pipeline absorbs the gap.",
      },
      {
        title: "At-least-once delivery plus idempotency",
        body: "Exactly-once is a myth; at-least-once with idempotent consumers is the engineering. messageIds are assigned at the source, so even a retried send is deduplicated, by an atomic database claim plus the BullMQ jobId as a second layer. A duplicate is a 202, not an error.",
      },
      {
        title: "Jitter, or a stampede",
        body: "Pure exponential backoff retries every failed message in lockstep and hammers a recovering target. Equal jitter (50–100% of the base delay) spreads the load, and it's visible in the audit timestamps.",
      },
      {
        title: "The dead-letter queue is the honest answer",
        body: "When delivery keeps failing, jobs park for an operator to inspect and replay. Replay travels under the same messageId, so idempotency makes it safe by construction.",
      },
      {
        title: "The audit trail carries its own proof",
        body: "Every hop appends an event, with sha256 checksums of the payload. Append-only is structural: no update or delete code path exists, and a test proves tampering is detected.",
      },
      {
        title: "Worker and API are separate processes",
        body: "Ingestion and delivery scale and fail independently. Messages queued while no worker was running were delivered when one started: durability demonstrated, not claimed.",
      },
    ],
    testing: [
      "21 tests against real Redis, because the queue semantics are the system under test; CI runs a Redis service container.",
      "Covers idempotent dedupe, transform before delivery, the retry → DLQ ladder, replay → delivered under the same messageId, and append-only audit with tamper detection.",
      "A configurable backoff base lets tests run the full retry ladder in milliseconds.",
    ],
    production: [
      "Authentication and authorisation on ingest, DLQ and admin endpoints (the secure-portal pattern)",
      "Redis high availability, a shared audit store and horizontal worker scaling",
      "JSON Schema validation per instrument type at ingest",
      "Poison-message classification: terminal errors go straight to the DLQ",
      "Metrics and alerts on queue depth, DLQ growth and delivery latency percentiles",
    ],
    repo: "https://github.com/bhupabhupa/miniflow",
    demo: "https://github.com/bhupabhupa/miniflow/blob/main/docs/demo.gif",
  },
  {
    slug: "secure-portal",
    name: "Secure Portal",
    category: "Security architecture · Identity & access",
    tagline:
      "Enterprise single sign-on for a React + Node application using Keycloak, with permissions enforced on the server and every access decision audited.",
    problem: [
      "Platforms in regulated industries such as pharma and finance need central identity, short-lived tokens, permissions enforced by the server rather than just hidden in the UI, and a record of who did what, including denied attempts.",
      "The goal: a minimal but production-shaped reference for those patterns that runs with one command.",
    ],
    stack: ["React", "Node.js", "Express", "Keycloak", "OpenID Connect", "SQLite", "Docker Compose"],
    lanes: [
      {
        title: "Sign-in and API call",
        steps: [
          { name: "React SPA", detail: "Redirects to Keycloak to log in" },
          { name: "Keycloak", detail: "Authorization Code + PKCE → short-lived tokens" },
          { name: "API call", detail: "Authorization: Bearer <JWT>" },
          { name: "Node API", detail: "Verifies JWT offline via cached JWKS, checks audience and permission" },
          { name: "Audit log", detail: "Who, what, when, including 401 and 403" },
        ],
      },
    ],
    branch: {
      title: "Revocation path: back-channel logout",
      steps: [
        "User logs out; Keycloak sends a signed logout token to the API",
        "API revokes that session id",
        "A still-unexpired token from that session is replayed",
        "401 \"Session has been revoked\", and it's audited",
      ],
    },
    aside: {
      title: "Roles and token lifetimes",
      rows: [
        ["viewer", "View runs"],
        ["manager", "View and create runs"],
        ["admin", "View and create runs, view the audit log"],
        ["Access token", "5 minutes: the upper bound on revocation lag"],
        ["Session idle / max", "30 minutes idle, 8 hours maximum"],
      ],
    },
    decisions: [
      {
        title: "PKCE with no client secret",
        body: "A single-page app cannot keep a secret; anything in the browser is public. PKCE binds the authorization code to the client instance instead.",
      },
      {
        title: "Verify tokens offline",
        body: "A round trip to Keycloak on every request would make it a bottleneck and a single point of failure. Checking signatures against cached public keys costs microseconds. The trade-off is revocation lag, limited by 5-minute tokens and closed by back-channel logout.",
      },
      {
        title: "Validate the audience",
        body: "A valid signature only proves Keycloak issued the token, not that it was issued for this API. Tokens must name this API in their audience claim; valid tokens issued to other clients get a 401.",
      },
      {
        title: "Permissions, not roles, in the code",
        body: "Endpoints declare the permission they need, such as runs:create, never a role. One file maps roles to permissions, so granting or revoking a capability is a one-line change. At scale that table moves to a database or a policy engine; the shape stays the same.",
      },
      {
        title: "The server is the security boundary",
        body: "Hiding a button is UX, not security. A viewer replaying their token against the create endpoint gets a 403, and the attempt is in the audit log.",
      },
      {
        title: "Audit denied access, not just success",
        body: "In regulated environments, failed access attempts are the security signal. 401 means \"I don't know who you are\"; 403 means \"I know who you are, and no\". Both are recorded.",
      },
    ],
    testing: [
      "14 tests cover authentication failures, audience validation, RBAC denials with audit rows, config-driven grants, persistence and the full back-channel logout flow.",
      "No Keycloak needed in tests: a ~30-line fake identity provider serves discovery and keys from a locally generated RSA key, so the API trusts the protocol, not a particular server.",
    ],
    production: [
      "Keycloak in production mode behind TLS with a real database",
      "A confidential client with a backend-for-frontend for the most sensitive apps",
      "Rate limiting, security headers and a content security policy",
      "Audience validation per service",
    ],
    repo: "https://github.com/bhupabhupa/secure-portal",
    demo: "https://github.com/bhupabhupa/secure-portal/blob/main/docs/demo.gif",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
