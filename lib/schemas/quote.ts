import { z } from "zod";
import { frequencies, propertyTypes } from "@/content/forms";

const UK_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
const UK_PHONE = /^(?:\+44|0)\d{9,10}$/;
const MAX_TEXT = 2000;

const propertyTypeValues = propertyTypes.map((p) => p.value) as [string, ...string[]];
const frequencyValues = frequencies.map((f) => f.value) as [string, ...string[]];

/** Yesterday (UTC), so a UK user just after midnight isn't rejected by a UTC server. */
function earliestStartDate(): string {
  return new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

export const quoteSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  company: z.string().trim().max(120).optional(),
  email: z.string().trim().max(200).pipe(z.email("Enter a valid email address, like name@example.com")),
  phone: z
    .string()
    .trim()
    .refine((v) => UK_PHONE.test(v.replace(/[\s()-]/g, "")), "Enter a valid UK phone number"),
  propertyType: z.enum(propertyTypeValues, { error: "Choose a property type" }),
  postcode: z.string().trim().regex(UK_POSTCODE, "Enter a valid UK postcode, like SW1A 1AA"),
  frequency: z.enum(frequencyValues, { error: "Choose how often you need us" }),
  startDate: z
    .string()
    .pipe(z.iso.date("Choose a preferred start date"))
    .refine((v) => v >= earliestStartDate(), "Choose a date from today onwards"),
  details: z.string().trim().min(10, "Tell us a little about the property").max(MAX_TEXT),
  consent: z.literal(true, { error: "Please confirm you agree before sending" }),
});

export type QuoteInput = z.input<typeof quoteSchema>;
