"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { soundFX } from "@/components/ui/sound-effects";
import { PROFILE } from "@/lib/projects";
import { GithubIcon } from "@/components/ui/icons";
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from "lucide-react";

export function SiteHeader() {
  const pathname = usePathname();
  const [timeStr, setTimeStr] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [muted, setMuted] = useState(false);

  // Live Port Harcourt Time (WAT / UTC+1)
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
      setTimeStr(new Intl.DateTimeFormat("en-GB", options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleSound = () => {
    const nextMuted = soundFX.toggleMute();
    setMuted(nextMuted);
  };

  const navLinks = [
    { name: "WORK", href: "/work" },
    { name: "ABOUT", href: "/about" },
    { name: "SERVICES", href: "/services" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/85 backdrop-blur-md border-b border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-6">
        {/* Left: Name & Role Title */}
        <div className="flex items-center gap-4 min-w-0">
          <Link
            href="/"
            onClick={() => soundFX.playClick()}
            data-cursor="HOME"
            className="flex flex-col group shrink-0"
          >
            <span className="font-display text-sm sm:text-base font-bold text-white tracking-tight group-hover:text-neutral-300 transition-colors">
              {PROFILE.name}
            </span>
            <span className="text-[11px] font-mono text-neutral-400 truncate hidden md:inline">
              Web3 Researcher &amp; Security Auditor
            </span>
          </Link>

          {/* Location & Time Indicator */}
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/10 text-xs font-mono text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{PROFILE.location}</span>
            <span className="text-white/20">&bull;</span>
            <span className="text-neutral-300">{timeStr || "00:00:00"} WAT</span>
          </div>
        </div>

        {/* Center/Right: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono tracking-[0.14em] uppercase">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => soundFX.playClick()}
                data-cursor={link.name}
                className={`transition-colors py-1 relative ${
                  isActive
                    ? "text-white font-bold"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Socials, Sound Toggle & Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Social Micro-Pills */}
          <div className="hidden sm:flex items-center gap-1.5 pr-2 border-r border-white/10 text-[11px] font-mono">
            <a
              href={PROFILE.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="X"
              className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors"
            >
              X
            </a>
            <a
              href={PROFILE.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="GH"
              className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors"
            >
              GH
            </a>
            <a
              href={PROFILE.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="LI"
              className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors"
            >
              LI
            </a>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            data-cursor="AUDIO"
            aria-label={muted ? "Unmute audio" : "Mute audio"}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors"
          >
            {muted ? <VolumeX className="w-4 h-4 text-neutral-500" /> : <Volume2 className="w-4 h-4 text-white" />}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-cursor="MENU"
            aria-label="Toggle Navigation"
            className="md:hidden px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-xs font-mono uppercase tracking-wider text-white border border-white/10 flex items-center gap-1.5"
          >
            {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            <span>{mobileMenuOpen ? "CLOSE" : "MENU"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-2xl px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 pb-4 border-b border-white/5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{PROFILE.location}</span>
            <span>&bull;</span>
            <span className="text-white">{timeStr} WAT</span>
          </div>

          <nav className="flex flex-col gap-4 text-lg font-display font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => {
                  soundFX.playClick();
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between py-2 border-b border-white/5 ${
                  pathname === link.href ? "text-white" : "text-neutral-400"
                }`}
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-500" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 pt-4 text-xs font-mono">
            <a
              href={PROFILE.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 text-center rounded-lg bg-white/5 text-neutral-300"
            >
              Twitter / X
            </a>
            <a
              href={PROFILE.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 text-center rounded-lg bg-white/5 text-neutral-300"
            >
              GitHub
            </a>
            <a
              href={PROFILE.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 text-center rounded-lg bg-white/5 text-neutral-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
