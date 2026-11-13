"use client";

import { useState } from "react";
import Link from "next/link";
import { soundFX } from "@/components/ui/sound-effects";
import { CASE_STUDIES } from "@/lib/projects";
import { ArrowUpRight, ArrowRight, Shield, Layers, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const categories = [
    "ALL",
    "FINTECH / TELEMETRY",
    "ESCROW MARKETPLACE",
    "SECURITY RESEARCH",
    "DECENTRALIZED AI",
    "PRODUCTIVITY AI",
    "MOBILITY LOGISTICS",
  ];

  const filteredProjects = activeCategory === "ALL"
    ? CASE_STUDIES
    : CASE_STUDIES.filter((p) => p.category.toUpperCase().includes(activeCategory));

  return (
    <main className="flex-1 w-full max-w-full overflow-x-hidden py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="pb-10 sm:pb-12 border-b border-white/[0.08] mb-8 sm:mb-12">
        <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-[0.08em] sm:tracking-[0.14em] text-neutral-400 mb-3 sm:mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span>INDEX OF PRODUCTION SYSTEMS &bull; 06 ARCHITECTURES</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight break-words">
          SELECTED WORK <span className="text-neutral-500 font-normal text-xl sm:text-4xl md:text-5xl block sm:inline mt-1 sm:mt-0">(2022&mdash;2026)</span>
        </h1>
        <p className="mt-3 sm:mt-4 text-xs sm:text-base text-neutral-400 font-sans max-w-2xl leading-relaxed">
          Production systems, protocol audits, and decentralized infrastructure designed and engineered from start to finish by Atuluku Jeffrey.
        </p>

        {/* Category Filter Pills */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-1.5 sm:gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                soundFX.playClick();
              }}
              data-cursor={cat}
              className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-all ${
                activeCategory === cat
                  ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                  : "bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {filteredProjects.map((project, i) => (
          <div
            key={project.slug}
            className="rounded-3xl border border-white/[0.08] bg-[#0e0e10]/80 backdrop-blur-xl p-5 sm:p-10 flex flex-col justify-between hover:border-white/25 transition-all duration-300 group"
          >
            {/* Top Meta */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-white font-bold">(0{i + 1})</span>
                  <span className="uppercase tracking-wider text-[11px] text-neutral-300 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                    {project.category}
                  </span>
                </div>
                <span>{project.year}</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-neutral-100 transition-colors">
                {project.title}
              </h2>

              <p className="mt-2 text-sm font-mono text-neutral-300">
                {project.tagline}
              </p>

              {/* Real Project Screenshot */}
              <div className="relative my-5 h-48 sm:h-56 rounded-2xl overflow-hidden border border-white/10 bg-black/60 group-hover:border-white/20 transition-all">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              </div>

              <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                {project.overview}
              </p>

              {/* Architectural Highlights */}
              <div className="mt-6 pt-6 border-t border-white/5 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-neutral-500 block mb-2">
                  ARCHITECTURAL TENETS
                </span>
                {project.architecturePoints.map((pt, idx) => (
                  <div key={idx} className="text-xs text-neutral-300 flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">&bull;</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Metrics & Links */}
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-5">
              {/* Metrics Band */}
              <div className="flex flex-wrap gap-2">
                {project.metrics.map((m, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-neutral-200"
                  >
                    {m}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <Link
                  href={`/work/${project.slug}`}
                  onClick={() => soundFX.playClick()}
                  data-cursor="CASE STUDY"
                  className="flex-1 py-3 px-4 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Read Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="VISIT"
                    onClick={() => soundFX.playClick()}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-colors"
                    title="Live Deployment"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="REPO"
                    onClick={() => soundFX.playClick()}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-colors"
                    title="GitHub Repository"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
