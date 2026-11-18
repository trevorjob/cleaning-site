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

type Phone = {
  readonly display: string;
  /** Digits only, with the country code and no leading zero: 442079460321. */
  readonly international: string;
};

type Contact = {
  readonly phone: Phone | null;
  readonly email: string | null;
  readonly hours: string;
};

// The client has no number or address yet. Fill these in and they appear everywhere, WhatsApp included.
export const contact: Contact = {
  phone: null, // e.g. { display: "020 7946 0321", international: "442079460321" }
  email: null, // e.g. "hello@luxurycommercialclean.co.uk"
  hours: "Monday to Saturday, 8am to 6pm. Out-of-hours cleans by arrangement.",
};

export type ContactLink = { readonly kind: "phone" | "email" | "whatsapp"; readonly href: string; readonly text: string };

/** Only the ways to reach us that exist; WhatsApp uses the phone number. */
export const contactLinks: readonly ContactLink[] = [
  ...(contact.phone
    ? [
        { kind: "phone", href: `tel:+${contact.phone.international}`, text: contact.phone.display } as const,
        { kind: "whatsapp", href: `https://wa.me/${contact.phone.international}`, text: "WhatsApp" } as const,
      ]
    : []),
  ...(contact.email ? [{ kind: "email", href: `mailto:${contact.email}`, text: contact.email } as const] : []),
];

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
