"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { soundFX } from "@/components/ui/sound-effects";
import { TECH_STACK, PROFILE } from "@/lib/data";
import { Clock, Shield, Layers, Cpu, Code2, CheckCircle2 } from "lucide-react";

export function BentoAboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeString(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".bento-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="architecture" ref={sectionRef} className="py-28 px-4 sm:px-8 relative border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/[0.08] pb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4" />
              <span>// ENGINEERING DISCIPLINES &amp; METRICS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Architecture Matrix
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md font-sans leading-relaxed">
            Architectural standards applied across all production systems: atomic escrow guarantees, local-first data privacy, and 60 FPS spatial interactions.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card 1: Core Tenets (Span 2 cols) */}
          <div className="bento-card md:col-span-2 rounded-3xl border border-white/[0.08] bg-neutral-900/60 backdrop-blur-xl p-8 flex flex-col justify-between hover:border-cyan-500/30 transition-colors">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-4">
                <Shield className="w-4 h-4" />
                <span>CORE PRINCIPLES</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                Trust-First and Local-First Engineering
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-sans mb-6">
                Software must eliminate risk for the end-user. In ServHive, that means locked escrow funds and verifiable job milestones. In DriftGuard, that means 100% on-device storage so personal browsing data never touches a remote server.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.08]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs font-sans">
                  <div className="font-semibold text-white">Escrow State Machines</div>
                  <div className="text-neutral-400">Zero disputes &amp; atomic payouts</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs font-sans">
                  <div className="font-semibold text-white">Zero-Cloud Privacy</div>
                  <div className="text-neutral-400">Local-first browser extensions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Port Harcourt Timezone */}
          <div className="bento-card rounded-3xl border border-white/[0.08] bg-neutral-900/60 backdrop-blur-xl p-8 flex flex-col justify-between hover:border-cyan-500/30 transition-colors">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-400 mb-4">
                <Clock className="w-4 h-4" />
                <span>TIMEZONE &amp; SYNC</span>
              </div>
              <div className="text-3xl font-mono font-bold text-white mb-2">
                {timeString || "00:00:00"}
              </div>
              <div className="text-xs font-mono text-neutral-400">
                Port Harcourt, Nigeria (WAT / UTC+1)
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>GLOBAL ASYNC READY</span>
              </div>
              <p className="text-xs text-neutral-400 font-sans">
                Full workday overlap with Europe, the UK, and East Coast US teams.
              </p>
            </div>
          </div>

          {/* Card 3: Uptime & Tech Stack */}
          <div className="bento-card rounded-3xl border border-white/[0.08] bg-neutral-900/60 backdrop-blur-xl p-8 flex flex-col justify-between hover:border-cyan-500/30 transition-colors">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-4">
                <Cpu className="w-4 h-4" />
                <span>RELIABILITY</span>
              </div>
              <div className="text-3xl font-mono font-bold text-white mb-1">
                99.98%
              </div>
              <div className="text-xs font-mono text-neutral-400">
                Production System Uptime
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08]">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-300 mb-2">
                <span>Next.js 16 App Router</span>
                <span className="text-cyan-400">Production</span>
              </div>
              <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full w-[98%]" />
              </div>
            </div>
          </div>

          {/* Card 4: Full Stack Chips (Span 4 cols) */}
          <div className="bento-card md:col-span-3 lg:col-span-4 rounded-3xl border border-white/[0.08] bg-neutral-900/60 backdrop-blur-xl p-8 hover:border-cyan-500/30 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
                <Code2 className="w-4 h-4" />
                <span>PRODUCTION TECH STACK</span>
              </div>
              <span className="text-xs font-mono text-neutral-400">
                Hover to test interactive audio haptics
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {TECH_STACK.map((tech, i) => (
                <div
                  key={i}
                  onMouseEnter={() => soundFX.playHover()}
                  data-cursor="TECH"
                  className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-cyan-500/40 transition-all duration-200 group flex flex-col justify-between"
                >
                  <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {tech.name}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                    <span>{tech.level}</span>
                    <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">●</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
