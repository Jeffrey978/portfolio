export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  metrics: string[];
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  color: string;
  accentHex: string;
  year: string;
  architecture: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "servhive",
    title: "ServHive",
    category: "Verified Marketplace & Escrow System",
    tagline: "Port Harcourt's verified artisan marketplace with zero-risk escrow protection.",
    description:
      "Connects homeowners and businesses in Port Harcourt with vetted electricians, plumbers, solar engineers, and technicians. Money is locked securely in escrow and only released once you inspect and approve completed work.",
    metrics: ["100% Escrow Protection", "10+ Vetted Trades", "Sub-100ms API Latency"],
    tags: ["Next.js 16", "React 19", "Prisma ORM", "Neon Postgres", "Clerk Auth", "Tailwind CSS"],
    githubUrl: "https://github.com/Jeffrey978/servhive",
    liveUrl: "https://servhive-ten.vercel.app",
    featured: true,
    color: "from-amber-500/20 via-orange-500/10 to-transparent",
    accentHex: "#f59e0b",
    year: "2026",
    architecture: [
      "Atomic escrow state machine preventing payment disputes and contractor ghosting",
      "Serverless Postgres database powering instant artisan directory queries",
      "Direct milestone sign-off with in-app proof of work verification"
    ]
  },
  {
    id: "driftguard",
    title: "DriftGuard",
    category: "Local-First Productivity Tool",
    tagline: "Catches browsing drift before you lose productive hours.",
    description:
      "A lightweight, privacy-first browser extension that stops subconscious tab-hopping. Intercepts distraction spirals with a single friction prompt, keeping you in deep work without sending your browsing data to any cloud server.",
    metrics: ["100% Local-First Privacy", "<15ms Context Check", "50+ Distractions Blocked Daily"],
    tags: ["Chrome Extensions API", "JavaScript", "React", "Local Storage", "Vercel"],
    githubUrl: "https://github.com/Jeffrey978/driftguard",
    liveUrl: "https://driftguard-murex.vercel.app",
    featured: true,
    color: "from-cyan-500/20 via-blue-500/10 to-transparent",
    accentHex: "#06b6d4",
    year: "2026",
    architecture: [
      "Manifest V3 background worker inspecting navigation intent without battery drain",
      "100% on-device local storage with zero cloud telemetry",
      "Focus analytics dashboard showing productive hours reclaimed each week"
    ]
  },
  {
    id: "godfrey-moves",
    title: "Godfrey Moves Transport",
    category: "Mobility Logistics & Booking Engine",
    tagline: "Modern commuter transit booking engine for Port Harcourt travelers.",
    description:
      "A clean, high-speed digital presence and seat reservation platform for Godfrey Moves Transport Ltd. Lets commuters find departure schedules, view active routes across Rivers State, and book charters with zero friction.",
    metrics: ["100% Mobile Responsive", "Real-Time Fleet Schedules", "Direct Dispatch Booking"],
    tags: ["Next.js", "Modern CSS", "GSAP ScrollTrigger", "Vercel", "UX Engineering"],
    githubUrl: "https://github.com/Jeffrey978/godfrey-moves-transport",
    liveUrl: "https://godfrey-moves-transport.vercel.app",
    featured: true,
    color: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accentHex: "#10b981",
    year: "2026",
    architecture: [
      "Real-time departure and arrival schedules optimized for mobile phones",
      "Instant WhatsApp and direct dispatch integrations for rider customer support",
      "Ultra-lightweight static assets that load instantly even on 3G connections"
    ]
  },
  {
    id: "subnet-scout",
    title: "Subnet Scout",
    category: "Decentralized AI & Bittensor Analytics",
    tagline: "Subnet discovery and profit vs. risk scoring engine for VPS miners.",
    description:
      "An intelligence suite that helps small-to-mid VPS miners navigate the decentralized AI Bittensor ecosystem. Aggregates live emissions, calculates hardware ROI against validator risk, and outputs actionable terminal reports.",
    metrics: ["Live Subnet Emission Aggregation", "Automated Risk vs Alpha Scoring", "Instant CLI & CSV Reports"],
    tags: ["Python", "Bittensor SDK", "Decentralized AI", "Data Analytics", "CLI Tools"],
    githubUrl: "https://github.com/Jeffrey978/subnet-scout",
    featured: true,
    color: "from-purple-500/20 via-pink-500/10 to-transparent",
    accentHex: "#a855f7",
    year: "2026",
    architecture: [
      "Real-time blockchain telemetry poller tracking subnet emission yields",
      "Algorithmic risk score comparing VPS server operating cost to token rewards",
      "Automated CLI report and CSV export pipeline for miner decision-making"
    ]
  }
];

export const TECH_STACK = [
  { name: "Next.js 16 (App Router)", category: "Frontend & Architecture", level: "Production", icon: "Globe" },
  { name: "React 19 & TypeScript", category: "Frontend & Architecture", level: "Production", icon: "Code2" },
  { name: "Three.js & R3F", category: "3D & Creative", level: "Production", icon: "Box" },
  { name: "GSAP & ScrollTrigger", category: "Choreography", level: "Production", icon: "Sparkles" },
  { name: "Blender 3D", category: "Modeling & PBR", level: "Assets / PBR", icon: "BoxSelect" },
  { name: "Prisma & PostgreSQL", category: "Database & Escrow", level: "Production", icon: "Database" },
  { name: "Tailwind CSS & Shadcn", category: "Design Systems", level: "Production", icon: "Palette" },
  { name: "Python & Bittensor", category: "Decentralized AI", level: "Production", icon: "Cpu" },
  { name: "Chrome Extensions API", category: "Browser Engines", level: "Production", icon: "Layers" },
  { name: "Lenis Inertia Scroll", category: "UX & Performance", level: "Production", icon: "Compass" }
];

export const PROFILE = {
  name: "Jeffrey Atuluku",
  role: "Creative Technologist & Full-Stack Systems Engineer",
  handle: "jeffrey978",
  github: "https://github.com/Jeffrey978",
  location: "Port Harcourt, Nigeria (WAT / UTC+1)",
  status: "Available for high-impact contracts & senior roles",
  bio: "Creator of ServHive (verified artisan escrow platform in Port Harcourt), DriftGuard, and high-performance WebGL systems."
};
