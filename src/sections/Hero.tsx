import { useState } from "react";
import { ArrowRight, Download, Mail, Linkedin, Github, MapPin } from "lucide-react";
import AnimatedName from "@/components/AnimatedName";
import TechLogo from "@/components/TechLogo";
import { identity, orbitTechs, socials, techLogos } from "@/data/portfolio";

const ORBIT_RADIUS = 190; // px

/** Portrait entouré de logos en orbite lente (pause au survol). */
function Portrait() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <div className="orbit-paused relative flex h-[26rem] w-[26rem] items-center justify-center sm:h-[30rem] sm:w-[30rem]">
      {/* Cadres sable */}
      <div className="hero-ring absolute h-[22rem] w-[18rem] rounded-[3rem] border border-brand/25 sm:h-[25rem] sm:w-[20rem]" />
      <div className="absolute h-[22rem] w-[18rem] rounded-[3rem] bg-sand/50 blur-3xl sm:h-[25rem] sm:w-[20rem]" />

      {/* Photo */}
      <div className="relative h-[21rem] w-[17rem] overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-[0_25px_60px_-30px_hsl(28_30%_25%/0.45)] sm:h-[24rem] sm:w-[19rem]">
        {imgOk ? (
          <img
            src={identity.photoPath}
            alt={`Portrait de ${identity.name}`}
            className="h-full w-full scale-105 object-cover object-top transition-transform duration-1000 ease-out hover:scale-100"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-card to-secondary p-6 text-center">
            <span className="font-display text-6xl font-semibold text-brand">OB</span>
          </div>
        )}
        {/* Voile beige en bas de la photo */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/70 to-transparent" />
      </div>

      {/* Orbite des logos */}
      <div className="orbit-track pointer-events-none absolute inset-0" style={{ ["--orbit-duration" as string]: "30s" }}>
        {orbitTechs.map((slug, i) => {
          const angle = (360 / orbitTechs.length) * i;
          return (
            <span
              key={slug}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${angle}deg) translateY(-${ORBIT_RADIUS}px)`,
              }}
            >
              <span
                className="orbit-item pointer-events-auto flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-border bg-card/95 shadow-[0_10px_30px_-14px_hsl(28_30%_25%/0.55)] backdrop-blur"
                style={{ ["--orbit-duration" as string]: "30s" }}
                title={techLogos[slug].label}
              >
                <TechLogo slug={slug} size={26} tinted={false} />
              </span>
            </span>
          );
        })}
      </div>
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
      {/* Voiles beige animés */}
      <div className="aurora pointer-events-none absolute -top-40 right-0 h-[520px] w-[520px] rounded-full bg-sand/60 blur-[130px]" />
      <div
        className="aurora pointer-events-none absolute bottom-0 -left-40 h-[420px] w-[420px] rounded-full bg-brand/10 blur-[110px]"
        style={{ animationDelay: "-8s" }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1fr_auto]">
        <div>
          <p
            className="hero-item flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-brand"
            style={{ animationDelay: "0.1s" }}
          >
            <MapPin size={14} />
            {identity.location}
          </p>

          <h1 className="font-display mt-6 text-6xl font-semibold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
            <AnimatedName text={identity.firstName} className="block text-foreground" delay={200} />
            <AnimatedName text={identity.lastName} className="block text-brand" delay={520} />
          </h1>

          <p
            className="hero-item mt-6 text-xl font-medium text-foreground/90 md:text-2xl"
            style={{ animationDelay: "0.95s" }}
          >
            {identity.title}
          </p>

          <p
            className="hero-item mt-4 max-w-xl text-lg font-light italic text-brand"
            style={{ animationDelay: "1.05s" }}
          >
            « {identity.tagline} »
          </p>

          <p
            className="hero-item mt-4 max-w-xl leading-relaxed text-muted-foreground"
            style={{ animationDelay: "1.15s" }}
          >
            {identity.description}
          </p>

          <div
            className="hero-item mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "1.25s" }}
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-foreground transition-all hover:shadow-[0_14px_30px_-12px] hover:shadow-brand"
            >
              Voir mes projets
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={identity.cvPath}
              download
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-brand/60 hover:text-brand"
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

          <div
            className="hero-item mt-8 flex items-center gap-4"
            style={{ animationDelay: "1.35s" }}
          >
            {linkedin?.url && (
              <a
                href={linkedin.url}
                target="_blank"
                rel="noreferrer"
                aria-label="Profil LinkedIn"
                className="rounded-full border border-border bg-card p-2.5 text-muted-foreground transition-all hover:border-brand/60 hover:text-brand"
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
                className="rounded-full border border-border bg-card p-2.5 text-muted-foreground transition-all hover:border-brand/60 hover:text-brand"
              >
                <Github size={18} />
              </a>
            )}
          </div>
        </div>

        <div className="hero-item hidden justify-center lg:flex" style={{ animationDelay: "0.6s" }}>
          <Portrait />
        </div>
      </div>

      {/* Indicateur scroll */}
      <a
        href="#about"
        aria-label="Défiler vers le bas"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-brand"
      >
        <div className="scroll-indicator mx-auto h-10 w-6 rounded-full border-2 border-current p-1.5">
          <div className="mx-auto h-2 w-1 rounded-full bg-current" />
        </div>
      </a>
    </section>
  );
}
