# DESIGN DNA — THEO NOLAN TEMPLATE (theoportfolio.framer.photos)

## 1. Color Palette
- Background Primary (Dark): `#0a0a0a` / `#0d0d0d`
- Background Primary (Light/Paper alternative): `#f6f5f1`
- Text Primary (High Contrast): `#ffffff` (Dark mode) / `#0a0a0a` (Light mode)
- Text Muted: `#888888` / `#6f6f6f` / `#999999`
- Hairline Borders: `rgba(255, 255, 255, 0.08)` / `rgba(255, 255, 255, 0.12)`
- Surface Cards: `rgba(255, 255, 255, 0.03)` with subtle backdrop blur
- Minimal Indicator / Status Dot: `#e5482d` (coral/red) or `#10b981` (live indicator)

## 2. Typography Hierarchy
- Display / Headings: Modern editorial sans-serif (Plus Jakarta Sans / Satoshi / Inter), font-weight 500-700, tight tracking (`tracking-[-0.03em]`), generous line-height (`1.15-1.25`).
- Body Copy: Clean grotesk / neutral sans (Inter), font-weight 400-500, relaxed readability, max line-length `65-75ch`.
- Micro-Labels & Navigation: Strict uppercase tracking (`uppercase tracking-[0.12em] text-[11px] font-mono` or tight sans), muted opacity.

## 3. Header & Navigation Structure
- Header: Fixed or relative minimalist top bar:
  - Left: Name (`Jeffrey`) & Title (`Web3 Researcher & Security Auditor`)
  - Center/Sub: Live time & Location (`Port Harcourt, NG • 02:54 WAT`)
  - Nav: Horizontal uppercase text links (`WORK`, `ABOUT`, `SERVICES`, `CONTACT`)
  - Socials: Compact micro-pills (`X`, `GH`, `LI`)
  - Mobile: Clean dropdown or drawer toggle (`MENU`)

## 4. Signature 3D Cylindrical Project Ring
- Layout: 3D perspective viewport (`perspective: 1600px`).
- Geometry: Cylinder ring with cards spaced evenly along `rotateY(i * angle)` and pushed outward via `translateZ(radius)`.
- Motion:
  - Rotates with scroll position or drag interactions.
  - Smooth inertia damping.
  - Active / hovered card tilts smoothly toward the user (`scale(1.05)`, subtle flatten angle) for an irresistible tactile feel.
  - Direct navigation to `/work/[slug]`.

## 5. Sub-Page Architecture
- `/work`: Archive of all projects in a clean grid with category filters, roles, and year.
- `/work/[slug]`: Deep-dive case studies with threat models, architectural solutions, and outcomes.
- `/about`: Editorial biography, education (B.Sc. Computer Science), timeline of security audits and systems engineering.
- `/services`: Smart contract security audits, protocol research, and full-stack engineering deliverables.
- `/contact`: Direct email link, location, availability badge, and sleek inquiry form.
