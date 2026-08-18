import { useState } from "react";
import { ArrowUpRight, Calendar, Clock, User } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import TechLogo from "@/components/TechLogo";
import ProjectModal from "@/components/ProjectModal";
import { projects, type Project } from "@/data/portfolio";

function Shot({ project }: { project: Project }) {
  return (
    <TiltCard className="rounded-2xl">
      <div
        className="relative overflow-hidden rounded-2xl border border-border bg-card"
        style={{ boxShadow: `0 40px 90px -50px hsl(${project.accent} / 0.9)` }}
      >
        <img
          src={project.shots[0].src}
          alt={`Capture de ${project.name} — ${project.shots[0].caption}`}
          loading="lazy"
          className="block w-full"
        />
        {project.shots.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-full bg-background/80 px-3 py-1 text-[11px] text-muted-foreground backdrop-blur">
            {project.shots.length} captures
          </span>
        )}
      </div>
    </TiltCard>
  );
}

function Meta({ project }: { project: Project }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <Calendar size={13} />
        {project.year}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock size={13} />
        {project.duration}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <User size={13} />
        {project.role}
      </span>
    </div>
  );
}

function ProjectRow({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const reversed = index % 2 === 1;
  const accent = `hsl(${project.accent})`;

  return (
    <Reveal>
      <article
        className="group relative grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16"
        style={{ ["--accent" as string]: accent }}
      >
        <div
          className="pointer-events-none absolute -z-10 h-72 w-72 rounded-full blur-[130px] opacity-40 transition-opacity duration-700 group-hover:opacity-70"
          style={{
            background: accent,
            [reversed ? "right" : "left"]: "-4rem",
            top: "2rem",
          }}
          aria-hidden
        />

        <div className={reversed ? "lg:order-2" : ""}>
          <Shot project={project} />
        </div>

        <div className={reversed ? "lg:order-1" : ""}>
          <div className="flex items-center gap-4">
            <span
              className="font-display text-5xl font-bold opacity-30"
              style={{ color: accent }}
            >
              {project.index}
            </span>
            <span
              className="rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.18em]"
              style={{ color: accent, borderColor: `hsl(${project.accent} / 0.35)` }}
            >
              {project.category}
            </span>
          </div>

          <h3 className="font-display mt-5 text-3xl font-semibold text-foreground md:text-4xl">
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{project.type}</p>
          <p className="mt-5 text-lg leading-relaxed text-foreground/85">{project.tagline}</p>

          <Meta project={project} />

          <div className="mt-7 grid grid-cols-3 gap-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="glass rounded-xl px-4 py-3">
                <p className="font-display text-xl font-semibold" style={{ color: accent }}>
                  {m.value}
                </p>
                <p className="mt-1 text-[11px] leading-tight text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.stack.map((slug) => (
              <TechLogo key={slug} slug={slug} size={24} />
            ))}
            <span className="text-xs text-muted-foreground">
              {project.technologies.join(" · ")}
            </span>
          </div>

          <button
            onClick={onOpen}
            className="group/btn mt-8 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors"
            style={{ borderColor: `hsl(${project.accent} / 0.4)` }}
          >
            Voir l'étude de cas
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              style={{ color: accent }}
            />
          </button>
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="Projets"
          title="Ce que j'ai construit"
          subtitle="Quatre projets, quatre problèmes concrets : le contexte, les choix techniques et le résultat, captures à l'appui."
        />

        <div className="divide-y divide-border">
          {projects.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} onOpen={() => setActive(p)} />
          ))}
        </div>
      </div>

      <ProjectModal key={active?.id ?? "none"} project={active} onClose={() => setActive(null)} />
    </section>
  );
}
