"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlenderStudioViewer } from "@/components/3d/model-viewer";
import { Box, Sparkles, Sliders, Cpu, Workflow } from "lucide-react";

export function BlenderLabSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".blender-reveal", {
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
    <section id="blender" ref={sectionRef} className="py-28 px-4 sm:px-8 relative bg-neutral-950/40 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="blender-reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/[0.08] pb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-2 mb-3">
              <Box className="w-4 h-4" />
              <span>// 3D SPATIAL COMPUTING &amp; BLENDER WORKFLOW</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Interactive 3D Studio
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md font-sans leading-relaxed">
            A production WebGL stage designed for inspecting Blender 3D assets with real-time PBR lighting, orbit controls, and wireframe analysis.
          </p>
        </div>

        {/* Feature Specs Grid */}
        <div className="blender-reveal grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col gap-1.5">
            <span className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              PBR LIGHTING
            </span>
            <span className="text-sm font-semibold text-white">4 Studio Environments</span>
            <span className="text-[11px] text-neutral-400">Cyber Neon, Studio Soft, Void, Sunset</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col gap-1.5">
            <span className="flex items-center gap-2 text-xs font-mono text-purple-400">
              <Workflow className="w-3.5 h-3.5" />
              BLENDER GLTF PIPELINE
            </span>
            <span className="text-sm font-semibold text-white">Direct .GLB Drop-In</span>
            <span className="text-[11px] text-neutral-400">Place models in public/models/</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col gap-1.5">
            <span className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Sliders className="w-3.5 h-3.5" />
              ORBIT CONTROLS
            </span>
            <span className="text-sm font-semibold text-white">360° Inspection</span>
            <span className="text-[11px] text-neutral-400">Pan, zoom, and rotate any angle</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col gap-1.5">
            <span className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Cpu className="w-3.5 h-3.5" />
              PERFORMANCE
            </span>
            <span className="text-sm font-semibold text-white">60 FPS Hardware GL</span>
            <span className="text-[11px] text-neutral-400">DPR auto-scaling &amp; contact shadows</span>
          </div>
        </div>

        {/* Studio Viewport */}
        <div className="blender-reveal">
          <BlenderStudioViewer />
        </div>
      </div>
    </section>
  );
}
