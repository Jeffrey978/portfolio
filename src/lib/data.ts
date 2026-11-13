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
    category: "Full-Stack Marketplace / Escrow System",
    tagline: "Verified artisans marketplace with trust-first escrow payment architecture.",
    description:
      "A high-assurance marketplace connecting clients with verified artisans across Port Harcourt. Features an escrow payment gateway where funds are locked until job milestone sign-off, ID verification workflows, category trade indexing, and a real-time provider spotlight.",
    metrics: ["100% Escrow Protection", "10+ Regulated Trades", "Sub-100ms API Latency"],
    tags: ["Next.js 16", "React 19", "Prisma ORM", "Neon Postgres", "Clerk Auth", "Tailwind CSS", "GSAP"],
    githubUrl: "https://github.com/Jeffrey978/servhive",
    liveUrl: "https://servhive-ten.vercel.app",
    featured: true,
    color: "from-amber-500/20 via-orange-500/10 to-transparent",
    accentHex: "#f59e0b",
    year: "2026",
    architecture: [
      "Atomic escrow state machine preventing payment disputes",
      "Dynamic trade index querying Neon serverless Postgres with Prisma",
      "Adaptive SSR/SSG caching pipeline for lightning fast artisan directories"
    ]
  },
  {
    id: "driftguard",
    title: "DriftGuard",
    category: "Productivity AI & Chrome Extension",
    tagline: "Catch browser drift before it becomes a lost hour.",
    description:
      "A local-first Chrome extension and companion web dashboard engineered to halt subconscious tab-hopping and workflow drift. Intercepts distraction spirals with single-prompt friction checks, keeping high-focus builders in their flow state without invasive cloud tracking.",
    metrics: ["Local-First Zero Cloud Leak", "<15ms Context Check", "50+ Daily Distractions Prevented"],
    tags: ["Chrome Extensions API", "JavaScript", "React", "Local Storage", "Vercel", "Tailwind CSS"],
    githubUrl: "https://github.com/Jeffrey978/driftguard",
    liveUrl: "https://driftguard-murex.vercel.app",
    featured: true,
    color: "from-cyan-500/20 via-blue-500/10 to-transparent",
    accentHex: "#06b6d4",
    year: "2026",
    architecture: [
      "Manifest V3 background worker inspecting navigation intent without battery drain",
      "Zero telemetry privacy model keeping browsing history 100% on device",
      "Companion sync dashboard for weekly deep-work retrospectives"
    ]
  },
  {
    id: "godfrey-moves",
    title: "Godfrey Moves Transport",
    category: "Mobility Logistics & Booking Engine",
    tagline: "Premium commuter bus & intercity transit digital platform.",
    description:
      "Digital presence and fleet booking interface for Godfrey Moves Transport Ltd, a premium commuter transit operator in Port Harcourt. Delivers intuitive route discovery, departure schedules, charter inquiries, and a mobile-optimized reservation experience.",
    metrics: ["100% Mobile Responsive", "Real-Time Fleet Schedules", "Zero Booking Friction"],
    tags: ["Next.js", "Modern CSS", "GSAP ScrollTrigger", "Vercel", "UX Engineering"],
    githubUrl: "https://github.com/Jeffrey978/godfrey-moves-transport",
    liveUrl: "https://godfrey-moves-transport.vercel.app",
    featured: true,
    color: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accentHex: "#10b981",
    year: "2026",
    architecture: [
      "Kinetic commuter route visualizer built with modern CSS & GSAP",
      "Optimized payload delivery for low-bandwidth mobile networks",
      "Direct dispatch integration for instant rider customer support"
    ]
  },
  {
    id: "subnet-scout",
    title: "Subnet Scout",
    category: "Decentralized AI & Bittensor Analytics",
    tagline: "Bittensor subnet discovery & opportunity scoring engine for VPS miners.",
    description:
      "Specialized intelligence suite for small-to-mid VPS miners operating in the Bittensor ecosystem. Computes algorithmic opportunity-vs-risk scores, enriches validator identity, and outputs actionable terminal reports, CSV datasets, and Markdown digests.",
    metrics: ["Multi-Subnet Metric Aggregation", "Automated Risk vs Alpha Scoring", "Instant CLI & CSV Reports"],
    tags: ["Python", "Bittensor SDK", "Decentralized AI", "Data Analytics", "CLI Tools"],
    githubUrl: "https://github.com/Jeffrey978/subnet-scout",
    featured: true,
    color: "from-purple-500/20 via-pink-500/10 to-transparent",
    accentHex: "#a855f7",
    year: "2026",
    architecture: [
      "Async Bittensor blockchain telemetry poller extracting emission rates",
      "Heuristic scoring pipeline balancing hardware cost vs validator emission yield",
      "Modular export pipeline generating CLI ASCII tables and analysis reports"
    ]
  }
];

export const TECH_STACK = [
  { name: "Three.js / WebGL", category: "3D & Creative", level: "Advanced", icon: "Box" },
  { name: "React Three Fiber", category: "3D & Creative", level: "Advanced", icon: "Layers" },
  { name: "Blender 3D", category: "3D Modeling & Shaders", level: "3D Assets / PBR", icon: "BoxSelect" },
  { name: "GSAP & ScrollTrigger", category: "Animation", level: "Expert", icon: "Sparkles" },
  { name: "Next.js 16 (App Router)", category: "Frontend & Architecture", level: "Expert", icon: "Globe" },
  { name: "React 19 & TypeScript", category: "Frontend & Architecture", level: "Expert", icon: "Code2" },
  { name: "Tailwind CSS & Shadcn UI", category: "Design Systems", level: "Expert", icon: "Palette" },
  { name: "Python & Bittensor", category: "Backend & Decentralized AI", level: "Advanced", icon: "Cpu" },
  { name: "Prisma & PostgreSQL", category: "Database & Backend", level: "Advanced", icon: "Database" },
  { name: "Lenis Smooth Scroll", category: "UX & Performance", level: "Expert", icon: "Compass" }
];

export const PROFILE = {
  name: "Jeffrey Atuluku",
  role: "Creative Technologist & Full-Stack 3D Engineer",
  handle: "jeffrey978",
  github: "https://github.com/Jeffrey978",
  location: "Port Harcourt, Nigeria (WAT / UTC+1)",
  status: "Available for high-impact contracts & creative roles",
  bio: "Architecting interactive digital products at the convergence of 3D spatial computing, buttery-smooth GSAP choreography, and robust full-stack engineering."
};
