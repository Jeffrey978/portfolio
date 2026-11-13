"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { soundFX } from "@/components/ui/sound-effects";
import { usePathname } from "next/navigation";
import { X, Hand, ChevronUp, Bot, Sparkles } from "lucide-react";

// Dynamically import Canvas with SSR disabled for Next.js App Router
const MascotCanvas = dynamic(() => import("./mascot-canvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border border-white/10 border-t-emerald-400 animate-spin" />
    </div>
  ),
});

const MASCOT_PROMPTS = [
  "Hello! Atuluku Jeffrey's systems archive is live & ready.",
  "Check out PulseSwitch for inter-bank telemetry & reconciliation.",
  "ServHive connects verified trades with escrow in Port Harcourt.",
  "Protocol audits, formal verification & high-assurance web builds.",
  "Direct inquiries dispatch to jeffreyatuluku@gmail.com.",
];

export interface TechMascotProps {
  modelUrl?: string;
}

export function TechMascot({ modelUrl }: TechMascotProps) {
  const pathname = usePathname();
  const [gesture, setGesture] = useState<"idle" | "wave" | "nod">("idle");
  const [promptIndex, setPromptIndex] = useState(0);
  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [isMobileMinimized, setIsMobileMinimized] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const bubbleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Client mounting
  useEffect(() => {
    setIsMounted(true);

    // Initial greeting wave after 800ms
    const waveTimer = setTimeout(() => {
      setGesture("wave");
      setBubbleOpen(true);
      soundFX.playClick();
    }, 800);

    // Auto close bubble after 7 seconds
    bubbleTimerRef.current = setTimeout(() => {
      setBubbleOpen(false);
    }, 8500);

    return () => {
      clearTimeout(waveTimer);
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    };
  }, []);

  // Nod reaction when navigating pages or scrolling to projects
  useEffect(() => {
    if (!isMounted) return;
    setGesture("nod");
  }, [pathname, isMounted]);

  // Observer for scrolling into sections to trigger nod reaction
  useEffect(() => {
    const handleScrollReaction = () => {
      const scrollY = window.scrollY;
      if (scrollY > 300 && scrollY < 400 && gesture === "idle") {
        setGesture("nod");
      }
    };

    window.addEventListener("scroll", handleScrollReaction, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollReaction);
  }, [gesture]);

  // Handle click on robot
  const handleRobotClick = useCallback(() => {
    soundFX.playClick();
    setGesture("wave");
    setPromptIndex((prev) => (prev + 1) % MASCOT_PROMPTS.length);
    setBubbleOpen(true);

    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = setTimeout(() => {
      setBubbleOpen(false);
    }, 7000);
  }, []);

  const triggerWave = () => {
    soundFX.playClick();
    setGesture("wave");
  };

  const triggerNod = () => {
    soundFX.playClick();
    setGesture("nod");
  };

  if (!isMounted) return null;

  return (
    <>
      {/* 1. Mobile Minimized Floating Pill (< 640px) */}
      <div className="sm:hidden fixed bottom-4 right-4 z-40">
        {isMobileMinimized ? (
          <button
            onClick={() => {
              soundFX.playClick();
              setIsMobileMinimized(false);
              setBubbleOpen(true);
              setGesture("wave");
            }}
            data-cursor="MASCOT"
            aria-label="Open 3D Tech Mascot"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121214]/90 backdrop-blur-md border border-white/15 text-white shadow-xl hover:border-emerald-500/50 transition-all active:scale-95 text-xs font-mono"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <Bot className="w-3.5 h-3.5 text-neutral-300" />
            <span className="uppercase tracking-wider text-[10px]">MASCOT</span>
          </button>
        ) : (
          <div className="relative flex flex-col items-end">
            {/* Mobile Mascot Drawer Card */}
            <div className="w-[280px] rounded-2xl bg-[#0e0e12]/95 backdrop-blur-2xl border border-white/15 p-4 shadow-2xl flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white font-bold text-[11px]">TECH MASCOT // v2.6</span>
                </div>
                <button
                  onClick={() => setIsMobileMinimized(true)}
                  className="p-1 rounded-md bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 3D Stage on Mobile */}
              <div className="w-full h-40 relative rounded-xl overflow-hidden bg-black/40 border border-white/5">
                <MascotCanvas
                  gesture={gesture}
                  onGestureComplete={() => setGesture("idle")}
                  onMascotClick={handleRobotClick}
                  modelUrl={modelUrl}
                />
              </div>

              {/* Prompt Text */}
              <p className="text-xs font-mono text-neutral-300 leading-relaxed">
                {MASCOT_PROMPTS[promptIndex]}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <button
                  onClick={triggerWave}
                  className="flex-1 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-1 transition-colors"
                >
                  <Hand className="w-3 h-3" />
                  <span>WAVE</span>
                </button>
                <button
                  onClick={triggerNod}
                  className="flex-1 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>NOD</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Desktop Floating 3D Mascot Stage (sm: and up) */}
      <div className="hidden sm:flex fixed bottom-5 right-5 z-40 flex-col items-end pointer-events-none select-none">
        {/* Interactive Speech / Status Bubble */}
        {bubbleOpen && (
          <div className="pointer-events-auto mb-2 w-72 p-3.5 rounded-2xl bg-[#0c0c0e]/95 backdrop-blur-xl border border-white/15 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
            {/* Header bar */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] font-mono uppercase tracking-wider text-neutral-400">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-semibold">TECH COMPANION</span>
              </div>
              <button
                onClick={() => setBubbleOpen(false)}
                className="hover:text-white p-0.5"
                aria-label="Close message"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Dynamic message */}
            <p className="text-xs font-mono text-neutral-300 leading-relaxed mb-3">
              {MASCOT_PROMPTS[promptIndex]}
            </p>

            {/* Micro action bar */}
            <div className="flex items-center justify-between text-[10px] font-mono border-t border-white/5 pt-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={triggerWave}
                  className="px-2 py-1 rounded-md bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors flex items-center gap-1"
                >
                  <Hand className="w-2.5 h-2.5" />
                  <span>Wave</span>
                </button>
                <button
                  onClick={triggerNod}
                  className="px-2 py-1 rounded-md bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Nod</span>
                </button>
              </div>

              <span className="text-[9px] text-neutral-500">[CLICK BOT TO CYCLE]</span>
            </div>
          </div>
        )}

        {/* 3D Canvas Box (hitbox only on the 3D element) */}
        <div className="relative w-44 h-52 pointer-events-none group">
          {/* Subtle glow underneath */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-emerald-500/10 blur-xl rounded-full pointer-events-none" />

          {/* Interactive R3F Canvas */}
          <div className="w-full h-full pointer-events-auto">
            <MascotCanvas
              gesture={gesture}
              onGestureComplete={() => setGesture("idle")}
              onMascotClick={handleRobotClick}
              modelUrl={modelUrl}
            />
          </div>

          {/* Discreet speech bubble toggle trigger when bubble is closed */}
          {!bubbleOpen && (
            <button
              onClick={() => {
                soundFX.playClick();
                setBubbleOpen(true);
              }}
              data-cursor="CHAT"
              aria-label="Open mascot message"
              className="pointer-events-auto absolute -top-1 right-2 p-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-neutral-400 hover:text-white hover:border-emerald-400/50 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
            >
              <ChevronUp className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
