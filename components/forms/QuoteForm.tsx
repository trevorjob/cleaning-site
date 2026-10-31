"use client";

import Link from "next/link";
import { type BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { frequencies, propertyTypes, quoteFormCopy as copy } from "@/content/forms";
import { services } from "@/content/services";
import { quoteSchema, type QuoteInput } from "@/lib/schemas/quote";
import { buttonClasses } from "@/components/ui/Button";
import { describedBy, Field, FieldError, inputClasses } from "./Field";

type Status = "idle" | "success" | "error";

type QuoteFormProps = {
  readonly idPrefix?: string;
  /** Lets a picker outside the form drive the property type, and hear when the select changes. */
  readonly propertyType?: string;
  readonly onPropertyTypeChange?: (value: string) => void;
};

export function QuoteForm({ idPrefix = "quote", propertyType, onPropertyTypeChange }: QuoteFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const successRef = useRef<HTMLParagraphElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    getFieldState,
    control,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<QuoteInput>({ resolver: zodResolver(quoteSchema), shouldFocusError: true });
  const watchedType = useWatch({ control, name: "propertyType" });

  useEffect(() => {
    if (propertyType) setValue("propertyType", propertyType, { shouldValidate: isSubmitted, shouldDirty: true });
  }, [propertyType, setValue, isSubmitted]);

  useEffect(() => {
    if (watchedType) onPropertyTypeChange?.(watchedType);
  }, [watchedType, onPropertyTypeChange]);

  // Read ?service= on the client so pages stay fully static.
  useEffect(() => {
    const serviceId = new URLSearchParams(window.location.search).get("service");
    const match = services.find((s) => s.id === serviceId);
    if (match && !getFieldState("propertyType").isDirty) setValue("propertyType", match.propertyType);
  }, [getFieldState, setValue]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const onSubmit = async (values: QuoteInput, event?: BaseSyntheticEvent) => {
    setStatus("idle");
    const website = new FormData(event?.target as HTMLFormElement).get("website") ?? "";
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website }),
      });
      const result: { ok: boolean; fieldErrors?: Record<string, string[]> } = await response.json();
      if (result.ok) return setStatus("success");
      Object.entries(result.fieldErrors ?? {}).forEach(([name, messages]) =>
        setError(name as keyof QuoteInput, { message: messages[0] }),
      );
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p ref={successRef} tabIndex={-1} role="status" className="serif border-l-2 border-brass py-4 pl-6 text-step">
        {copy.success}
      </p>
    );
  }

  const id = (name: string) => `${idPrefix}-${name}`;
  const a11y = (name: keyof QuoteInput, hint?: string) => ({
    id: id(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": describedBy(id(name), errors[name]?.message, hint),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6 sm:grid-cols-2">
      <Field id={id("fullName")} label="Full name" error={errors.fullName?.message}>
        <input {...register("fullName")} {...a11y("fullName")} autoComplete="name" className={inputClasses} />
      </Field>

      <Field id={id("company")} label="Company" optional error={errors.company?.message}>
        <input {...register("company")} {...a11y("company")} autoComplete="organization" className={inputClasses} />
      </Field>

      <Field id={id("email")} label="Email" error={errors.email?.message}>
        <input {...register("email")} {...a11y("email")} type="email" autoComplete="email" className={inputClasses} />
      </Field>

      <Field id={id("phone")} label="Phone" error={errors.phone?.message}>
        <input {...register("phone")} {...a11y("phone")} type="tel" autoComplete="tel" className={inputClasses} />
      </Field>

      <Field id={id("propertyType")} label="Property type" error={errors.propertyType?.message}>
        <select {...register("propertyType")} {...a11y("propertyType")} defaultValue="" className={inputClasses}>
          <option value="" disabled>
            Choose one
          </option>
          {propertyTypes.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </Field>

      <Field id={id("postcode")} label="Postcode" error={errors.postcode?.message}>
        <input {...register("postcode")} {...a11y("postcode")} autoComplete="postal-code" className={inputClasses} />
      </Field>

      <fieldset
        className="sm:col-span-2"
        aria-describedby={errors.frequency ? `${id("frequency")}-error` : undefined}
      >
        <legend className="mb-2 text-small font-medium">How often</legend>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
          {frequencies.map((f) => (
            <label key={f.value} className="flex min-h-12 items-center gap-3">
              <input {...register("frequency")} type="radio" value={f.value} className="h-5 w-5 accent-ink" />
              {f.label}
            </label>
          ))}
        </div>
        <FieldError id={id("frequency")} error={errors.frequency?.message} />
      </fieldset>

      <Field id={id("startDate")} label="Preferred start date" error={errors.startDate?.message}>
        <input {...register("startDate")} {...a11y("startDate")} type="date" autoComplete="off" className={inputClasses} />
      </Field>

      <Field
        id={id("details")}
        label="Property details"
        hint={copy.detailsHint}
        error={errors.details?.message}
        className="sm:col-span-2"
      >
        <textarea {...register("details")} {...a11y("details", copy.detailsHint)} rows={5} className={inputClasses} />
      </Field>

      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor={id("website")}>Leave this field empty</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        <label className="flex gap-3 text-small">
          <input
            {...register("consent")}
            type="checkbox"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${id("consent")}-error` : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-ink"
          />
          <span>
            {copy.consent}{" "}
            <Link href="/privacy" className="underline">
              {copy.consentLink}
            </Link>
            .
          </span>
        </label>
        <FieldError id={id("consent")} error={errors.consent?.message} />
      </div>

      <div className="sm:col-span-2">
        {status === "error" ? (
          <p role="alert" className="mb-4 text-small text-brass-text">
            {copy.error}
          </p>
        ) : null}
        <button type="submit" disabled={isSubmitting} className={buttonClasses("primary", "w-full sm:w-auto")}>
          {isSubmitting ? copy.sending : copy.submit}
        </button>
      </div>
    </form>
  );
}
