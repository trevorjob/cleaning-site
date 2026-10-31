import Link from "next/link";
import type { ComponentProps } from "react";

const variants = {
  primary: "bg-ink text-porcelain hover:bg-brass",
  brass: "bg-brass text-ink hover:bg-porcelain",
  outline: "border border-ink text-ink hover:bg-ink hover:text-porcelain",
} as const;

export type ButtonVariant = keyof typeof variants;

export function buttonClasses(variant: ButtonVariant = "primary", className = ""): string {
  return `inline-flex min-h-12 items-center justify-center px-6 py-3 text-small font-medium transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`;
}

type ButtonLinkProps = ComponentProps<typeof Link> & { readonly variant?: ButtonVariant };

export function ButtonLink({ variant = "primary", className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}
