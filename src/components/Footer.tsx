import { identity, socials } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {identity.name} — {identity.title}
        </p>
        <div className="flex gap-6">
          {socials
            .filter((s) => s.url)
            .map((s) => (
              <a
                key={s.label}
                href={s.url}
                target={s.url.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="text-sm text-muted-foreground hover:text-brand transition-colors"
              >
                {s.label}
              </a>
            ))}
        </div>
      </div>
    </footer>
  );
}
