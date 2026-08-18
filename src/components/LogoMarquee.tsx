import TechLogo from "@/components/TechLogo";
import { marqueeTechs, techLogos } from "@/data/portfolio";

/** Bandeau infini de logos, en pause au survol. */
export default function LogoMarquee() {
  const loop = [...marqueeTechs, ...marqueeTechs];

  return (
    <div className="marquee-mask overflow-hidden border-y border-border bg-card/60 py-7">
      <div className="marquee-track flex w-max items-center gap-14 px-7">
        {loop.map((slug, i) => (
          <span
            key={`${slug}-${i}`}
            className="flex shrink-0 items-center gap-3"
            aria-hidden={i >= marqueeTechs.length}
          >
            <TechLogo slug={slug} size={34} />
            <span className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {techLogos[slug].label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
