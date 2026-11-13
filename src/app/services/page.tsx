import Link from "next/link";
import { PROFILE } from "@/lib/projects";
import { ArrowRight, ShieldCheck, Cpu, Code2, CheckCircle2, Clock } from "lucide-react";

export default function ServicesPage() {
  return (
    <main className="flex-1 w-full py-20 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="pb-14 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-neutral-400 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>SCOPE OF SERVICES &bull; AUDITS &bull; ARCHITECTURE</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-[-0.035em] text-white leading-[1.12]">
          Auditing protocols, investigating decentralized systems, and engineering high-assurance web applications.
        </h1>

        <p className="mt-6 text-base text-neutral-400 font-sans max-w-2xl leading-relaxed">
          Engagements are structured for uncompromising quality. Every line of code is reviewed manually, every threat model is tested with adversarial invariants, and web architectures are built to scale.
        </p>
      </div>

      {/* Services List (Theo Nolan style) */}
      <div className="py-16 space-y-20">
        {PROFILE.services.map((svc) => (
          <section
            key={svc.number}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-14 first:pt-0 border-t first:border-t-0 border-white/[0.08]"
          >
            <div className="md:col-span-4 flex items-center md:flex-col md:items-start justify-between">
              <span className="font-mono text-3xl font-extrabold text-white">
                {svc.number}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 mt-2">
                ACTIVE PRACTICE
              </span>
            </div>

            <div className="md:col-span-8 space-y-6">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {svc.title}
              </h2>

              <p className="text-base text-neutral-300 font-sans leading-relaxed">
                {svc.description}
              </p>

              {/* Deliverables Checklist */}
              <div className="pt-4 space-y-3">
                <span className="text-xs font-mono uppercase tracking-[0.12em] text-neutral-400 block mb-2">
                  KEY DELIVERABLES &amp; ARTIFACTS
                </span>
                {svc.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-neutral-200 font-sans">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Engagement Process */}
        <section className="pt-16 border-t border-white/[0.08]">
          <span className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-400 block mb-6">
            // ENGAGEMENT PROCESS &amp; TIMELINE
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-xs font-mono text-neutral-500 block mb-2">STEP 01</span>
              <h3 className="font-display text-base font-bold text-white mb-2">Scoping &amp; Threat Model</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Reviewing architecture diagrams, specification docs, and lines of code to define scope and timeline.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-xs font-mono text-neutral-500 block mb-2">STEP 02</span>
              <h3 className="font-display text-base font-bold text-white mb-2">Manual Audit &amp; Fuzzing</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Line-by-line review, economic vulnerability dissection, and 50k+ run invariant tests in Foundry.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-xs font-mono text-neutral-500 block mb-2">STEP 03</span>
              <h3 className="font-display text-base font-bold text-white mb-2">PoC Findings Report</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Comprehensive classification of findings (Critical, High, Medium, Low) with runnable PoC exploit scripts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-xs font-mono text-neutral-500 block mb-2">STEP 04</span>
              <h3 className="font-display text-base font-bold text-white mb-2">Verification &amp; Re-Audit</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Re-testing patched branches to ensure mitigations introduced zero regression vulnerabilities.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Action Footer */}
      <div className="pt-12 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono text-neutral-400 block">CURRENT AVAILABILITY</span>
          <span className="text-sm font-mono text-emerald-400 font-semibold">
            Open for Q2/Q3 2026 Audits &amp; Engagements
          </span>
        </div>
        <Link
          href="/contact"
          className="px-8 py-3.5 rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors"
        >
          Book An Audit Review &rarr;
        </Link>
      </div>
    </main>
  );
}
