"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { soundFX } from "@/components/ui/sound-effects";
import { PROFILE } from "@/lib/projects";
import { Copy, Check, ArrowUpRight, Send, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    soundFX.playClick(900);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#ffffff", "#cccccc", "#888888"],
    });

    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    soundFX.playSwitch();

    try {
      const endpoint =
        process.env.NEXT_PUBLIC_FORM_ENDPOINT ||
        `https://formsubmit.co/ajax/${PROFILE.email}`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          service: projectType || "General Inquiry",
          message,
          _subject: `New Portfolio Inquiry from ${name} [${projectType || "General"}]`,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (!response.ok) {
        throw new Error("Dispatch transmission failed.");
      }

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#ffffff", "#e5482d", "#10b981", "#aaaaaa"],
      });

      setSubmitted(true);
    } catch (err: unknown) {
      console.error(err);
      // Fallback: If external endpoint is unreachable, still inform the user and provide instant direct email option
      setErrorMessage(
        "Network dispatch was interrupted. You can click 'Direct Email' on the left to reach me immediately."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 w-full py-20 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="pb-14 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-neutral-400 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CONTACT &bull; INQUIRIES &bull; AUDIT SCOPING</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-[-0.035em] text-white leading-[1.12]">
          Got a protocol to audit or a flagship application to build? Write to me.
        </h1>

        <p className="mt-4 text-base text-neutral-400 font-sans max-w-xl">
          I read and respond to every message personally within 24 hours.
        </p>
      </div>

      {/* Main 2-Column Content (Theo Nolan Contact Layout) */}
      <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Inquiries, Studio Info & Availability */}
        <div className="md:col-span-5 space-y-10">
          {/* Big Email Card */}
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500 block mb-2">
              DIRECT EMAIL
            </span>
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${PROFILE.email}`}
                onClick={() => soundFX.playClick()}
                className="font-mono text-lg sm:text-xl font-bold text-white hover:text-neutral-300 underline underline-offset-4 transition-colors break-all"
              >
                {PROFILE.email}
              </a>
              <button
                onClick={handleCopyEmail}
                data-cursor="COPY"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors"
                title="Copy Email"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Location & Studio Details */}
          <div className="space-y-4 pt-6 border-t border-white/[0.08] text-xs font-mono">
            <div>
              <span className="text-neutral-500 uppercase block mb-1">LOCATION</span>
              <span className="text-white font-semibold">Port Harcourt, Rivers State, Nigeria</span>
              <span className="text-neutral-400 block mt-0.5">West Africa Time (WAT / UTC+1)</span>
            </div>

            <div>
              <span className="text-neutral-500 uppercase block mb-1">AVAILABILITY</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open for Q2/Q3 2026 Audits &amp; Contracts</span>
              </span>
            </div>

            <div>
              <span className="text-neutral-500 uppercase block mb-1">REPLY TIME</span>
              <span className="text-neutral-300">Within one business day</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-6 border-t border-white/[0.08]">
            <span className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500 block mb-3">
              ELSEWHERE
            </span>
            <div className="flex flex-col gap-2 text-xs font-mono">
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white flex items-center justify-between py-1.5 border-b border-white/5"
              >
                <span>GitHub @Jeffrey978</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
              </a>
              <a
                href={PROFILE.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white flex items-center justify-between py-1.5 border-b border-white/5"
              >
                <span>Twitter / X @jeffrey978</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
              </a>
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white flex items-center justify-between py-1.5 border-b border-white/5"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Editorial Inquiry Form */}
        <div className="md:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl border border-white/[0.08] bg-[#0e0e10]/80 backdrop-blur-xl">
            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">Message Transmitted</h3>
                <p className="text-sm text-neutral-300 font-sans max-w-md leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{name || "friend"}</span>. Your inquiry has been dispatched directly to Atuluku Jeffrey at{" "}
                  <span className="text-white font-mono">{PROFILE.email}</span>. A reply will be sent to{" "}
                  <span className="text-white font-mono">{email}</span> within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setProjectType("");
                    setMessage("");
                    setSubmitted(false);
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-white/10 text-xs font-mono text-white hover:bg-white/20 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    // YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Vance"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-white transition-colors font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    // EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@protocol.xyz"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-white transition-colors font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    // SCOPE / SERVICE NEEDED
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#121214] border border-white/10 text-white text-sm focus:outline-none focus:border-white transition-colors font-sans"
                  >
                    <option value="">Select scope or service...</option>
                    <option value="Smart Contract Security Audit">Smart Contract Security Audit</option>
                    <option value="Web3 & Protocol Research">Web3 &amp; Protocol Research</option>
                    <option value="Full-Stack Web Development">Full-Stack Web Development (Next.js)</option>
                    <option value="General Technical Inquiry">General Technical Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    // MESSAGE / PROTOCOL DETAILS
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your smart contract architecture, repo link, desired timeline, or platform specifications..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-white transition-colors font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-cursor="DISPATCH"
                  className="w-full py-4 rounded-xl bg-white hover:bg-neutral-200 disabled:bg-neutral-600 disabled:cursor-not-allowed text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                >
                  <Send className={`w-3.5 h-3.5 ${isSubmitting ? "animate-pulse" : ""}`} />
                  <span>{isSubmitting ? "Transmitting Dispatch..." : "Transmit Inquiry"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
