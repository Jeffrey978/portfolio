"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { CASE_STUDIES, CaseStudy } from "@/lib/projects";
import { soundFX } from "@/components/ui/sound-effects";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

export function ProjectRing() {
  const [rotation, setRotation] = useState(0);
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const lastDeltaX = useRef(0);
  const reqId = useRef<number | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(440);

  // Responsive radius
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(280);
      } else if (window.innerWidth < 1024) {
        setRadius(360);
      } else {
        setRadius(460);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth animation frame loop for inertia
  useEffect(() => {
    const update = () => {
      const diff = targetRotation.current - currentRotation.current;
      currentRotation.current += diff * 0.08;
      setRotation(currentRotation.current);

      // Determine the active card at front
      const anglePerCard = 360 / CASE_STUDIES.length;
      const normalizedAngle = (-currentRotation.current % 360 + 360) % 360;
      const index = Math.round(normalizedAngle / anglePerCard) % CASE_STUDIES.length;
      setActiveCardIndex(index);

      reqId.current = requestAnimationFrame(update);
    };

    reqId.current = requestAnimationFrame(update);
    return () => {
      if (reqId.current) cancelAnimationFrame(reqId.current);
    };
  }, []);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    lastDeltaX.current = 0;
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;
    lastDeltaX.current = deltaX;
    targetRotation.current += deltaX * 0.25;
    startX.current = e.clientX;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    // Add residual momentum
    targetRotation.current += lastDeltaX.current * 0.5;
  }, []);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    lastDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.touches[0].clientX - startX.current;
    lastDeltaX.current = deltaX;
    targetRotation.current += deltaX * 0.35;
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    targetRotation.current += lastDeltaX.current * 0.6;
  };

  // Scroll wheel rotation listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      // Only capture horizontal or slight vertical scroll when interacting with the ring
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        targetRotation.current -= e.deltaX * 0.2;
      } else if (e.shiftKey) {
        targetRotation.current -= e.deltaY * 0.2;
      }
    };

    container.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      container.removeEventListener("wheel", onWheel);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const rotateTo = (index: number) => {
    soundFX.playClick();
    const anglePerCard = 360 / CASE_STUDIES.length;
    targetRotation.current = -index * anglePerCard;
  };

  const anglePerCard = 360 / CASE_STUDIES.length;

  return (
    <div className="relative w-full py-12 flex flex-col items-center select-none overflow-hidden">
      {/* Micro-Instructions & Active Counter */}
      <div className="flex items-center justify-between w-full max-w-4xl px-4 sm:px-6 mb-6 text-xs font-mono uppercase tracking-[0.14em] text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>PROJECT RING // 0{activeCardIndex + 1} OF 0{CASE_STUDIES.length}</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-neutral-500">
          <span>[ DRAG OR USE CONTROLS ]</span>
        </div>
      </div>

      {/* 3D Perspective Stage */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-[460px] sm:h-[520px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ perspective: "1500px" }}
      >
        {/* The Rotating Cylinder Ring */}
        <div
          className="relative w-[280px] sm:w-[320px] h-[380px] sm:h-[420px]"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(-4deg) rotateY(${rotation}deg)`,
            transition: isDragging.current ? "none" : "transform 0.1s ease-out",
          }}
        >
          {CASE_STUDIES.map((project, i) => {
            const cardAngle = i * anglePerCard;
            return (
              <div
                key={project.slug}
                className="absolute inset-0 rounded-2xl border border-white/10 bg-[#0f0f11]/90 backdrop-blur-xl p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 hover:scale-[1.03] hover:border-white/30 group"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Card Header */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3 pb-3 border-b border-white/5">
                    <span className="text-white font-bold">(0{i + 1})</span>
                    <span className="uppercase tracking-wider text-[10px] text-neutral-400">
                      {project.category}
                    </span>
                    <span className="text-[10px]">{project.year}</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-neutral-100 transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-xs text-neutral-400 line-clamp-3 leading-relaxed font-sans">
                    {project.tagline}
                  </p>
                </div>

                {/* Minimal Architectural Visual Slate */}
                <div className="relative my-4 h-28 sm:h-32 rounded-xl bg-gradient-to-br from-white/[0.04] to-black/60 border border-white/5 p-4 flex flex-col justify-end overflow-hidden">
                  <div className="absolute top-3 right-3 text-[10px] font-mono text-neutral-500">
                    STATUS: AUDITED
                  </div>
                  <div className="space-y-1">
                    {project.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="text-[11px] font-mono text-neutral-300 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-white/70" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">
                    EXPLORE CASE STUDY
                  </span>
                  <Link
                    href={`/work/${project.slug}`}
                    onClick={() => soundFX.playClick()}
                    data-cursor="VIEW"
                    className="p-1.5 rounded-full bg-white/5 hover:bg-white text-white hover:text-black transition-all flex items-center justify-center"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls & Dot Strip */}
      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={() => {
            const nextIdx = (activeCardIndex - 1 + CASE_STUDIES.length) % CASE_STUDIES.length;
            rotateTo(nextIdx);
          }}
          data-cursor="PREV"
          aria-label="Previous Project"
          className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {CASE_STUDIES.map((_, i) => (
            <button
              key={i}
              onClick={() => rotateTo(i)}
              data-cursor={`0${i + 1}`}
              aria-label={`Jump to project 0${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeCardIndex === i
                  ? "w-7 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  : "w-2 bg-white/20 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => {
            const nextIdx = (activeCardIndex + 1) % CASE_STUDIES.length;
            rotateTo(nextIdx);
          }}
          data-cursor="NEXT"
          aria-label="Next Project"
          className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
