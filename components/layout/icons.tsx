type IconProps = { readonly className?: string };

const STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, "aria-hidden": true } as const;

export function HouseIcon({ className = "size-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...STROKE}>
      <path d="M3 10.5 12 3l9 7.5M5.5 8.5V21h13V8.5M10 21v-6h4v6" strokeLinejoin="round" />
    </svg>
  );
}

export function MenuIcon({ className = "size-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...STROKE}>
      <path d="M3 9h18M3 15h18" />
    </svg>
  );
}

export function CloseIcon({ className = "size-7" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...STROKE}>
      <path d="m5 5 14 14M19 5 5 19" />
    </svg>
  );
}
