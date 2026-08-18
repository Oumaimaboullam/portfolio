import { Code2, Layers, Plug, BrainCircuit } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { services } from "@/data/portfolio";

const icons = [Code2, Layers, Plug, BrainCircuit];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-y border-border bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="Services"
          title="Ce que je peux réaliser"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={service.title} delay={i * 100}>
                <div className="group h-full rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:border-brand/50 hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-110">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display mt-5 text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
