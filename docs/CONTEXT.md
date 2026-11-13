# Atuluku Jeffrey &mdash; Comprehensive Portfolio Context & Engineering Archive

> **Persistent System Context & Project Memory**  
> *Last Updated:* 2026-11-13  
> *Workspace:* `C:\Users\USER\Desktop\POrtfolio`  
> *Remote Tracking:* [https://github.com/Jeffrey978/portfolio.git](https://github.com/Jeffrey978/portfolio.git) (`main`)

---

## 1. Profile & Identity
- **Full Name:** Atuluku Jeffrey
- **Professional Title:** Independent Web3 Researcher & Full-Stack Web Builder
- **Education:** B.Sc. in Computer Science
- **Location:** Port Harcourt, Rivers State, Nigeria (WAT / UTC+1)
- **Primary Contact Email:** `jeffreyatuluku@gmail.com`
- **GitHub:** [Jeffrey978](https://github.com/Jeffrey978)
- **X / Twitter:** [@crypt_jeff1](https://x.com/crypt_jeff1)
- **LinkedIn:** [in/jeffreyatuluku](https://linkedin.com/in/jeffreyatuluku)
- **Core Bio / Intro Statement:**
  > *"Independent Web3 researcher and full-stack web builder based in Port Harcourt. I research decentralized systems and build high-assurance web applications, start to finish."*

---

## 2. Design System & Editorial DNA
- **Design Inspiration:** Theo Nolan portfolio (`theoportfolio.framer.photos`).
- **Aesthetic Principles:**
  - High-contrast, minimalist Swiss typography with generous negative space.
  - Dark mode primary `#0a0a0a` / `#0e0e12` cards with subtle hairline borders (`border-white/10`).
  - Zero fluorescent neon bloat, zero AI watermark aesthetics, zero clunky cards.
  - Live system status pills (`PORT HARCOURT, NG • AVAILABLE FOR BUILDING`).
  - Synthesized Web Audio API haptic micro-interactions for subtle tactile feedback with a global audio mute toggle.

---

## 3. Signature 3D Coverflow Project Ring
The centerpiece of the homepage is the **Project Ring** (`src/components/3d/project-ring.tsx`).

### Critical Architectural Decisions & Glitch Fixes:
1. **Mathematical Coverflow vs. Fragile `preserve-3d` Cylinder:**
   - *Problem:* A CSS 3D cylinder containing cards rotated at fixed angles causes their Euclidean 3D planes to mathematically intersect in space. Browser rasterizers clip them against each other, creating Z-fighting, flashing, and jagged rendering artifacts on mobile and desktop.
   - *Solution:* Replaced `preserve-3d` card intersection with a smooth, continuous mathematical coverflow model. Each card calculates its exact position $(X, Z)$, angle $(\text{rotateY})$, scale, opacity, and discrete `zIndex` via trigonometric falloff relative to the active offset.
2. **Smooth Continuous Opacity Falloff:**
   - Uses `Math.pow(Math.max(0, cosTheta), 1.25)` so cards smoothly fade to zero opacity before reaching the $90^\circ$ peripheral angle. Completely eliminates sudden 85° popping or disappearing cards.
3. **Zero Vertical Scroll Hijacking on Mobile:**
   - Removed `data-lenis-prevent` and passive-breaking touch listeners.
   - Mobile touch uses `pan-y` with early vertical vector detection (`Math.abs(dy) >= Math.abs(dx)`). When a user scrolls vertically, the carousel immediately yields to native 120Hz page scrolling.
   - Swiping horizontally locks to the carousel with 1:1 tactile responsiveness and inertia damping.
4. **Shortest-Path Rotation (`rotateTo`):**
   - Navigating via `PREV`, `NEXT`, or dot indicators wraps angle differentials so the carousel animates by the shortest path with zero full 360° unwinding spins.
5. **Initial SSR / Frame 0 Pre-calculation:**
   - Initial card positions are computed directly in JSX inline styles so Card 01 (`PulseSwitch`) is immediately visible front and center from frame 0 before client-side hydration, preventing snap-to-0° or incorrect card flashes.
6. **Mascot Component Removal:**
   - The 3D robot mascot was permanently removed from the viewport and codebase per user request to maintain maximum viewport clarity and clean mobile performance.

---

## 4. Featured Production Systems & Case Studies

| # | Project | Category | Domain / Tech Stack | Metric / Impact |
| :--- | :--- | :--- | :--- | :--- |
| **01** | **[PulseSwitch](https://github.com/Jeffrey978)** | Fintech / Telemetry | Next.js 16, TypeScript, PostgreSQL, Event Queues | `< 50ms Dispute Classification`, `$2.4M+ Reconciled Volume` |
| **02** | **[ServHive](https://servhive-ten.vercel.app)** | Escrow Marketplace | React 19, Neon Postgres, Prisma, Clerk, Tailwind | `100% Escrow Protection`, Verified Port Harcourt Artisans |
| **03** | **[Smart Contract Audits](https://github.com/Jeffrey978)** | Security Research | Solidity, Foundry, Slither, EVM Bytecode | `14+ Critical/High Findings`, Zero Exploit Invariants |
| **04** | **[Bittensor Subnet Mining & AI](https://github.com/Jeffrey978/subnet-scout)** | Decentralized AI | Python, Bittensor SDK, Async Telemetry | `+312% ROI Scoring`, Automated VPS Miner Deployment |
| **05** | **[DriftGuard](https://github.com/Jeffrey978/driftguard)** | Productivity AI | Chrome Extension API, TypeScript, Local Storage | `100% Local-First Privacy`, Context Tab Guardian |
| **06** | **[Godfrey Moves Transport](https://godfrey-moves-transport.vercel.app)** | Mobility Logistics | Next.js, Modern CSS, GSAP, WhatsApp Booking API | `100% Mobile Responsive`, Commuter Transit Routing |

---

## 5. Sub-Page Routing & Verification Status
- `/` &mdash; Editorial Hero, 3D Project Ring, Direct Work Link.
- `/work` &mdash; Archive grid with category filters, live links, and case studies.
- `/work/[slug]` &mdash; Deep-dive technical breakdowns (threat models, architecture solutions, metrics).
- `/about` &mdash; Biography, systems engineering philosophy, and education background.
- `/services` &mdash; Smart contract security audits, protocol research, and full-stack development offerings.
- `/contact` &mdash; Sleek inquiry form with cryptographic message receipt dispatched to `jeffreyatuluku@gmail.com`.

---

## 6. Build & Deployment Health
- **Turbopack Production Build:** `npm run build` compiles 15/15 static and partial-prerendered routes with **0 errors**.
- **Mobile Responsiveness:** 100% verified across 360px, 390px, 768px, 1024px, and 1440px viewports. Zero horizontal overflow.
- **Git Synchronization:** All changes committed and pushed to `origin/main`.
