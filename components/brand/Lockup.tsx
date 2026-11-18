import Image from "next/image";
import { site } from "@/content/site";

type LockupProps = {
  /** Which background it sits on: the name is porcelain on ink, ink on porcelain. The marks stay brass. */
  readonly tone: "ink" | "porcelain";
  /** Leave out of the accessibility tree where the page already names the company. */
  readonly decorative?: boolean;
  readonly priority?: boolean;
  readonly className?: string;
};

/** The client's logo: LCC monogram, rule, name and tagline. */
export function Lockup({ tone, decorative = false, priority = false, className = "" }: LockupProps) {
  return (
    <Image
      src={tone === "ink" ? "/brand/lockup-dark.svg" : "/brand/lockup-light.svg"}
      alt={decorative ? "" : `${site.legalName}: ${site.tagline}`}
      width={930}
      height={258}
      priority={priority}
      className={`h-auto ${className}`}
    />
  );
}

/** The monogram and its rule on their own, in brass, for use at large sizes. */
export function Mark({ className = "" }: { readonly className?: string }) {
  return <Image src="/brand/mark.svg" alt="" width={184} height={248} className={className} />;
}

/** The logo at the head of a page, on porcelain, one size everywhere. */
export function PageLockup({ className = "" }: { readonly className?: string }) {
  return <Lockup tone="porcelain" decorative priority className={`w-[clamp(15rem,24vw,24rem)] ${className}`} />;
}
