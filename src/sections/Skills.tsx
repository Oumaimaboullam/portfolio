import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Spotlight from "@/components/Spotlight";
import TechLogo from "@/components/TechLogo";
import { skillCategories } from "@/data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-y border-border bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="Compétences"
          title="Technologies & compétences"
          subtitle="Un ensemble d'outils maîtrisés pour concevoir des applications web complètes, du frontend au déploiement."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 80}>
              <Spotlight className="group h-full rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:border-brand/50 hover:-translate-y-1">
                <h3 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-foreground">
                  <span className="h-px w-6 bg-brand" />
                  {cat.name}
                </h3>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {cat.skills.map((skill) =>
                    skill.logo ? (
                      <span
                        key={skill.name}
                        className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground transition-all hover:border-brand/60"
                      >
                        <TechLogo slug={skill.logo} size={18} />
                        {skill.name}
                      </span>
                    ) : (
                      <span
                        key={skill.name}
                        className="rounded-full border border-border px-3.5 py-1.5 text-sm text-muted-foreground transition-all hover:border-brand/60 hover:text-brand"
                      >
                        {skill.name}
                      </span>
                    )
                  )}
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
