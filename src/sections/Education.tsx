import { GraduationCap, Globe, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { education, languages, qualities } from "@/data/portfolio";

export default function Education() {
  return (
    <section id="education" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="Formation" title="Formation & langues" />

        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">
          {/* Timeline formation */}
          <div className="space-y-8">
            {education.map((edu, i) => (
              <Reveal key={edu.period} delay={i * 120}>
                <div className="group flex gap-6 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-brand/50">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-medium tracking-widest text-brand">{edu.period}</p>
                    <h3 className="font-display mt-1.5 text-xl font-semibold text-foreground">
                      {edu.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{edu.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="space-y-10">
            {/* Langues */}
            <Reveal delay={200}>
              <div className="rounded-2xl border border-border bg-card p-7">
                <h3 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-foreground">
                  <Globe size={16} className="text-brand" />
                  Langues
                </h3>
                <ul className="mt-5 space-y-4">
                  {languages.map((lang) => (
                    <li key={lang.name} className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{lang.name}</span>
                      <span className="rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-xs font-medium text-brand">
                        {lang.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Qualités */}
            <Reveal delay={300}>
              <div className="rounded-2xl border border-border bg-card p-7">
                <h3 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-foreground">
                  <Sparkles size={16} className="text-brand" />
                  Ce que j'apporte
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {qualities.map((q) => (
                    <span
                      key={q}
                      className="rounded-full border border-border px-3.5 py-1.5 text-sm text-muted-foreground transition-all hover:border-brand/60 hover:text-brand cursor-default"
                    >
                      {q}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
