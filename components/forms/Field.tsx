import type { ReactNode } from "react";

export const inputClasses =
  "block min-h-12 w-full border border-line bg-white px-4 py-3 text-body text-ink aria-[invalid=true]:border-brass-text";

type FieldProps = {
  readonly id: string;
  readonly label: string;
  readonly error?: string;
  readonly hint?: string;
  readonly optional?: boolean;
  readonly className?: string;
  readonly children: ReactNode;
};

/** Label, hint and error wrapper. Inputs should set aria-describedby={describedBy(id, ...)}. */
export function Field({ id, label, error, hint, optional, className = "", children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-small font-medium">
        {label}
        {optional ? <span className="font-normal text-muted"> (optional)</span> : null}
      </label>
      {hint ? <p id={`${id}-hint`} className="mb-2 text-small text-muted">{hint}</p> : null}
      {children}
      <FieldError id={id} error={error} />
    </div>
  );
}

export function FieldError({ id, error }: { readonly id: string; readonly error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="mt-2 text-small text-brass-text">
      {error}
    </p>
  );
}

export function describedBy(id: string, error?: string, hint?: string): string | undefined {
  const ids = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}
