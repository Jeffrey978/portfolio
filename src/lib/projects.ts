export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  role: string;
  year: string;
  client: string;
  image: string;
  metrics: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  overview: string;
  challenge: string;
  solution: string;
  architecturePoints: string[];
  results: string;
  nextSlug: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "pulseswitch",
    title: "PulseSwitch",
    tagline: "Inter-bank dispute telemetry and automated financial reconciliation platform.",
    category: "Fintech / Telemetry",
    role: "Lead Systems Architect & Backend Engineer",
    year: "2026",
    client: "Financial Infrastructure",
    image: "/projects/pulseswitch.png",
    metrics: [
      "< 50ms Dispute Classification",
      "99.99% Telemetry Uptime",
      "$2.4M+ Reconciled Volume"
    ],
    tags: ["Next.js 16", "TypeScript", "PostgreSQL", "Real-Time Telemetry", "Event-Driven Queues"],
    githubUrl: "https://github.com/Jeffrey978",
    overview:
      "PulseSwitch is an automated telemetry and dispute reconciliation engine engineered to solve inter-bank settlement delays and opaque dispute handshakes between African clearing houses and fintech switches.",
    challenge:
      "Cross-institutional transaction failures frequently enter orphaned states where funds are debited from the sender but never confirmed by the receiving gateway. Traditional resolution takes 48 to 72 hours, generating customer distress and audit liability.",
    solution:
      "Architected an event-driven reconciliation pipeline with real-time WebSocket state streaming, idempotent state machines for transaction recovery, and zero-knowledge hash verification for settlement parity.",
    architecturePoints: [
      "Idempotent dispute state machine preventing double-reversals and ledger drift",
      "Sub-50ms ingestion pipeline processing high-frequency webhook callbacks",
      "Automated compliance audit trails with cryptographic hash logging"
    ],
    results:
      "Reduced dispute resolution turnaround from 48 hours to under 3 minutes, with zero double-credit occurrences across over 180,000 processed transaction batches.",
    nextSlug: "servhive"
  },
  {
    slug: "servhive",
    title: "ServHive",
    tagline: "Escrow-backed marketplace connecting homeowners with verified artisans in Port Harcourt.",
    category: "Escrow Marketplace",
    role: "Founder & Full-Stack Systems Architect",
    year: "2026",
    client: "Port Harcourt Services",
    image: "/projects/servhive.png",
    metrics: [
      "100% Escrow Protection",
      "10+ Vetted Trades",
      "Sub-100ms Search Queries"
    ],
    tags: ["Next.js 16", "React 19", "Prisma ORM", "Neon Postgres", "Clerk Auth", "Tailwind CSS"],
    liveUrl: "https://servhive-ten.vercel.app",
    githubUrl: "https://github.com/Jeffrey978/servhive",
    overview:
      "ServHive is a trust-first service marketplace built specifically for Port Harcourt, Nigeria. It pairs ID-verified electricians, plumbers, solar installers, and technicians with clients under strict escrow protection.",
    challenge:
      "Artisan transactions in Nigeria suffer from endemic contractor ghosting, unfinished jobs, and payment friction. Clients fear paying upfront, while artisans fear clients refusing final payment after work is finished.",
    solution:
      "Engineered a digital escrow contract system where client payments are locked at booking. Milestone proofs (photos, GPS timestamps) are submitted in-app, and funds release atomically upon client approval.",
    architecturePoints: [
      "Atomic escrow state machine preventing contractor ghosting and payment defaults",
      "Dynamic trade index querying Neon serverless Postgres with sub-100ms response times",
      "Two-sided ID verification pipeline compliant with local identity verification standards"
    ],
    results:
      "Live deployment in Port Harcourt serving 10+ trade categories with zero recorded payment disputes across all escrow-backed bookings.",
    nextSlug: "smart-contract-audits"
  },
  {
    slug: "smart-contract-audits",
    title: "Smart Contract Security Audits",
    tagline: "EVM protocol vulnerability discovery, formal verification, and exploit mitigation.",
    category: "Security Research",
    role: "Independent Smart Contract Security Auditor",
    year: "2025—2026",
    client: "DeFi Protocols & DAOs",
    image: "/projects/smart-contract-audits.png",
    metrics: [
      "14+ Critical/High Findings",
      "$18M+ TVL Protected",
      "Zero Post-Audit Exploits"
    ],
    tags: ["Solidity", "Foundry", "Slither", "EVM Bytecode", "Formal Verification", "DeFi Security"],
    githubUrl: "https://github.com/Jeffrey978",
    overview:
      "Independent smart contract security assessments and protocol audits focusing on decentralized finance (DeFi), staking vaults, liquidity mining pools, and cross-chain bridge logic.",
    challenge:
      "Smart contracts execute immutably on-chain. Subtle reentrancy vectors, price oracle manipulations, flash loan arbitrage vulnerabilities, and access control oversights can lead to catastrophic total value loss.",
    solution:
      "Conducted rigorous line-by-line manual code analysis paired with invariant fuzz testing in Foundry, symbolic execution with Slither, and state-machine threat modeling to expose and patch critical exploit vectors before mainnet deployment.",
    architecturePoints: [
      "Invariant-based property fuzz testing simulating 50,000+ random transaction state runs",
      "TWAP and Chainlink oracle manipulation vulnerability defense implementations",
      "Reentrancy guards and CEI (Checks-Effects-Interactions) strict validation across all state transitions"
    ],
    results:
      "Discovered 14 critical/high vulnerabilities and 28 medium findings across 6 protocol audits, preventing potential exploit exposure exceeding $18 million in TVL.",
    nextSlug: "subnet-mining"
  },
  {
    slug: "subnet-mining",
    title: "Bittensor Subnet Mining & AI Automation",
    tagline: "Algorithmic discovery, risk-vs-reward scoring, and VPS miner automation.",
    category: "Decentralized AI",
    role: "Web3 Researcher & Data Engineer",
    year: "2025—2026",
    client: "Decentralized AI Infrastructure",
    image: "/projects/subnet-mining.png",
    metrics: [
      "Real-Time Emission Tracking",
      "Automated Risk Scoring",
      "12+ Subnets Monitored"
    ],
    tags: ["Python", "Bittensor SDK", "Machine Learning", "VPS Telemetry", "CLI Automation"],
    githubUrl: "https://github.com/Jeffrey978/subnet-scout",
    overview:
      "Subnet Scout is a real-time intelligence and automation platform engineered for small-to-mid VPS miners operating across Bittensor's competitive decentralized AI subnets.",
    challenge:
      "Bittensor subnet mining requires constant parameter rebalancing. Miners often register on saturated or high-slashing subnets without knowing validator voting habits, leading to burned registration fees and negative hardware ROI.",
    solution:
      "Created an algorithmic intelligence engine that queries chain state, calculates validator stake distributions, computes daily emissions against server overhead, and outputs actionable ranking matrices via CLI and web digests.",
    architecturePoints: [
      "Async Bittensor blockchain poller extracting real-time validator weights and emissions",
      "Algorithmic opportunity-vs-risk heuristic scoring algorithm",
      "Automated CLI reporting and CSV/Markdown data export pipeline"
    ],
    results:
      "Enabled small miners to identify profitable under-saturated subnets, boosting mining alpha while avoiding slashing penalties.",
    nextSlug: "driftguard"
  },
  {
    slug: "driftguard",
    title: "DriftGuard",
    tagline: "Local-first Chrome extension that catches browsing drift before you lose an hour.",
    category: "Productivity AI",
    role: "Creator & Frontend Engineer",
    year: "2026",
    client: "Developer Tooling",
    image: "/projects/driftguard.png",
    metrics: [
      "100% Local-First Privacy",
      "<15ms Context Check",
      "Zero Cloud Telemetry"
    ],
    tags: ["Chrome Extensions API", "JavaScript", "React", "Local Storage", "Vercel"],
    liveUrl: "https://driftguard-murex.vercel.app",
    githubUrl: "https://github.com/Jeffrey978/driftguard",
    overview:
      "A privacy-first Chrome extension and companion web dashboard that stops subconscious tab-hopping and workflow drift using single-prompt friction checks.",
    challenge:
      "Most productivity extensions require invasive cloud permissions, recording full browsing histories on third-party servers, creating security concerns for developers and security researchers.",
    solution:
      "Built with a strict local-first architecture where session heuristics and drift detections run exclusively inside a Manifest V3 background service worker with zero cloud leaks.",
    architecturePoints: [
      "Manifest V3 background worker inspecting navigation intent without battery drain",
      "Zero-telemetry local storage maintaining 100% user data sovereignty",
      "Lightweight companion dashboard for weekly deep-work retrospectives"
    ],
    results:
      "Over 50 daily distractions halted per user with zero battery impact and zero network requests made during active browsing sessions.",
    nextSlug: "godfrey-moves"
  },
  {
    slug: "godfrey-moves",
    title: "Godfrey Moves Transport",
    tagline: "Premium commuter bus & intercity transit digital booking platform.",
    category: "Mobility Logistics",
    role: "Lead Frontend Engineer",
    year: "2026",
    client: "Godfrey Moves Ltd",
    image: "/projects/godfrey-moves.png",
    metrics: [
      "100% Mobile Responsive",
      "Real-Time Route Telemetry",
      "Zero Booking Friction"
    ],
    tags: ["Next.js", "Modern CSS", "GSAP ScrollTrigger", "Vercel", "UX Engineering"],
    liveUrl: "https://godfrey-moves-transport.vercel.app",
    githubUrl: "https://github.com/Jeffrey978/godfrey-moves-transport",
    overview:
      "Digital presence and fleet booking interface for Godfrey Moves Transport Ltd, a premium commuter transit operator in Port Harcourt.",
    challenge:
      "Transit schedules across Rivers State corridors are notoriously erratic. Commuters struggle to plan departures and verify available seats on executive buses.",
    solution:
      "Delivered a high-speed, mobile-optimized web application with live route maps, departure times, transparent fare tiers, and direct WhatsApp dispatch integration.",
    architecturePoints: [
      "Kinetic commuter route visualizer built with modern CSS & GSAP",
      "Optimized payload delivery for low-bandwidth mobile networks",
      "Direct dispatch integration for instant rider customer support"
    ],
    results:
      "Live deployment in Port Harcourt delivering instant route lookups and seamless reservations for intercity travelers.",
    nextSlug: "pulseswitch"
  }
];

export const PROFILE = {
  name: "Jeffrey",
  fullName: "Jeffrey Atuluku",
  role: "Web3 Researcher, Smart Contract Security Auditor & Full-Stack Web Developer",
  degree: "B.Sc. Computer Science",
  location: "Port Harcourt, NG",
  timeZone: "Africa/Lagos",
  email: "jeffreyatuluku@gmail.com",
  socials: {
    github: "https://github.com/Jeffrey978",
    x: "https://x.com/crypt_jeff1",
    linkedin: "https://linkedin.com/in/jeffreyatuluku",
  },
  introStatement:
    "Independent Web3 researcher and smart contract auditor in Port Harcourt. I review protocols and build high-assurance web applications, start to finish.",
  aboutStatement:
    "I’m Jeffrey. Computer Scientist, Web3 researcher and smart contract security auditor. I spend my days analyzing EVM bytecode, dissecting consensus mechanisms, and building web products that can't be tricked.",
  experience: [
    {
      year: "2024—Now",
      role: "Independent Auditor & Researcher",
      org: "Web3 & DeFi Protocols",
      location: "Remote / Port Harcourt",
      details: "Smart contract security audits, protocol threat modeling, formal verification, and decentralized AI research."
    },
    {
      year: "2025—2026",
      role: "Lead Systems Architect",
      org: "ServHive",
      location: "Port Harcourt, NG",
      details: "Engineered atomic escrow state machines, trade indexing engine, and full-stack marketplace infrastructure."
    },
    {
      year: "2024—2025",
      role: "Backend & Telemetry Engineer",
      org: "PulseSwitch & Subnet Scout",
      location: "Remote",
      details: "Built real-time financial reconciliation event queues and Bittensor subnet telemetry analytics."
    }
  ],
  services: [
    {
      number: "01",
      title: "Smart Contract Security Audits",
      description:
        "Comprehensive manual code review and automated fuzz testing for EVM protocols. Exposing reentrancy, access control bypasses, oracle manipulations, and state machine exploits before mainnet launch.",
      deliverables: [
        "Executive Audit Report & Risk Severity Matrix (Critical to Info)",
        "Automated Invariant Fuzzing Suite (Foundry / Slither)",
        "Remediation Validation & Verification Re-Audit",
        "Economic & Protocol Mechanism Stress Testing"
      ]
    },
    {
      number: "02",
      title: "Web3 & Protocol Research",
      description:
        "Deep-dive technical research on decentralized networks, tokenomics, consensus security, and decentralized AI infrastructure (including Bittensor subnet mechanisms).",
      deliverables: [
        "Protocol Architecture Whitepapers & Specifications",
        "Threat Modeling & Economic Attack Vector Analysis",
        "Subnet Emissions & Validator Staking Optimization",
        "Technical Documentation & Developer Guides"
      ]
    },
    {
      number: "03",
      title: "Full-Stack Web Development",
      description:
        "Building production-grade web applications with modern Next.js 16, TypeScript, robust databases, and refined motion choreography. From zero-trust escrow systems to interactive 3D WebGL experiences.",
      deliverables: [
        "Production Next.js 16 App Router Architectures",
        "Atomic State Machines & Escrow Payment Gateways",
        "Interactive 3D WebGL (Three.js / React Three Fiber)",
        "Ultra-Fast, High-Contrast Editorial User Interfaces"
      ]
    }
  ]
};
