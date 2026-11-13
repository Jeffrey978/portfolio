"use client";

import Link from "next/link";
import { soundFX } from "@/components/ui/sound-effects";
import { PROFILE } from "@/lib/projects";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#0a0a0a] py-16 px-4 sm:px-8 text-neutral-400">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          {/* Col 1: Identity & Statement */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <span className="font-display text-lg font-bold text-white tracking-tight">
              {PROFILE.fullName}
            </span>
            <p className="text-xs font-mono text-neutral-400 max-w-sm leading-relaxed">
              {PROFILE.role}. Holding a {PROFILE.degree}, dedicated to protocol security and verified systems.
            </p>
            <div className="mt-2 text-xs font-mono text-neutral-500">
              BASED IN {PROFILE.location} &bull; WORKING GLOBALLY
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 flex flex-col gap-2 text-xs font-mono uppercase tracking-[0.12em]">
            <span className="text-white font-semibold mb-2 text-[11px]">DIRECTORY</span>
            <Link
              href="/work"
              onClick={() => soundFX.playClick()}
              className="hover:text-white transition-colors py-0.5"
            >
              // WORK ARCHIVE
            </Link>
            <Link
              href="/about"
              onClick={() => soundFX.playClick()}
              className="hover:text-white transition-colors py-0.5"
            >
              // ABOUT &amp; BACKGROUND
            </Link>
            <Link
              href="/services"
              onClick={() => soundFX.playClick()}
              className="hover:text-white transition-colors py-0.5"
            >
              // SERVICES &amp; AUDITS
            </Link>
            <Link
              href="/contact"
              onClick={() => soundFX.playClick()}
              className="hover:text-white transition-colors py-0.5"
            >
              // INITIATE CONTACT
            </Link>
          </div>

          {/* Col 3: Direct Inquiries */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="text-white font-semibold text-xs font-mono uppercase tracking-[0.12em]">
              DIRECT DISPATCH
            </span>
            <a
              href={`mailto:${PROFILE.email}`}
              onClick={() => soundFX.playClick()}
              className="text-white hover:text-cyan-300 font-mono text-sm underline underline-offset-4 flex items-center gap-1.5 transition-colors"
            >
              <span>{PROFILE.email}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <p className="text-xs text-neutral-500 font-mono">
              Available for Q2/Q3 2026 smart contract security audits, DeFi protocol research, and full-stack engineering contracts.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
          <div>
            &copy; 2026 {PROFILE.fullName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>DESIGN MOTIF: THEO NOLAN REPLICA</span>
            <span>NEXT.JS 16 &bull; APP ROUTER</span>
            <span>PORT HARCOURT &bull; WAT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
