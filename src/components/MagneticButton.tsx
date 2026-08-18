import { useRef, type MouseEvent, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  href: string;
  className?: string;
  download?: boolean;
  strength?: number;
}

/** Lien magnétique : il se déplace légèrement vers le curseur. */
export default function MagneticButton({
  children,
  href,
  className = "",
  download = false,
  strength = 0.35,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      download={download || undefined}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`inline-flex transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </a>
  );
}
