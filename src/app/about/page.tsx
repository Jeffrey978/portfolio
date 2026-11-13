import Link from "next/link";
import { PROFILE } from "@/lib/projects";
import { ArrowUpRight, GraduationCap, Shield, Code2, Award } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";

export default function AboutPage() {
  return (
    <main className="flex-1 w-full max-w-full overflow-x-hidden py-12 sm:py-20 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Editorial Intro Headline */}
      <div className="pb-10 sm:pb-14 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-[0.08em] sm:tracking-[0.14em] text-neutral-400 mb-4 sm:mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span>BIOGRAPHY &bull; RESEARCH &bull; BACKGROUND</span>
        </div>

        <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-snug sm:leading-[1.14] break-words">
          {PROFILE.aboutStatement}
        </h1>
      </div>

      {/* Editorial 4-Column / Multi-Row Grid (Theo Nolan style) */}
      <div className="py-16 space-y-20">
        {/* Row 1: Academic Foundation & Philosophy */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 text-xs font-mono uppercase tracking-[0.14em] text-neutral-400">
            // FOUNDATION &amp; DEGREE
          </div>
          <div className="md:col-span-8 space-y-4">
            <h2 className="font-display text-2xl font-bold text-white">
              B.Sc. in Computer Science
            </h2>
            <p className="text-neutral-300 font-sans text-base leading-relaxed">
              My technical background is grounded in formal computer science: data structures, distributed consensus algorithms, cryptography, and operating systems. Rather than viewing Web3 as speculative hype, I approach smart contracts as immutable state-transition machines where a single unchecked arithmetic assumption or reentrancy hole can liquidate millions.
            </p>
            <p className="text-neutral-400 font-sans text-sm leading-relaxed">
              Operating out of Port Harcourt, Nigeria, I conduct independent smart contract security reviews, publish technical research on decentralized networks (such as Bittensor subnets), and engineer full-stack systems with rigorous fault tolerance.
            </p>
          </div>
        </section>

        {/* Row 2: Auditing & Research Methodology */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-14 border-t border-white/[0.08]">
          <div className="md:col-span-4 text-xs font-mono uppercase tracking-[0.14em] text-neutral-400">
            // AUDIT METHODOLOGY
          </div>
          <div className="md:col-span-8 space-y-6">
            <h2 className="font-display text-2xl font-bold text-white">
              Zero Assumptions. Adversarial Mindset.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono text-cyan-400 block mb-2">PHASE 01</span>
                <h3 className="font-display text-base font-bold text-white mb-1">Architecture &amp; Threat Modeling</h3>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  Mapping all user roles, state variables, external calls, and trust boundaries before touching automated tools.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono text-purple-400 block mb-2">PHASE 02</span>
                <h3 className="font-display text-base font-bold text-white mb-1">Line-by-Line Manual Review</h3>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  Analyzing business logic edge cases, flash loan sensitivities, oracle TWAPs, and CEI pattern violations.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono text-emerald-400 block mb-2">PHASE 03</span>
                <h3 className="font-display text-base font-bold text-white mb-1">Invariant Fuzz Testing</h3>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  Writing property-based invariants in Foundry, running 100,000+ pseudo-random state transitions.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-xs font-mono text-amber-400 block mb-2">PHASE 04</span>
                <h3 className="font-display text-base font-bold text-white mb-1">Actionable Mitigation Report</h3>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  Delivering reproducible proof-of-concept (PoC) test files and exact remediation code diffs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Row 3: Experience Timeline */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-14 border-t border-white/[0.08]">
          <div className="md:col-span-4 text-xs font-mono uppercase tracking-[0.14em] text-neutral-400">
            // EXPERIENCE TIMELINE
          </div>
          <div className="md:col-span-8 divide-y divide-white/[0.08]">
            {PROFILE.experience.map((item, i) => (
              <div key={i} className="py-6 first:pt-0">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                  <span className="text-white font-bold">{item.year}</span>
                  <span>{item.location}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  {item.role} &mdash; <span className="text-neutral-400 font-normal">{item.org}</span>
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-2 leading-relaxed">
                  {item.details}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Row 4: Technical Arsenal */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-14 border-t border-white/[0.08]">
          <div className="md:col-span-4 text-xs font-mono uppercase tracking-[0.14em] text-neutral-400">
            // TECHNICAL ARSENAL
          </div>
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "Solidity", note: "EVM Smart Contracts" },
              { label: "Foundry / Forge", note: "Fuzzing & PoC Tests" },
              { label: "Slither", note: "Static Analysis" },
              { label: "Next.js 16", note: "App Router / SSR" },
              { label: "TypeScript", note: "Type-Safe Systems" },
              { label: "Python", note: "Data & Bittensor AI" },
              { label: "PostgreSQL / Prisma", note: "Relational Modeling" },
              { label: "Three.js / WebGL", note: "3D Spatial Computing" },
              { label: "GSAP", note: "Motion Choreography" },
            ].map((skill, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-sm font-semibold text-white font-display">{skill.label}</div>
                <div className="text-[10px] font-mono text-neutral-400 mt-1">{skill.note}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Action Footer */}
      <div className="pt-12 border-t border-white/[0.08] flex items-center justify-between">
        <Link
          href="/work"
          className="text-xs font-mono uppercase tracking-[0.12em] text-neutral-400 hover:text-white transition-colors"
        >
          &larr; View Case Studies
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors"
        >
          Work With Jeffrey &rarr;
        </Link>
      </div>
    </main>
  );
}
