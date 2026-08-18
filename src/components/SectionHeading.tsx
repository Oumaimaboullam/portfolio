import Reveal from "./Reveal";

interface Props {
  kicker: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ kicker, title, subtitle }: Props) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-brand mb-4">
        {kicker}
      </p>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
