"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/projects";
import { soundFX } from "@/components/ui/sound-effects";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

export function ProjectRing() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const activeCardIndexRef = useRef(0);
  const [radius, setRadius] = useState(440);

  // Animation & Physics Refs
  const ringRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const lastDeltaX = useRef(0);
  const touchAxis = useRef<"horizontal" | "vertical" | null>(null);
  const reqId = useRef<number | null>(null);
  const wheelSnapTimer = useRef<NodeJS.Timeout | null>(null);

  // Responsive radius calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 420) {
        setRadius(220);
      } else if (window.innerWidth < 640) {
        setRadius(260);
      } else if (window.innerWidth < 1024) {
        setRadius(350);
      } else {
        setRadius(460);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Continuous physics lerp loop with direct DOM updates (hardware accelerated)
  useEffect(() => {
    let running = true;

    const updatePhysics = () => {
      if (!running) return;

      const diff = targetRotation.current - currentRotation.current;
      currentRotation.current += diff * 0.12;

      // Apply directly to DOM to bypass React re-rendering overhead
      if (ringRef.current) {
        ringRef.current.style.transform = `rotateX(-4deg) rotateY(${currentRotation.current}deg)`;
      }

      // Compute active front-facing card
      const anglePerCard = 360 / CASE_STUDIES.length;
      const normalizedAngle = ((-currentRotation.current % 360) + 360) % 360;
      const index = Math.round(normalizedAngle / anglePerCard) % CASE_STUDIES.length;
      if (index !== activeCardIndexRef.current) {
        activeCardIndexRef.current = index;
        setActiveCardIndex(index);
      }

      reqId.current = requestAnimationFrame(updatePhysics);
    };

    reqId.current = requestAnimationFrame(updatePhysics);

    return () => {
      running = false;
      if (reqId.current) cancelAnimationFrame(reqId.current);
    };
  }, []);

  // Smart rotateTo: rotates along shortest rotational path without unwinding
  const rotateTo = useCallback((targetIndex: number) => {
    soundFX.playClick();
    const anglePerCard = 360 / CASE_STUDIES.length;
    let diff = targetIndex - activeCardIndexRef.current;
    if (diff > CASE_STUDIES.length / 2) diff -= CASE_STUDIES.length;
    if (diff < -CASE_STUDIES.length / 2) diff += CASE_STUDIES.length;
    targetRotation.current -= diff * anglePerCard;
  }, []);

  // --- Native Non-Passive Event Listeners for Butter-Smooth Touch & Wheel ---
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // Mouse handlers
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      hasDragged.current = false;
      startX.current = e.clientX;
      lastDeltaX.current = 0;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - startX.current;
      if (Math.abs(deltaX) > 4) {
        hasDragged.current = true;
      }
      lastDeltaX.current = deltaX;
      targetRotation.current += deltaX * 0.35;
      startX.current = e.clientX;
    };

    const onMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      const anglePerCard = 360 / CASE_STUDIES.length;
      targetRotation.current += lastDeltaX.current * 0.45;
      const nearest = Math.round(-targetRotation.current / anglePerCard);
      targetRotation.current = -nearest * anglePerCard;
    };

    // Touch handlers with active preventDefault for horizontal swipe
    const onTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      hasDragged.current = false;
      const touch = e.touches[0];
      startX.current = touch.clientX;
      startY.current = touch.clientY;
      lastDeltaX.current = 0;
      touchAxis.current = null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const touch = e.touches[0];
      const dx = touch.clientX - startX.current;
      const dy = touch.clientY - startY.current;

      if (touchAxis.current === null) {
        if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
          if (Math.abs(dy) > Math.abs(dx)) {
            // Vertical scroll: yield immediately to native page scroll
            touchAxis.current = "vertical";
            isDragging.current = false;
            return;
          } else {
            // Horizontal swipe: lock to carousel
            touchAxis.current = "horizontal";
          }
        }
      }

      if (touchAxis.current === "horizontal") {
        // Prevent vertical page jitter while swiping carousel horizontally
        if (e.cancelable) e.preventDefault();
        hasDragged.current = true;
        lastDeltaX.current = dx;
        targetRotation.current += dx * 0.4;
        startX.current = touch.clientX;
        startY.current = touch.clientY;
      }
    };

    const onTouchEnd = () => {
      if (!isDragging.current && touchAxis.current !== "horizontal") return;
      isDragging.current = false;
      const anglePerCard = 360 / CASE_STUDIES.length;
      targetRotation.current += lastDeltaX.current * 0.45;
      const nearest = Math.round(-targetRotation.current / anglePerCard);
      targetRotation.current = -nearest * anglePerCard;
    };

    // Desktop Wheel scroll support with snap
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 5) {
        targetRotation.current -= delta * 0.2;

        if (wheelSnapTimer.current) clearTimeout(wheelSnapTimer.current);
        wheelSnapTimer.current = setTimeout(() => {
          const anglePerCard = 360 / CASE_STUDIES.length;
          const nearest = Math.round(-targetRotation.current / anglePerCard);
          targetRotation.current = -nearest * anglePerCard;
        }, 180);
      }
    };

    // Attach listeners
    stage.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchmove", onTouchMove, { passive: false });
    stage.addEventListener("touchend", onTouchEnd, { passive: true });

    stage.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      stage.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
      stage.removeEventListener("touchend", onTouchEnd);

      stage.removeEventListener("wheel", onWheel);
      if (wheelSnapTimer.current) clearTimeout(wheelSnapTimer.current);
    };
  }, []);

  const anglePerCard = 360 / CASE_STUDIES.length;

  return (
    <div
      data-lenis-prevent
      className="relative w-full max-w-full py-6 sm:py-12 flex flex-col items-center select-none overflow-hidden [contain:paint]"
    >
      {/* Micro-Instructions & Active Counter */}
      <div className="flex items-center justify-between w-full max-w-4xl px-4 sm:px-6 mb-3 sm:mb-6 text-xs font-mono uppercase tracking-[0.14em] text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-[11px] sm:text-xs">
            PROJECT RING // 0{activeCardIndex + 1} OF 0{CASE_STUDIES.length}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-neutral-500">
          <span>[ DRAG OR USE CONTROLS ]</span>
        </div>
      </div>

      {/* 3D Perspective Stage */}
      <div
        ref={stageRef}
        className="relative w-full max-w-full h-[420px] sm:h-[500px] md:h-[550px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden [contain:paint] touch-pan-y"
        style={{
          perspective: "1200px",
          touchAction: "pan-y",
        }}
      >
        {/* The Rotating Cylinder Ring */}
        <div
          ref={ringRef}
          className="relative w-[260px] sm:w-[310px] md:w-[340px] h-[380px] sm:h-[430px] md:h-[460px]"
          style={{
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
            transform: `rotateX(-4deg) rotateY(0deg)`,
            willChange: "transform",
          }}
        >
          {CASE_STUDIES.map((project, i) => {
            const cardAngle = i * anglePerCard;
            return (
              <div
                key={project.slug}
                className="absolute inset-0 rounded-2xl border border-white/10 bg-[#0e0e12] p-4 sm:p-5 flex flex-col justify-between shadow-2xl transition-[border-color,box-shadow] duration-200 hover:border-white/30 group"
                style={{
                  transformStyle: "preserve-3d",
                  WebkitTransformStyle: "preserve-3d",
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  willChange: "transform",
                }}
              >
                {/* Card Header */}
                <div>
                  <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-neutral-400 mb-2 pb-2 border-b border-white/5">
                    <span className="text-white font-bold">(0{i + 1})</span>
                    <span className="uppercase tracking-wider text-[9px] sm:text-[10px] text-neutral-400">
                      {project.category}
                    </span>
                    <span className="text-[9px] sm:text-[10px]">{project.year}</span>
                  </div>

                  <h3 className="font-display text-base sm:text-lg md:text-xl font-bold text-white tracking-tight group-hover:text-neutral-100 transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-1 text-[11px] sm:text-xs text-neutral-400 line-clamp-2 leading-relaxed font-sans">
                    {project.tagline}
                  </p>
                </div>

                {/* Real Project Screenshot */}
                <div className="relative my-2 sm:my-3 h-32 sm:h-38 md:h-44 rounded-xl border border-white/10 overflow-hidden bg-black/90 group-hover:border-white/20 transition-all pointer-events-none">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-all duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/10 pointer-events-none" />

                  {/* Badge */}
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider bg-black/80 border border-white/10 text-neutral-300">
                    {project.liveUrl ? "LIVE SITE" : "TELEMETRY"}
                  </div>

                  {/* Bottom metrics preview */}
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-neutral-300">
                    <span className="truncate text-white/90 font-medium drop-shadow">
                      {project.metrics[0]}
                    </span>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-2.5 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">
                    EXPLORE CASE STUDY
                  </span>
                  <Link
                    href={`/work/${project.slug}`}
                    onClick={(e) => {
                      if (hasDragged.current) {
                        e.preventDefault();
                        return;
                      }
                      soundFX.playClick();
                    }}
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
      <div className="mt-4 sm:mt-6 flex items-center gap-4">
        <button
          onClick={() => {
            const prevIdx = (activeCardIndex - 1 + CASE_STUDIES.length) % CASE_STUDIES.length;
            rotateTo(prevIdx);
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
