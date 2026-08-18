import { useEffect, useState } from "react";
import { navLinks } from "@/data/portfolio";

/** Rail de navigation latéral : suit la section visible pendant le scroll. */
export default function SectionRail() {
  const [active, setActive] = useState(navLinks[0].href);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Navigation rapide"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 xl:flex"
    >
      {navLinks.map((link) => {
        const isActive = active === link.href;
        return (
          <a
            key={link.href}
            href={link.href}
            className="group flex items-center gap-3"
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={`text-[11px] uppercase tracking-[0.18em] transition-all duration-300 ${
                isActive
                  ? "text-brand-2 opacity-100"
                  : "text-muted-foreground opacity-0 group-hover:opacity-100"
              }`}
            >
              {link.label}
            </span>
            <span
              className={`h-px transition-all duration-300 ${
                isActive
                  ? "w-9 bg-brand-2"
                  : "w-4 bg-muted-foreground/50 group-hover:w-7 group-hover:bg-brand"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
