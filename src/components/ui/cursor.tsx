"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on devices with mouse/pointer (not touch)
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    setIsVisible(true);

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.2;

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    const ticker = () => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    };

    gsap.ticker.add(ticker);

    // Watch for elements requesting custom cursor states
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (target) {
        const text = target.getAttribute("data-cursor") || "";
        setCursorText(text);
        setIsHovered(true);
      } else {
        const clickable = (e.target as HTMLElement).closest("a, button, [role='button']");
        if (clickable) {
          setIsHovered(true);
          setCursorText("");
        } else {
          setIsHovered(false);
          setCursorText("");
        }
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      gsap.ticker.remove(ticker);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50 rounded-full flex items-center justify-center transition-[width,height,background-color,border-color] duration-200 ease-out ${
        isHovered
          ? cursorText
            ? "w-20 h-20 bg-cyan-400 text-black border border-white/20 backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.6)]"
            : "w-12 h-12 bg-white/10 border border-cyan-400/80 backdrop-blur-sm"
          : "w-3.5 h-3.5 bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
      }`}
      style={{ willChange: "transform" }}
    >
      {cursorText && (
        <span
          ref={textRef}
          className="text-[11px] font-mono font-bold uppercase tracking-wider text-black select-none"
        >
          {cursorText}
        </span>
      )}
    </div>
  );
}
