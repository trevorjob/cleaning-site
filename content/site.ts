export const site = {
  name: "Luxury Commercial Clean",
  legalName: "Luxury Commercial Clean Ltd",
  tagline: "Premium cleaning for refined spaces",
  description:
    "Premium cleaning for offices, luxury apartments, holiday lets and Airbnb properties across London, Kent and the South East.",
  // PLACEHOLDER: confirm the production domain
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.luxurycommercialclean.co.uk",
  serviceAreaLine: "Serving London, Kent & the South East",
} as const;

export const contact = {
  // PLACEHOLDER: phone number
  phoneDisplay: "020 7946 0321",
  // PLACEHOLDER: phone number
  phoneHref: "tel:+442079460321",
  // PLACEHOLDER: email address
  email: "hello@luxurycommercialclean.co.uk",
  // PLACEHOLDER: WhatsApp, same number as the phone
  whatsappHref: "https://wa.me/442079460321",
  // PLACEHOLDER: opening hours
  hours: "Monday to Saturday, 8am to 6pm. Out-of-hours cleans by arrangement.",
} as const;

export const company = {
  registeredIn: "Registered in England & Wales",
  // PLACEHOLDER: Companies House number, legally required on the site for a Ltd
  companyNumber: "00000000",
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const quoteCta = { label: "Request a quote", href: "/contact#quote" } as const;

export const areas = [
  { name: "London", places: "Central London, the City, Canary Wharf and surrounding boroughs" },
  { name: "Kent", places: "Maidstone, Canterbury, Sevenoaks, Tunbridge Wells and the coast" },
  { name: "South East", places: "Surrey, East Sussex and West Sussex" },
] as const;
