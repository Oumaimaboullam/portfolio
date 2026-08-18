import { useEffect } from "react";
import { X } from "lucide-react";
import type { Project } from "@/data/portfolio";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Étude de cas : ${project.name}`}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm modal-backdrop"
        onClick={onClose}
      />
      <div className="modal-panel relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-border bg-card p-8 md:p-12">
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-5 right-5 rounded-full border border-border p-2 text-muted-foreground hover:text-foreground hover:border-brand/50 transition-all"
        >
          <X size={18} />
        </button>

        <p className="text-sm font-medium uppercase tracking-[0.25em] text-brand">
          {project.index} — {project.category}
        </p>
        <h3 className="font-display mt-3 text-3xl md:text-4xl font-semibold text-foreground">
          {project.name}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{project.type}</p>

        <div className="mt-8 space-y-8">
          {project.caseStudy?.map((block, i) => (
            <div key={i}>
              <h4 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-foreground">
                <span className="text-brand">{String(i + 1).padStart(2, "0")}</span>
                {block.title}
              </h4>
              <p
                className={`mt-3 leading-relaxed ${
                  block.content.startsWith("[")
                    ? "text-muted-foreground/70 italic border border-dashed border-border rounded-lg px-4 py-3 text-sm"
                    : "text-muted-foreground"
                }`}
              >
                {block.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
