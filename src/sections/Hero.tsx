import { useEffect, useState } from "react";
import { ArrowRight, Download, Linkedin, Github, MapPin, Sparkles } from "lucide-react";
import AnimatedName from "@/components/AnimatedName";
import TechLogo from "@/components/TechLogo";
import ParticleField from "@/components/ParticleField";
import MagneticButton from "@/components/MagneticButton";
import { identity, orbitTechs, socials, techLogos } from "@/data/portfolio";

const ORBIT_RADIUS = 200;

const TERMINAL_LINES = [
  "const oumaima = {",
  "  role: 'Full Stack Developer',",
  "  stack: ['React', 'Laravel', 'Python'],",
  "  focus: ['API REST', 'Docker', 'IA'],",
  "  status: 'disponible',",
  "};",
];

/** Bloc de code du hero, écrit ligne par ligne au chargement. */
function CodeCard() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= TERMINAL_LINES.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 260);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="glass beam relative overflow-hidden rounded-2xl p-5 font-mono text-[13px] leading-relaxed">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-brand-3/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-2/80" />
        <span className="ml-2 text-[11px] text-muted-foreground">profil.ts</span>
      </div>
      {TERMINAL_LINES.slice(0, visible).map((line, i) => (
        <p key={line} className="text-muted-foreground">
          <span className="mr-4 select-none text-muted-foreground/40">{i + 1}</span>
          <span className={i === 0 || i === TERMINAL_LINES.length - 1 ? "text-brand" : "text-foreground/85"}>
            {line}
          </span>
          {i === visible - 1 && <span className="caret ml-1 text-brand-2">▍</span>}
        </p>
      ))}
    </div>
  );
}

/** Portrait entouré d'un anneau lumineux et de logos en orbite. */
function Portrait() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <div className="orbit-paused relative flex h-[27rem] w-[27rem] items-center justify-center sm:h-[31rem] sm:w-[31rem]">
      {/* Halo */}
      <div className="absolute h-[20rem] w-[20rem] rounded-full bg-brand/25 blur-[90px]" />
      <div className="absolute h-[15rem] w-[15rem] translate-x-16 translate-y-12 rounded-full bg-brand-2/20 blur-[80px]" />

      {/* Anneau conique en rotation */}
      <div
        className="ring-spin absolute h-[23rem] w-[23rem] rounded-full opacity-70 sm:h-[26rem] sm:w-[26rem]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, hsl(var(--brand) / 0.9) 90deg, transparent 180deg, hsl(var(--brand-2) / 0.9) 300deg, transparent 360deg)",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
        }}
        aria-hidden
      />

      {/* Photo */}
      <div className="relative h-[21rem] w-[17rem] overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] sm:h-[24rem] sm:w-[19rem]">
        {imgOk ? (
          <img
            src={identity.photoPath}
            alt={`Portrait de ${identity.name}`}
            className="h-full w-full scale-105 object-cover object-top transition-transform duration-1000 ease-out hover:scale-100"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-card to-secondary">
            <span className="font-display text-6xl font-semibold text-brand">OB</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
      </div>

      {/* Logos en orbite */}
      <div
        className="orbit-track pointer-events-none absolute inset-0"
        style={{ ["--orbit-duration" as string]: "32s" }}
      >
        {orbitTechs.map((slug, i) => {
          const angle = (360 / orbitTechs.length) * i;
          return (
            <span
              key={slug}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `rotate(${angle}deg) translateY(-${ORBIT_RADIUS}px)` }}
            >
              <span
                className="orbit-item glass pointer-events-auto -ml-7 -mt-7 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ ["--orbit-duration" as string]: "32s" }}
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
      className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-28"
    >
      {/* Fond : grille, constellation et halos */}
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <ParticleField />
      <div className="drift pointer-events-none absolute -top-48 left-1/4 h-[520px] w-[520px] rounded-full bg-brand/20 blur-[140px]" />
      <div
        className="drift pointer-events-none absolute -bottom-40 right-10 h-[460px] w-[460px] rounded-full bg-brand-2/15 blur-[130px]"
        style={{ animationDelay: "-9s" }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_auto]">
        <div>
          <div
            className="hero-item glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-muted-foreground"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-2 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-2" />
            </span>
            {identity.availability}
            <span className="text-border">|</span>
            <MapPin size={12} />
            {identity.location}
          </div>

          <h1 className="font-display mt-7 text-[3.4rem] font-bold leading-[0.92] tracking-tight sm:text-7xl md:text-8xl">
            <AnimatedName text={identity.firstName} className="block text-foreground" delay={200} />
            <AnimatedName text={identity.lastName} className="text-aurora block" delay={520} />
          </h1>

          <p
            className="hero-item mt-6 flex items-center gap-2 text-lg font-medium text-foreground/90 md:text-xl"
            style={{ animationDelay: "1s" }}
          >
            <Sparkles size={18} className="text-brand-2" />
            {identity.title}
          </p>

          <p
            className="hero-item mt-4 max-w-xl leading-relaxed text-muted-foreground"
            style={{ animationDelay: "1.1s" }}
          >
            {identity.description}
          </p>

          <div className="hero-item mt-8 max-w-md" style={{ animationDelay: "1.2s" }}>
            <CodeCard />
          </div>

          <div
            className="hero-item mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "1.3s" }}
          >
            <MagneticButton
              href="#projects"
              className="group items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-2 px-7 py-3.5 text-sm font-semibold text-background shadow-[0_18px_45px_-18px_hsl(var(--brand))]"
            >
              Découvrir mes projets
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              href={identity.cvPath}
              download
              className="glass items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-foreground hover:text-brand-2"
            >
              <Download size={16} />
              Mon CV
            </MagneticButton>

            <div className="flex items-center gap-3">
              {linkedin?.url && (
                <a
                  href={linkedin.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Profil LinkedIn"
                  className="glass rounded-full p-3 text-muted-foreground transition-colors hover:text-brand-2"
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
                  className="glass rounded-full p-3 text-muted-foreground transition-colors hover:text-brand-2"
                >
                  <Github size={18} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="hero-item hidden justify-center lg:flex" style={{ animationDelay: "0.6s" }}>
          <Portrait />
        </div>
      </div>

      <a
        href="#about"
        aria-label="Défiler vers le bas"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground transition-colors hover:text-brand-2"
      >
        <div className="scroll-indicator mx-auto h-10 w-6 rounded-full border-2 border-current p-1.5">
          <div className="mx-auto h-2 w-1 rounded-full bg-current" />
        </div>
      </a>
    </section>
  );
}
