import { useState } from "react";
import { ArrowRight, Download, Mail, Linkedin, Github, MapPin } from "lucide-react";
import { identity, heroTechs, socials } from "@/data/portfolio";

/** Portrait : affiche /images/photo.jpg si présente, sinon un placeholder élégant. */
function Portrait() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <div className="relative">
      {/* Anneau décoratif animé */}
      <div className="absolute -inset-4 rounded-[2rem] border border-brand/20 hero-ring" />
      <div className="absolute -inset-4 rounded-[2rem] bg-brand/5 blur-2xl" />

      <div className="relative aspect-[4/5] w-64 sm:w-72 md:w-80 overflow-hidden rounded-[2rem] border border-border bg-card">
        {imgOk ? (
          <img
            src={identity.photoPath}
            alt={`Portrait de ${identity.name}`}
            className="h-full w-full object-cover"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-card to-secondary/40 p-6 text-center">
            <span className="font-display text-6xl font-semibold text-brand">
              OB
            </span>
            <span className="max-w-[180px] border border-dashed border-border rounded-lg px-3 py-2 text-xs text-muted-foreground italic">
              [Votre photo ici — remplacez public/images/photo.jpg]
            </span>
          </div>
        )}
      </div>

      {/* Badges tech flottants */}
      {heroTechs.map((tech, i) => (
        <span
          key={tech}
          className={`hero-badge absolute rounded-full border border-border bg-background/90 px-4 py-2 text-sm font-medium text-foreground shadow-lg backdrop-blur ${
            i === 0
              ? "-left-6 top-8"
              : i === 1
                ? "-right-4 top-1/3"
                : i === 2
                  ? "-left-4 bottom-1/4"
                  : "-right-6 bottom-10"
          }`}
          style={{ animationDelay: `${i * 0.8}s` }}
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  const linkedin = socials.find((s) => s.label === "LinkedIn");
  const github = socials.find((s) => s.label === "GitHub");

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      {/* Halo d'arrière-plan */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-brand/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 -left-40 h-[400px] w-[400px] rounded-full bg-brand/5 blur-[100px]" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="hero-item flex items-center gap-2 text-sm font-medium uppercase tracking-[0.25em] text-brand" style={{ animationDelay: "0.1s" }}>
            <MapPin size={14} />
            {identity.location}
          </p>

          <h1 className="hero-item font-display mt-6 text-6xl sm:text-7xl md:text-8xl font-semibold leading-[0.95] tracking-tight" style={{ animationDelay: "0.2s" }}>
            <span className="block text-foreground">{identity.firstName}</span>
            <span className="block text-gradient">{identity.lastName}</span>
          </h1>

          <p className="hero-item mt-6 text-xl md:text-2xl font-medium text-foreground/90" style={{ animationDelay: "0.35s" }}>
            {identity.title}
          </p>

          <p className="hero-item mt-4 max-w-xl text-lg font-light italic text-brand" style={{ animationDelay: "0.45s" }}>
            « {identity.tagline} »
          </p>

          <p className="hero-item mt-4 max-w-xl leading-relaxed text-muted-foreground" style={{ animationDelay: "0.55s" }}>
            {identity.description}
          </p>

          <div className="hero-item mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.65s" }}>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-foreground transition-all hover:shadow-[0_0_30px_-5px] hover:shadow-brand/50"
            >
              Voir mes projets
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={identity.cvPath}
              download
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-brand/60 hover:text-brand"
            >
              <Download size={16} />
              Télécharger mon CV
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-brand"
            >
              <Mail size={16} />
              Me contacter
            </a>
          </div>

          <div className="hero-item mt-8 flex items-center gap-4" style={{ animationDelay: "0.75s" }}>
            {linkedin?.url && (
              <a
                href={linkedin.url}
                target="_blank"
                rel="noreferrer"
                aria-label="Profil LinkedIn"
                className="rounded-full border border-border p-2.5 text-muted-foreground transition-all hover:border-brand/60 hover:text-brand"
              >
                <Linkedin size={18} />
              </a>
            )}
            {github?.url && (
              <a
                href={github.url}
                target="_blank"
                rel="noreferrer"
                aria-label="Profil GitHub"
                className="rounded-full border border-border p-2.5 text-muted-foreground transition-all hover:border-brand/60 hover:text-brand"
              >
                <Github size={18} />
              </a>
            )}
          </div>
        </div>

        <div className="hero-item hidden justify-center lg:flex" style={{ animationDelay: "0.5s" }}>
          <Portrait />
        </div>
      </div>

      {/* Indicateur scroll */}
      <a
        href="#about"
        aria-label="Défiler vers le bas"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-brand transition-colors"
      >
        <div className="scroll-indicator mx-auto h-10 w-6 rounded-full border-2 border-current p-1.5">
          <div className="mx-auto h-2 w-1 rounded-full bg-current" />
        </div>
      </a>
    </section>
  );
}
