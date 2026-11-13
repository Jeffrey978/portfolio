"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { soundFX } from "@/components/ui/sound-effects";
import { PROJECTS, Project } from "@/lib/data";
import { ExternalLink, ShieldCheck, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="EXPAND"
      className="project-item relative rounded-3xl border border-white/[0.08] bg-neutral-900/60 backdrop-blur-xl p-8 sm:p-10 transition-all duration-300 ease-out hover:border-cyan-500/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col justify-between overflow-hidden group"
      style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease" }}
    >
      {/* Ambient gradient glow */}
      <div
        className={`absolute -top-32 -right-32 w-72 h-72 bg-gradient-to-br ${project.color} rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700`}
      />

      {/* Content Top */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-neutral-500">
              [0{index + 1}]
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/20">
              {project.category}
            </span>
          </div>
          <span className="text-xs font-mono text-neutral-400">{project.year}</span>
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors flex items-center gap-3">
          {project.title}
          <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </h3>

        {/* Tagline */}
        <p className="text-sm font-medium text-neutral-300 mt-2 font-mono">
          {project.tagline}
        </p>

        {/* Plain-Language Scannable Description */}
        <p className="text-sm text-neutral-400 mt-4 leading-relaxed font-sans">
          {project.description}
        </p>

        {/* Architectural Features */}
        <div className="mt-6 pt-6 border-t border-white/[0.08]">
          <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Key Architectural Highlights</span>
          </div>
          <ul className="space-y-2">
            {project.architecture.map((arch, i) => (
              <li key={i} className="text-xs text-neutral-300 flex items-start gap-2 font-sans">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{arch}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Footer: Badges & Links */}
      <div className="mt-8 pt-6 border-t border-white/[0.08]">
        {/* Metric Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.metrics.map((metric, i) => (
            <span
              key={i}
              className="text-[11px] font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-neutral-200"
            >
              {metric}
            </span>
          ))}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-black/60 text-neutral-400 border border-neutral-800"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="CODE"
            onClick={() => soundFX.playClick()}
            className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Source Code</span>
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="LAUNCH"
              onClick={() => soundFX.playClick()}
              className="flex-1 py-3 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Launch Live App</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".project-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="py-28 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>// FLAGSHIP SYSTEMS &amp; PROOFS OF WORK</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Production Architectures
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md font-sans leading-relaxed">
            Four production systems engineered by Jeffrey Atuluku: marketplace escrow, local-first browser interception, transit booking, and decentralized AI intelligence.
          </p>
        </div>

        {/* 2x2 Clean Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
