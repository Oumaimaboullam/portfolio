import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { experiences } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 border-y border-border bg-card/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="Parcours" title="Expérience" />

        <div className="relative space-y-12 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-border md:before:left-1/2">
          {experiences.map((exp, i) => (
            <Reveal key={exp.role} delay={i * 150}>
              <div
                className={`relative grid gap-6 pl-8 md:grid-cols-2 md:gap-16 md:pl-0 ${
                  i % 2 === 1 ? "md:[direction:rtl]" : ""
                }`}
              >
                {/* Point timeline */}
                <span className="absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-brand bg-background md:left-1/2 md:-translate-x-1/2" />

                <div className={i % 2 === 1 ? "md:[direction:ltr] md:text-left" : "md:text-right"}>
                  <p className="text-sm font-medium uppercase tracking-widest text-brand">
                    {exp.period}
                  </p>
                  <h3 className="font-display mt-2 text-2xl font-semibold text-foreground">
                    {exp.role}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{exp.place}</p>
                  {exp.description && (
                    <p className="mt-4 leading-relaxed text-muted-foreground">{exp.description}</p>
                  )}
                </div>

                <ul className={`space-y-2.5 ${i % 2 === 1 ? "md:[direction:ltr]" : ""}`}>
                  {exp.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-muted-foreground">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
