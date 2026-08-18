import { useEffect, useState } from "react";
import { X, Target, Lightbulb, Layers, CheckCircle2, GraduationCap } from "lucide-react";
import TechLogo from "@/components/TechLogo";
import type { Project } from "@/data/portfolio";

interface Props {
  project: Project | null;
  onClose: () => void;
}

function Block({
  icon,
  title,
  children,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <section>
      <h4 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
        <span style={{ color: accent }}>{icon}</span>
        {title}
      </h4>
      <div className="mt-3 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

export default function ProjectModal({ project, onClose }: Props) {
  const [shot, setShot] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  const accent = `hsl(${project.accent})`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Étude de cas : ${project.name}`}
    >
      <div
        className="modal-backdrop absolute inset-0 bg-background/85 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="modal-panel relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-border bg-card sm:rounded-3xl">
        {/* En-tête avec la capture principale */}
        <div className="relative">
          <img
            src={project.shots[shot].src}
            alt={`${project.name} — ${project.shots[shot].caption}`}
            className="block w-full"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-card to-transparent" />
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="absolute right-5 top-5 rounded-full bg-background/80 p-2 text-foreground backdrop-blur transition-colors hover:text-brand-2"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-7 pb-12 pt-2 md:px-12">
          <p className="text-xs text-muted-foreground">{project.shots[shot].caption}</p>

          {project.shots.length > 1 && (
            <div className="mt-4 flex gap-3">
              {project.shots.map((s, i) => (
                <button
                  key={s.src}
                  onClick={() => setShot(i)}
                  aria-label={`Voir la capture ${i + 1}`}
                  className={`h-16 w-28 overflow-hidden rounded-lg border transition-all ${
                    i === shot ? "opacity-100" : "opacity-50 hover:opacity-80"
                  }`}
                  style={{ borderColor: i === shot ? accent : "hsl(var(--border))" }}
                >
                  <img src={s.src} alt="" className="h-full w-full object-cover object-top" />
                </button>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span
              className="rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.18em]"
              style={{ color: accent, borderColor: `hsl(${project.accent} / 0.4)` }}
            >
              {project.index} — {project.category}
            </span>
            <span className="text-xs text-muted-foreground">
              {project.type} · {project.year} · {project.duration} · {project.role}
            </span>
          </div>

          <h3 className="font-display mt-4 text-3xl font-semibold text-foreground md:text-4xl">
            {project.name}
          </h3>
          <p className="mt-3 text-lg leading-relaxed text-foreground/85">{project.tagline}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="glass rounded-xl px-4 py-3">
                <p className="font-display text-xl font-semibold" style={{ color: accent }}>
                  {m.value}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-9">
            <Block icon={<Target size={16} />} title="Contexte" accent={accent}>
              <p>{project.context}</p>
            </Block>

            <Block icon={<Lightbulb size={16} />} title="Problème" accent={accent}>
              <p>{project.problem}</p>
            </Block>

            <Block icon={<CheckCircle2 size={16} />} title="Solution" accent={accent}>
              <p>{project.solution}</p>
            </Block>

            <Block icon={<Layers size={16} />} title="Architecture" accent={accent}>
              <ol className="space-y-3">
                {project.architecture.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
                      style={{ background: `hsl(${project.accent} / 0.15)`, color: accent }}
                    >
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </Block>

            <Block icon={<CheckCircle2 size={16} />} title="Fonctionnalités" accent={accent}>
              <ul className="grid gap-2 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                    {f}
                  </li>
                ))}
              </ul>
            </Block>

            <Block icon={<GraduationCap size={16} />} title="Ce que j'en retiens" accent={accent}>
              <ul className="space-y-2">
                {project.learnings.map((l) => (
                  <li key={l} className="flex gap-3 text-sm">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                    {l}
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-border pt-8">
            {project.stack.map((slug) => (
              <TechLogo key={slug} slug={slug} size={26} showLabel />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
