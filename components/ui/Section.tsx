import type { ReactNode } from "react";

type SectionProps = {
  readonly children: ReactNode;
  readonly id?: string;
  readonly labelledBy?: string;
  readonly label?: string;
  /** Lays children on the 12-column page grid. */
  readonly grid?: boolean;
  readonly className?: string;
};

/** A page section with the standard gap above it and the page gutters. */
export function Section({ children, id, labelledBy, label, grid = false, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={`pt-section ${grid ? "page-grid" : "px-gutter"} ${className}`}
    >
      {children}
    </section>
  );
}

type HeadingProps = {
  readonly id: string;
  readonly children: ReactNode;
  readonly as?: "h1" | "h2";
  readonly className?: string;
};

/** Serif section heading. */
export function Heading({ id, children, as: Tag = "h2", className = "" }: HeadingProps) {
  return (
    <Tag id={id} className={`serif reveal text-head ${className}`}>
      {children}
    </Tag>
  );
}
