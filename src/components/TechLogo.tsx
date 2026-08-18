import { techLogos, type TechSlug } from "@/data/portfolio";

interface Props {
  slug: TechSlug;
  size?: number;
  className?: string;
  showLabel?: boolean;
  /** Logo désaturé qui reprend ses couleurs au survol. */
  tinted?: boolean;
}

/** Logo officiel d'une technologie (SVG servi depuis /logos). */
export default function TechLogo({
  slug,
  size = 32,
  className = "",
  showLabel = false,
  tinted = true,
}: Props) {
  const tech = techLogos[slug];

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={`/logos/${slug}.svg`}
        alt={tech.label}
        width={size}
        height={size}
        loading="lazy"
        className={tinted ? "logo-tint" : ""}
        style={{ width: size, height: size }}
      />
      {showLabel && (
        <span className="text-sm font-medium text-foreground">{tech.label}</span>
      )}
    </span>
  );
}
