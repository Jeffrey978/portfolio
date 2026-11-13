"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { soundFX } from "@/components/ui/sound-effects";
import { HeroScene } from "@/components/3d/hero-scene";
import { PROFILE } from "@/lib/data";
import { ArrowDownRight, Sparkles, Terminal, Box } from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-20 px-4 sm:px-8 flex flex-col justify-center overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Kinetic Editorial Typography & Story */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Status & Coordinate Pill */}
          <div
            ref={badgeRef}
            className="hero-reveal w-fit flex flex-wrap items-center gap-3 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-white/10 backdrop-blur-md text-xs font-mono text-neutral-300"
          >
            <span className="flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>STATUS: AVAILABLE</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="text-neutral-400">{PROFILE.location}</span>
          </div>

          {/* Main Headline */}
          <div className="flex flex-col gap-2">
            <div className="hero-reveal text-sm font-mono tracking-widest uppercase text-cyan-400 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>CREATIVE TECHNOLOGIST &amp; 3D ARCHITECT</span>
            </div>
            <h1
              ref={headlineRef}
              className="hero-reveal text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08]"
            >
              Building digital experiences at the edge of{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                spatial 3D
              </span>{" "}
              and choreography.
            </h1>
          </div>

          {/* Bio Subtitle */}
          <p className="hero-reveal text-base sm:text-lg text-neutral-400 max-w-2xl leading-relaxed">
            I craft high-assurance web applications, interactive 3D WebGL scenes, and kinetic interfaces. From verified escrow marketplaces (ServHive) to local-first privacy engines (DriftGuard) and decentralized AI analytics (Subnet Scout).
          </p>

          {/* Action CTAs */}
          <div className="hero-reveal flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#work"
              data-cursor="EXPLORE"
              onClick={() => soundFX.playClick()}
              className="px-6 py-3.5 rounded-full bg-cyan-400 text-black font-semibold text-sm font-mono tracking-wider uppercase flex items-center gap-2.5 hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 group"
            >
              <span>Explore Flagships</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              href="#blender"
              data-cursor="3D LAB"
              onClick={() => soundFX.playClick()}
              className="px-6 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-white/10 hover:border-cyan-500/40 text-white font-mono text-sm tracking-wider uppercase flex items-center gap-2.5 transition-all duration-300"
            >
              <Box className="w-4 h-4 text-cyan-400" />
              <span>Blender 3D Lab</span>
            </a>
          </div>

          {/* Metrics Band */}
          <div className="hero-reveal grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">04</div>
              <div className="text-xs text-neutral-400 font-mono uppercase mt-1">Proof-of-Works</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">100%</div>
              <div className="text-xs text-neutral-400 font-mono uppercase mt-1">Escrow &amp; Local First</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">60 FPS</div>
              <div className="text-xs text-neutral-400 font-mono uppercase mt-1">WebGL &amp; GSAP Flow</div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Centerpiece */}
        <div className="lg:col-span-5 h-full flex flex-col justify-center">
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
