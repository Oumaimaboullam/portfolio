import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Linkedin, Send, Check } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { identity } from "@/data/portfolio";

export default function Contact() {
  const [sent, setSent] = useState(false);

  // Formulaire côté client : ouvre le client mail avec le message pré-rempli.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const subject = data.get("subject");
    const message = data.get("message");
    const body = encodeURIComponent(
      `Nom : ${name}\nEmail : ${email}\n\n${message}`
    );
    window.location.href = `mailto:${identity.email}?subject=${encodeURIComponent(
      String(subject)
    )}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-brand/60 focus:ring-2 focus:ring-brand/20";

  return (
    <section id="contact" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="Contact"
          title="Vous avez un projet ou une opportunité ?"
          subtitle="Construisons quelque chose d'utile ensemble."
        />

        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          {/* Coordonnées */}
          <Reveal>
            <div className="space-y-5">
              {[
                { icon: MapPin, label: "Localisation", value: identity.location, href: undefined },
                { icon: Phone, label: "Téléphone", value: identity.phone, href: `tel:${identity.phone.replace(/\s/g, "")}` },
                { icon: Mail, label: "Email", value: identity.email, href: `mailto:${identity.email}` },
                { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/oumaima-boullam", href: "https://linkedin.com/in/oumaima-boullam" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="group flex items-center gap-5 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-brand/50"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <item.icon size={19} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="font-medium text-foreground transition-colors hover:text-brand"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium text-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Formulaire */}
          <Reveal delay={150}>
            <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formulaire de contact">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                    Nom
                  </label>
                  <input id="name" name="name" required placeholder="Votre nom" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input id="email" name="email" type="email" required placeholder="votre@email.com" className={inputClass} />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground">
                  Sujet
                </label>
                <input id="subject" name="subject" required placeholder="Sujet de votre message" className={inputClass} />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea id="message" name="message" required rows={5} placeholder="Votre message…" className={`${inputClass} resize-none`} />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-brand-foreground transition-all hover:shadow-[0_0_30px_-5px] hover:shadow-brand/50"
              >
                {sent ? (
                  <>
                    <Check size={16} />
                    Message préparé !
                  </>
                ) : (
                  <>
                    <Send size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    Envoyer le message
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
