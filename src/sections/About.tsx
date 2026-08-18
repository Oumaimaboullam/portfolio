import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { about } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="À propos" title="À propos de moi" />

        <div className="grid gap-16 lg:grid-cols-2">
          <div className="space-y-6">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 120}>
                <p className="text-lg leading-relaxed text-muted-foreground first:text-xl first:text-foreground/90">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {about.highlights.map((h, i) => (
              <Reveal key={h.index} delay={i * 100}>
                <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-brand/50 hover:-translate-y-1">
                  <span className="font-display text-3xl font-semibold text-brand/70 transition-colors group-hover:text-brand">
                    {h.index}
                  </span>
                  <p className="mt-4 text-sm font-medium text-foreground">{h.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
