import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ProjectModal from "@/components/ProjectModal";
import { projects, type Project } from "@/data/portfolio";

/** Zone image projet — placeholder clairement identifié en attendant de vraies captures. */
function ProjectVisual({ project, large }: { project: Project; large?: boolean }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-dashed border-border bg-gradient-to-br from-secondary/40 to-card ${
        large ? "aspect-[16/9]" : "aspect-[16/10]"
      }`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <span className="font-display text-5xl font-semibold text-brand/40">
          {project.index}
        </span>
        <span className="text-xs uppercase tracking-widest text-muted-foreground italic">
          [Capture d'écran du projet — à ajouter]
        </span>
      </div>
      {/* Reflet décoratif */}
      <div className="pointer-events-none absolute -top-1/2 -right-1/4 h-full w-1/2 rotate-12 bg-brand/5 blur-2xl" />
    </div>
  );
}

function FeaturedProject({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <Reveal>
      <article className="group grid items-center gap-10 rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:border-brand/40 md:p-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-brand">
            {project.index} — {project.category}
          </p>
          <h3 className="font-display mt-4 text-3xl md:text-4xl font-semibold text-foreground">
            {project.name}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{project.type}</p>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {project.tagline}
          </p>
          <p className="mt-3 leading-relaxed text-muted-foreground">{project.description}</p>

          <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {project.features.slice(0, 6).map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-xs font-medium text-brand"
              >
                {t}
              </span>
            ))}
          </div>

          <button
            onClick={onOpen}
            className="group/btn mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-all hover:shadow-[0_0_25px_-5px] hover:shadow-brand/50"
          >
            Voir l'étude de cas
            <ArrowUpRight size={16} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
        </div>

        <div className="transition-transform duration-500 group-hover:scale-[1.02]">
          <ProjectVisual project={project} large />
        </div>
      </article>
    </Reveal>
  );
}

function ProjectCard({ project, onOpen, delay }: { project: Project; onOpen: () => void; delay: number }) {
  return (
    <Reveal delay={delay}>
      <article className="group flex h-full flex-col rounded-3xl border border-border bg-card p-7 transition-all duration-500 hover:border-brand/40 hover:-translate-y-1.5">
        <div className="transition-transform duration-500 group-hover:scale-[1.02]">
          <ProjectVisual project={project} />
        </div>

        <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-brand">
          {project.index} — {project.category}
        </p>
        <h3 className="font-display mt-3 text-2xl font-semibold text-foreground">
          {project.name}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">{project.type}</p>
        <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">{project.tagline}</p>

        <div className="mt-5 flex flex-wrap gap-2 opacity-70 transition-opacity duration-300 group-hover:opacity-100">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <button
          onClick={onOpen}
          className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-foreground transition-colors hover:text-brand"
        >
          Voir l'étude de cas
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const featured = projects.find((p) => p.featured)!;
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="Projets"
          title="Projets sélectionnés"
          subtitle="Des projets concrets qui illustrent mon approche du développement web et des technologies modernes."
        />

        <FeaturedProject project={featured} onOpen={() => setActive(featured)} />

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {others.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i * 120} onOpen={() => setActive(p)} />
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
