"use client";

import { useState } from "react";
import { soundFX } from "@/components/ui/sound-effects";
import { Volume2, VolumeX, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { PROFILE } from "@/lib/data";

export function Navbar() {
  const [muted, setMuted] = useState(false);

  const toggleSound = () => {
    const isNowMuted = soundFX.toggleMute();
    setMuted(isNowMuted);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-5 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Monogram / Brand */}
        <a
          href="#"
          data-cursor="HOME"
          onClick={() => soundFX.playClick()}
          className="pointer-events-auto group flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl hover:border-cyan-500/50 transition-all duration-300"
        >
          <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center font-mono font-bold text-xs text-black group-hover:scale-105 transition-transform">
            JA
          </span>
          <span className="text-sm font-semibold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            {PROFILE.name}
          </span>
        </a>

        {/* Floating Nav Pill */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full bg-neutral-900/70 border border-white/10 backdrop-blur-xl text-xs font-mono">
          <a
            href="#work"
            data-cursor="WORK"
            onClick={() => soundFX.playClick()}
            className="px-3 py-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            // 01 WORK
          </a>
          <a
            href="#blender"
            data-cursor="3D"
            onClick={() => soundFX.playClick()}
            className="px-3 py-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            // 02 BLENDER 3D
          </a>
          <a
            href="#architecture"
            data-cursor="SPECS"
            onClick={() => soundFX.playClick()}
            className="px-3 py-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            // 03 ARCHITECTURE
          </a>
          <a
            href="#contact"
            data-cursor="TALK"
            onClick={() => soundFX.playClick()}
            className="px-3 py-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            // 04 CONTACT
          </a>
        </nav>

        {/* Action Controls: Sound & GitHub */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            data-cursor="AUDIO"
            className="p-2.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl text-neutral-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
            title={muted ? "Sound muted" : "Sound active"}
          >
            {muted ? <VolumeX className="w-4 h-4 text-neutral-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* GitHub Profile */}
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="GITHUB"
            onClick={() => soundFX.playClick()}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500 text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
