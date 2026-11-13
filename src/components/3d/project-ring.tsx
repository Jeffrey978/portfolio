"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CASE_STUDIES } from "@/lib/projects";
import { soundFX } from "@/components/ui/sound-effects";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

export function ProjectRing() {
  const router = useRouter();
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const activeCardIndexRef = useRef(0);
  const [radius, setRadius] = useState(380);

  // Physics & Animation state refs (continuous rAF, zero DOM snap bugs)
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const targetOffset = useRef(0);
  const currentOffset = useRef(0);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const lastX = useRef(0);
  const lastMoveTime = useRef(0);
  const velocity = useRef(0);
  const touchDirection = useRef<"horizontal" | "vertical" | null>(null);
  const reqId = useRef<number | null>(null);

  const N = CASE_STUDIES.length;

  // Responsive radius calculation
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 440) {
        setRadius(230);
      } else if (w < 640) {
        setRadius(260);
      } else if (w < 1024) {
        setRadius(320);
      } else {
        setRadius(390);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Continuous physics lerp loop with direct GPU matrix updates
  useEffect(() => {
    let running = true;

    const updatePhysics = () => {
      if (!running) return;

      const diff = targetOffset.current - currentOffset.current;
      currentOffset.current += diff * 0.12;

      // Update active front-facing card index
      const normalizedCurrent = ((Math.round(currentOffset.current) % N) + N) % N;
      if (normalizedCurrent !== activeCardIndexRef.current) {
        activeCardIndexRef.current = normalizedCurrent;
        setActiveCardIndex(normalizedCurrent);
      }

      // Compute exact 3D position & perspective for each card
      for (let i = 0; i < N; i++) {
        const card = cardRefs.current[i];
        if (!card) continue;

        let cardDiff = (i - (currentOffset.current % N) + N) % N;
        if (cardDiff > N / 2) cardDiff -= N;
        if (cardDiff < -N / 2) cardDiff += N;

        const theta = (cardDiff * (360 / N) * Math.PI) / 180;
        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);

        const isVisible = cosTheta > -0.05;
        // Smooth continuous falloff, zero sudden clipping
        const opacity = isVisible ? Math.max(0, Math.pow(Math.max(0, cosTheta), 1.25)) : 0;
        const scale = 1 - (1 - Math.max(0, cosTheta)) * 0.18;
        const x = sinTheta * radius;
        const z = (cosTheta - 1) * radius * 0.75;
        const rotY = -cardDiff * (360 / N) * 0.8;
        const zIndex = Math.round((cosTheta + 1) * 50);

        card.style.transform = `translate3d(calc(-50% + ${x.toFixed(2)}px), -50%, ${z.toFixed(2)}px) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        card.style.opacity = `${opacity.toFixed(3)}`;
        card.style.zIndex = `${zIndex}`;
        card.style.visibility = isVisible ? "visible" : "hidden";
        // Front card is fully clickable; side cards are clickable to rotate into center
        card.style.pointerEvents = isVisible ? "auto" : "none";
      }

      reqId.current = requestAnimationFrame(updatePhysics);
    };

    reqId.current = requestAnimationFrame(updatePhysics);

    return () => {
      running = false;
      if (reqId.current) cancelAnimationFrame(reqId.current);
    };
  }, [radius, N]);

  // Rotate to specific project index via shortest path
  const rotateTo = useCallback(
    (targetIndex: number) => {
      soundFX.playClick();
      const currentInt = Math.round(targetOffset.current);
      const normalizedCurrent = ((currentInt % N) + N) % N;
      let diff = targetIndex - normalizedCurrent;
      if (diff > N / 2) diff -= N;
      if (diff < -N / 2) diff += N;
      targetOffset.current = currentInt + diff;
    },
    [N]
  );

  // Pointer & Touch handlers with seamless native vertical scroll passthrough
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const dragSensitivity = window.innerWidth < 640 ? 240 : 340;

    // Desktop Mouse Drag
    const onMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) return;
      isDragging.current = true;
      hasDragged.current = false;
      startX.current = e.clientX;
      lastX.current = e.clientX;
      lastMoveTime.current = performance.now();
      velocity.current = 0;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastX.current;
      const totalDx = Math.abs(e.clientX - startX.current);
      if (totalDx > 6) {
        hasDragged.current = true;
      }
      const now = performance.now();
      const dt = Math.max(1, now - lastMoveTime.current);
      velocity.current = dx / dt;
      lastMoveTime.current = now;
      lastX.current = e.clientX;

      targetOffset.current -= dx / dragSensitivity;
    };

    const onMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;

      // Add inertia momentum
      let flick = 0;
      if (Math.abs(velocity.current) > 0.4) {
        flick = -Math.sign(velocity.current) * Math.min(1.5, Math.abs(velocity.current) * 0.8);
      }
      targetOffset.current = Math.round(targetOffset.current + flick);

      setTimeout(() => {
        hasDragged.current = false;
      }, 60);
    };

    // Mobile Touch: never locks native vertical page scroll
    const onTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest("a, button")) return;
      const t = e.touches[0];
      isDragging.current = true;
      hasDragged.current = false;
      startX.current = t.clientX;
      startY.current = t.clientY;
      lastX.current = t.clientX;
      lastMoveTime.current = performance.now();
      velocity.current = 0;
      touchDirection.current = null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const t = e.touches[0];
      const dxTotal = t.clientX - startX.current;
      const dyTotal = t.clientY - startY.current;

      // Determine gesture direction on initial movement
      if (!touchDirection.current) {
        if (Math.abs(dyTotal) > 8 && Math.abs(dyTotal) >= Math.abs(dxTotal)) {
          // Vertical movement: release immediately to native page scroll!
          touchDirection.current = "vertical";
          isDragging.current = false;
          return;
        } else if (Math.abs(dxTotal) > 8 && Math.abs(dxTotal) > Math.abs(dyTotal)) {
          touchDirection.current = "horizontal";
        }
      }

      if (touchDirection.current === "horizontal") {
        if (e.cancelable) e.preventDefault();
        hasDragged.current = true;
        const dx = t.clientX - lastX.current;
        const now = performance.now();
        const dt = Math.max(1, now - lastMoveTime.current);
        velocity.current = dx / dt;
        lastMoveTime.current = now;
        lastX.current = t.clientX;

        targetOffset.current -= dx / dragSensitivity;
      }
    };

    const onTouchEnd = () => {
      if (!isDragging.current && touchDirection.current !== "horizontal") return;
      isDragging.current = false;

      let flick = 0;
      if (Math.abs(velocity.current) > 0.35) {
        flick = -Math.sign(velocity.current) * Math.min(1.5, Math.abs(velocity.current) * 0.8);
      }
      targetOffset.current = Math.round(targetOffset.current + flick);

      setTimeout(() => {
        hasDragged.current = false;
        touchDirection.current = null;
      }, 60);
    };

    // Trackpad horizontal swipe
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 12) {
        targetOffset.current += (e.deltaX > 0 ? 1 : -1) * 0.12;
      }
    };

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
    };
  }, []);

  return (
    <div className="relative w-full max-w-full py-2 sm:py-4 flex flex-col items-center select-none overflow-hidden">
      {/* Micro-Instructions & Active Counter */}
      <div className="flex items-center justify-between w-full max-w-4xl px-4 sm:px-6 mb-1.5 sm:mb-3 text-xs font-mono uppercase tracking-[0.14em] text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-[11px] sm:text-xs">
            PROJECT RING // 0{activeCardIndex + 1} OF 0{N}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-neutral-500">
          <span>[ DRAG OR USE CONTROLS ]</span>
        </div>
      </div>

      {/* 3D Perspective Stage */}
      <div
        ref={stageRef}
        className="relative w-full max-w-full h-[380px] sm:h-[420px] md:h-[450px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible touch-pan-y"
        style={{
          perspective: "1100px",
          touchAction: "pan-y",
        }}
      >
        {CASE_STUDIES.map((project, i) => {
          let initDiff = i;
          if (initDiff > N / 2) initDiff -= N;
          const initTheta = (initDiff * (360 / N) * Math.PI) / 180;
          const initCos = Math.cos(initTheta);
          const initSin = Math.sin(initTheta);
          const initVisible = initCos > -0.05;
          const initOpacity = initVisible ? Math.max(0, Math.pow(Math.max(0, initCos), 1.25)) : 0;
          const initScale = 1 - (1 - Math.max(0, initCos)) * 0.18;
          const initX = initSin * 300;
          const initZ = (initCos - 1) * 300 * 0.75;
          const initRotY = -initDiff * (360 / N) * 0.8;
          const initZIndex = Math.round((initCos + 1) * 50);

          return (
            <div
              key={project.slug}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onClick={() => {
                if (hasDragged.current) return;
                const currentInt = Math.round(targetOffset.current);
                const normalizedCurrent = ((currentInt % N) + N) % N;
                if (normalizedCurrent === i) {
                  soundFX.playClick();
                  router.push(`/work/${project.slug}`);
                } else {
                  rotateTo(i);
                }
              }}
              className="absolute top-1/2 left-1/2 w-[260px] sm:w-[300px] md:w-[330px] h-[350px] sm:h-[390px] md:h-[420px] rounded-2xl border border-white/10 bg-[#0e0e12] p-4 sm:p-5 flex flex-col justify-between shadow-2xl transition-[border-color,box-shadow] duration-200 hover:border-white/30 cursor-pointer group"
              style={{
                transform: `translate3d(calc(-50% + ${initX.toFixed(2)}px), -50%, ${initZ.toFixed(2)}px) rotateY(${initRotY.toFixed(2)}deg) scale(${initScale.toFixed(3)})`,
                opacity: initOpacity.toFixed(3),
                zIndex: initZIndex,
                visibility: initVisible ? "visible" : "hidden",
                pointerEvents: i === 0 ? "auto" : "none",
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
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
              <div className="relative my-2 h-26 sm:h-32 md:h-36 rounded-xl border border-white/10 overflow-hidden bg-black/90 group-hover:border-white/20 transition-all pointer-events-none">
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
              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
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

      {/* Navigation Controls & Dot Strip */}
      <div className="mt-2 sm:mt-4 flex items-center gap-4 z-20">
        <button
          onClick={() => {
            const prevIdx = (activeCardIndex - 1 + N) % N;
            rotateTo(prevIdx);
          }}
          data-cursor="PREV"
          aria-label="Previous Project"
          className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-colors"
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
            const nextIdx = (activeCardIndex + 1) % N;
            rotateTo(nextIdx);
          }}
          data-cursor="NEXT"
          aria-label="Next Project"
          className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
