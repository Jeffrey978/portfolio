"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { soundFX } from "@/components/ui/sound-effects";
import { PROFILE } from "@/lib/data";
import { Terminal, Send, Copy, Check, ArrowUpRight, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("jeffreyatuluku@gmail.com");
    setCopied(true);
    soundFX.playClick(1000);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#00f0ff", "#a855f7", "#ffffff"],
    });

    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playSwitch();

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#00f0ff", "#3b82f6", "#10b981", "#ffffff"],
    });

    setSent(true);
  };

  return (
    <section id="contact" className="py-28 px-4 sm:px-8 relative bg-neutral-950/70 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>// DIRECT CONTACT &amp; INQUIRIES</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Let&apos;s build your next flagship product.
            </h2>

            <p className="text-neutral-400 text-sm leading-relaxed font-sans">
              Available for full-stack system architecture, marketplace escrow development, interactive 3D WebGL experiences, and senior engineering contracts.
            </p>

            {/* Email Pill */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-mono text-neutral-400 uppercase">Direct Email</div>
                <div className="text-sm font-mono text-white font-semibold">jeffreyatuluku@gmail.com</div>
              </div>
              <button
                onClick={handleCopyEmail}
                data-cursor="COPY"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-cyan-500 hover:text-black text-white transition-all flex items-center gap-1.5 text-xs font-mono"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            {/* Social channels */}
            <div className="flex items-center gap-3">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="GITHUB"
                onClick={() => soundFX.playClick()}
                className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono flex items-center justify-center gap-2 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub @jeffrey978</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </a>
            </div>
          </div>

          {/* Right Column: Terminal Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/[0.08] bg-black/80 backdrop-blur-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  <span className="ml-2">terminal@jeffrey:~$ send-message</span>
                </div>
                <span>DIRECT ENCRYPTION</span>
              </div>

              {sent ? (
                <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">Message Transmitted</h3>
                  <p className="text-neutral-400 text-sm max-w-sm font-sans">
                    Thank you, {name || "friend"}! Your message was received. I will reply to {email || "your email"} promptly.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 px-5 py-2 rounded-xl bg-white/10 text-xs font-mono text-white hover:bg-white/20 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                        // YOUR NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Vance"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-white/10 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-cyan-500 transition-colors font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                        // YOUR EMAIL
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-white/10 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-cyan-500 transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                      // PROJECT SCOPE / MESSAGE
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about your product requirements, architectural scope, and desired timeline..."
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-white/10 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-cyan-500 transition-colors font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    data-cursor="TRANSMIT"
                    className="w-full py-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © 2026 {PROFILE.name} • All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>NEXT.JS 16 &bull; APP ROUTER</span>
            <span>THREE.JS &bull; AMBIENT GL</span>
            <span>LENIS &bull; GSAP</span>
          </div>
        </div>
      </div>
    </section>
  );
}
