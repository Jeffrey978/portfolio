"use client";

import Link from "next/link";
import { soundFX } from "@/components/ui/sound-effects";
import { ProjectRing } from "@/components/3d/project-ring";
import { PROFILE, CASE_STUDIES } from "@/lib/projects";
import { ArrowUpRight, ArrowRight, Shield, Cpu, Code2, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col w-full">
      {/* 1. HERO SECTION: Understated Editorial Statement */}
      <section className="pt-20 pb-8 px-4 sm:px-8 border-b border-white/[0.08] relative">
        <div className="max-w-5xl mx-auto flex flex-col items-start">
          {/* Micro Status Label */}
          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.14em] text-neutral-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AVAILABLE FOR SECURITY AUDITS &amp; HIGH-IMPACT CONTRACTS</span>
          </div>

          {/* Understated Editorial Statement (Theo Nolan tone) */}
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] text-white leading-[1.12] max-w-4xl">
            {PROFILE.introStatement}
          </h1>

          {/* Micro Details Row */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] w-full flex flex-wrap items-center justify-between gap-6 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-6">
              <span>SPECIALIZATION: EVM SECURITY &bull; DECENTRALIZED AI &bull; NEXT.JS</span>
              <span className="hidden sm:inline">&bull;</span>
              <span className="text-white hidden sm:inline">{PROFILE.degree}</span>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/work"
                onClick={() => soundFX.playClick()}
                data-cursor="ARCHIVE"
                className="text-white hover:text-neutral-300 underline underline-offset-4 flex items-center gap-1 transition-colors"
              >
                <span>View Full Index</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE 3D PROJECT RING */}
      <section className="relative w-full border-b border-white/[0.08] bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
        <ProjectRing />
      </section>

      {/* 3. CORE DISCIPLINES GRID (Minimalist Editorial Columns) */}
      <section className="py-24 px-4 sm:px-8 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 pb-4 border-b border-white/[0.08]">
            <span className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-400">
              // CORE CAPABILITIES &amp; PRACTICES
            </span>
            <span className="text-xs font-mono text-neutral-500">
              DISCIPLINES: 03
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROFILE.services.map((svc) => (
              <div
                key={svc.number}
                className="p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex flex-col justify-between hover:border-white/20 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-6">
                    <span className="text-white font-bold font-mono">{svc.number}</span>
                    <span className="text-[10px] uppercase tracking-wider">PRODUCTION DISCIPLINE</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-3 tracking-tight">
                    {svc.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-6">
                    {svc.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 space-y-2">
                  {svc.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="text-[11px] font-mono text-neutral-300 flex items-start gap-2">
                      <span className="text-neutral-500 mt-0.5">&bull;</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WORK ARCHIVE LISTING (Quick Scannable Feed) */}
      <section className="py-24 px-4 sm:px-8 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
            <span className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-400">
              // CASE STUDIES DIRECTORY
            </span>
            <Link
              href="/work"
              onClick={() => soundFX.playClick()}
              data-cursor="VIEW ALL"
              className="text-xs font-mono uppercase tracking-wider text-white hover:text-neutral-300 flex items-center gap-1.5"
            >
              <span>Explore All (06)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-white/[0.08]">
            {CASE_STUDIES.map((project, i) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                onClick={() => soundFX.playClick()}
                data-cursor="CASE STUDY"
                className="py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 group transition-colors hover:px-2"
              >
                <div className="flex items-start md:items-center gap-4">
                  <span className="text-xs font-mono text-neutral-500 w-8">
                    0{i + 1}
                  </span>
                  <div>
                    <h4 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-neutral-200 transition-colors">
                      {project.title}
                    </h4>
                    <span className="text-xs text-neutral-400 font-sans mt-0.5 block">
                      {project.tagline}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs font-mono text-neutral-400 shrink-0">
                  <span className="hidden sm:inline px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase">
                    {project.category}
                  </span>
                  <span>{project.year}</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION: Direct Contact Prompt */}
      <section className="py-28 px-4 sm:px-8 bg-[#0a0a0a] text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-400 mb-4">
            // NEXT INITIATIVE
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Need a protocol audited or a high-assurance platform built?
          </h2>
          <p className="mt-4 text-sm text-neutral-400 font-sans max-w-xl">
            Currently accepting smart contract security reviews, Web3 technical research, and full-stack engineering contracts.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              onClick={() => soundFX.playClick()}
              data-cursor="CONTACT"
              className="px-8 py-4 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Initiate Contact &rarr;
            </Link>
            <Link
              href="/about"
              onClick={() => soundFX.playClick()}
              data-cursor="ABOUT"
              className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-wider transition-all"
            >
              Read Biography
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
