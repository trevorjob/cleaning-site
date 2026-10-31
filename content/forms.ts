export const propertyTypes = [
  { value: "commercial-office", label: "Commercial office" },
  { value: "holiday-let", label: "Holiday let apartment" },
  { value: "airbnb", label: "Airbnb" },
  { value: "luxury-apartment", label: "Luxury apartment" },
  { value: "other", label: "Something else" },
] as const;

export const frequencies = [
  { value: "regular", label: "Regular contract" },
  { value: "after-booking", label: "After each booking" },
  { value: "one-off", label: "One-off deep clean" },
] as const;

export const quoteFormCopy = {
  submit: "Request a quote",
  sending: "Sending",
  success: "Thanks. We'll be in touch within one working day.",
  error: "Something went wrong. Please try again, or call or email us.",
  consent: "I agree to being contacted about this request, as set out in the",
  consentLink: "privacy notice",
  detailsHint: "Size, number of rooms or floors, access, anything we should know.",
  optional: "Optional",
} as const;
