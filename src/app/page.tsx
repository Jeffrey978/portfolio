"use client";

import Link from "next/link";
import { soundFX } from "@/components/ui/sound-effects";
import { ProjectRing } from "@/components/3d/project-ring";
import { PROFILE } from "@/lib/projects";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col justify-between w-full min-h-[calc(100vh-5rem)]">
      {/* 1. Calm Editorial Intro Statement (Theo Nolan style) */}
      <section className="pt-12 sm:pt-16 pb-4 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-start">
          {/* Subtle Live Status Pill */}
          <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="uppercase tracking-[0.14em]">PORT HARCOURT, NG &bull; AVAILABLE FOR AUDITS</span>
          </div>

          {/* Understated, Airy 2-Line Headline */}
          <h1 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-medium tracking-[-0.02em] text-neutral-100 leading-[1.35] max-w-3xl">
            {PROFILE.introStatement}
          </h1>
        </div>
      </section>

      {/* 2. Signature 3D Cylindrical Project Ring */}
      <section className="w-full flex-1 flex items-center justify-center my-auto">
        <ProjectRing />
      </section>

      {/* 3. Minimal Bottom Navigation & Direct Index Link */}
      <section className="pb-10 pt-4 px-4 sm:px-8 border-t border-white/[0.08]">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-3">
            <span>[ SCROLL OR DRAG TO ROTATE RING ]</span>
          </div>

          <Link
            href="/work"
            onClick={() => soundFX.playClick()}
            data-cursor="INDEX"
            className="text-white hover:text-neutral-300 underline underline-offset-4 flex items-center gap-1.5 transition-colors"
          >
            <span>Full Work Index (06)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
