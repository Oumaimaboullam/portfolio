interface Props {
  text: string;
  className?: string;
  delay?: number; // ms avant la première lettre
  stagger?: number; // ms entre chaque lettre
}

/** Titre dont les lettres se posent une à une. */
export default function AnimatedName({ text, className = "", delay = 0, stagger = 45 }: Props) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="letter"
          aria-hidden
          style={{ animationDelay: `${delay + i * stagger}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
