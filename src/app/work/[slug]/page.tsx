import { notFound } from "next/navigation";
import Link from "next/link";
import { CASE_STUDIES, CaseStudy } from "@/lib/projects";
import { ArrowLeft, ArrowRight, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";

export function generateStaticParams() {
  return CASE_STUDIES.map((p) => ({
    slug: p.slug,
  }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = CASE_STUDIES.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const nextProject = CASE_STUDIES.find((p) => p.slug === project.nextSlug) || CASE_STUDIES[0];

  return (
    <main className="flex-1 w-full max-w-full overflow-x-hidden py-10 sm:py-16 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Back to Work Navigation */}
      <div className="mb-8 sm:mb-12">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.1em] sm:tracking-[0.14em] text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Work Archive</span>
        </Link>
      </div>

      {/* Case Study Header */}
      <div className="pb-8 sm:pb-10 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono text-neutral-400 mb-3 sm:mb-4 flex-wrap">
          <span className="text-white font-bold font-mono">CASE STUDY</span>
          <span>&bull;</span>
          <span className="uppercase text-neutral-300">{project.category}</span>
          <span>&bull;</span>
          <span>{project.year}</span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] break-words">
          {project.title}
        </h1>

        <p className="mt-3 sm:mt-4 text-sm sm:text-lg font-mono text-neutral-300 max-w-3xl leading-relaxed">
          {project.tagline}
        </p>

        {/* Action Link Pills */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 sm:py-2.5 rounded-xl sm:rounded-full bg-white text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
            >
              <span>Launch Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 sm:py-2.5 rounded-xl sm:rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Source Repository</span>
            </a>
          )}
        </div>
      </div>

      {/* Featured Architecture Showcase Image */}
      <div className="my-8 sm:my-10 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#0d0e12] shadow-2xl">
        <img
          src={project.image}
          alt={`${project.title} - Production Architecture Screenshot`}
          className="w-full h-auto max-h-[580px] object-cover object-top"
        />
      </div>

      {/* Project Meta Table (Theo Nolan style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-6 sm:py-8 border-b border-white/[0.08] text-xs font-mono">
        <div>
          <span className="text-neutral-500 uppercase block mb-1">CLIENT / DOMAIN</span>
          <span className="text-white font-semibold">{project.client}</span>
        </div>
        <div>
          <span className="text-neutral-500 uppercase block mb-1">ENGINEERING ROLE</span>
          <span className="text-white font-semibold">{project.role}</span>
        </div>
        <div>
          <span className="text-neutral-500 uppercase block mb-1">YEAR</span>
          <span className="text-white font-semibold">{project.year}</span>
        </div>
        <div>
          <span className="text-neutral-500 uppercase block mb-1">TECH STACK</span>
          <span className="text-white font-semibold truncate block">
            {project.tags.slice(0, 2).join(", ")}
          </span>
        </div>
      </div>

      {/* Case Study Narrative Body */}
      <article className="py-14 space-y-16">
        {/* Section 1: Executive Overview */}
        <section>
          <span className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-400 block mb-3">
            01 // EXECUTIVE SUMMARY
          </span>
          <p className="text-base sm:text-lg text-neutral-300 font-sans leading-relaxed">
            {project.overview}
          </p>
        </section>

        {/* Section 2: The Challenge & Threat Vector */}
        <section className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          <span className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-400 block mb-3">
            02 // THE ARCHITECTURAL CHALLENGE
          </span>
          <h2 className="font-display text-2xl font-bold text-white mb-4">
            Critical Failure Modes &amp; State Risks
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
            {project.challenge}
          </p>
        </section>

        {/* Section 3: Engineering Solution & State Machine */}
        <section>
          <span className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-400 block mb-3">
            03 // TECHNICAL SOLUTION
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6">
            System Implementation &amp; Verification
          </h2>
          <p className="text-base text-neutral-300 font-sans leading-relaxed mb-6">
            {project.solution}
          </p>

          <div className="space-y-3 pt-4">
            {project.architecturePoints.map((pt, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-200 font-sans">{pt}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Verified Outcomes & Metrics */}
        <section className="pt-8 border-t border-white/[0.08]">
          <span className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-400 block mb-3">
            04 // RESULTS &amp; PRODUCTION METRICS
          </span>
          <p className="text-base text-neutral-300 font-sans leading-relaxed mb-8">
            {project.results}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map((m, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                <div className="font-mono text-xl sm:text-2xl font-bold text-white">{m}</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mt-1">
                  VERIFIED OUTCOME
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>

      {/* Next Project Footer Bar */}
      <div className="mt-16 pt-10 border-t border-white/[0.08] flex items-center justify-between">
        <Link
          href="/work"
          className="text-xs font-mono uppercase tracking-[0.12em] text-neutral-400 hover:text-white transition-colors"
        >
          &larr; All Projects
        </Link>

        <Link
          href={`/work/${nextProject.slug}`}
          className="group flex items-center gap-3 text-right"
        >
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.12em] text-neutral-500">
              NEXT CASE STUDY
            </div>
            <div className="font-display text-lg font-bold text-white group-hover:text-neutral-300 transition-colors">
              {nextProject.title} &rarr;
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
