"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { soundFX } from "@/components/ui/sound-effects";
import { AmbientHeroBackground } from "@/components/3d/hero-scene";
import { PROFILE } from "@/lib/data";
import { ArrowRight, ShieldCheck, Box, CheckCircle2, Sparkles, Layers } from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-elem", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-24 px-4 sm:px-8 overflow-hidden"
    >
      {/* 1. Full-Bleed Ambient 3D WebGL Background Layer */}
      <AmbientHeroBackground />

      {/* 2. Foreground Editorial Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        {/* Verification & Location Badge */}
        <div className="hero-elem inline-flex items-center gap-3 px-4 py-2 rounded-full bg-neutral-900/90 border border-white/10 backdrop-blur-xl text-xs font-mono text-neutral-300 mb-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <span className="flex items-center gap-2 text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SERVHIVE &bull; PRODUCTION FLAGSHIP</span>
          </span>
          <span className="text-white/20">|</span>
          <span className="text-neutral-400">By {PROFILE.name} ({PROFILE.handle})</span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span className="text-cyan-400 hidden sm:inline">Port Harcourt, NG</span>
        </div>

        {/* Primary 1-Sentence High-Impact Headline */}
        <h1 className="hero-elem font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.035em] text-white leading-[1.08] max-w-4xl">
          Connecting verified artisans with clients across Port Harcourt—
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            protected by escrow.
          </span>
        </h1>

        {/* Crisp, Direct Subheadline */}
        <p className="hero-elem mt-6 text-base sm:text-xl text-neutral-300 max-w-2xl font-sans leading-relaxed">
          Hire vetted electricians, solar installers, plumbers, and technicians with transparent milestone verification. Payments are held safely in escrow and only release when the job is done right.
        </p>

        {/* Decisive Primary & Secondary Action CTAs */}
        <div className="hero-elem mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://servhive-ten.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="LAUNCH"
            onClick={() => soundFX.playClick()}
            className="px-7 py-4 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.45)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Launch ServHive Live</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#work"
            data-cursor="PROOF"
            onClick={() => soundFX.playClick()}
            className="px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all duration-300 backdrop-blur-md"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>View 4 Proof-of-Works</span>
          </a>

          <a
            href="#blender"
            data-cursor="3D LAB"
            onClick={() => soundFX.playClick()}
            className="px-6 py-4 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-white/10 hover:border-purple-500/40 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-300"
          >
            <Box className="w-4 h-4 text-purple-400" />
            <span>3D Blender Lab</span>
          </a>
        </div>

        {/* Key Guarantee Metrics Band */}
        <div className="hero-elem mt-16 pt-8 border-t border-white/10 w-full max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% ESCROW</span>
            </div>
            <div className="text-xs text-neutral-400">Zero upfront payment risk</div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ID-VERIFIED</span>
            </div>
            <div className="text-xs text-neutral-400">Vetted trades in PH City</div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-purple-400">
              <Layers className="w-3.5 h-3.5" />
              <span>LOCAL-FIRST</span>
            </div>
            <div className="text-xs text-neutral-400">DriftGuard &amp; privacy tools</div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400">
              <Box className="w-3.5 h-3.5" />
              <span>SPATIAL 3D</span>
            </div>
            <div className="text-xs text-neutral-400">Three.js + Blender pipeline</div>
          </div>
        </div>
      </div>
    </section>
  );
}
