import type { ImageSlotName, TitledText } from "./types";

export const home = {
  meta: {
    title: "Luxury Commercial Clean | Premium cleaning for refined spaces",
    description:
      "Premium cleaning for offices, luxury apartments, holiday lets and Airbnb properties across London, Kent and the South East.",
  },
  hero: {
    lines: ["Luxury", "Commercial", "Clean"] as const,
    intro: "Premium cleaning for offices, luxury apartments, holiday lets and Airbnbs across London, Kent and the South East.",
    film: "Every surface finished by hand.",
  },
  statement: {
    text: "Every client gets a written specification and the same team, every visit. Most of it happens before you arrive.",
    aside:
      "We keep our client list short on purpose, so the people who clean your building know it: the alarm code, the marble in reception, the partner who arrives at seven.",
    facts: [
      "Fully insured",
      "Vetted, trained staff",
      "Out-of-hours cleans",
      "Same-day turnarounds",
    ],
  },
  services: {
    heading: "What we look after",
  },
  kit: {
    heading: "Chosen for the surface, not the job.",
    intro: "Stone, lacquer, brass and glass each need something different. The bottle that does your partitions never touches your marble.",
    items: [
      { slot: "kit-spray", name: "Glass and mirror", text: "pH-neutral, streak-free on partitions and glazing." },
      { slot: "kit-brush", name: "Horsehair brush", text: "Soft enough for grout, joinery and carved detail." },
      { slot: "kit-soap", name: "Stone soap", text: "For marble and limestone. Nothing acidic, ever." },
      { slot: "kit-chamois", name: "Chamois", text: "The last pass on brass, chrome and lacquer." },
      { slot: "kit-cloths", name: "Colour-coded cloths", text: "One colour per area. Kitchens never meet washrooms." },
    ] satisfies readonly { slot: ImageSlotName; name: string; text: string }[],
  },
  overnight: {
    heading: "We work while the building sleeps.",
    // Clock runs from start to end hour across the scroll; captions show at their hour.
    startHour: 18,
    endHour: 31,
    captions: [
      { at: 19.2, time: "19:10", text: "Desks cleared and wiped down" },
      { at: 21.7, time: "21:40", text: "Glass partitions polished" },
      { at: 25.3, time: "01:15", text: "Floors finished, mats cleared" },
      { at: 30.5, time: "06:30", text: "Final walk-round, visit log sent" },
    ],
    closing: "Ready before anyone arrives.",
  },
  compare: {
    heading: "Evening and morning.",
    sliderLabel: "Compare the office in the evening and the next morning",
    labels: ["Evening", "Morning"] as const,
  },
  steps: {
    heading: "How it starts.",
    items: [
      { slot: "step-walkthrough", title: "You tell us about the space.", text: "Use the form, call or message us. What it is, where it is, how often." },
      { slot: "step-spec", title: "We send a written scope and a fixed price.", text: "After a visit or a detailed brief. No call-out fees, no extras." },
      { slot: "step-arrival", title: "Your team arrives, on schedule.", text: "The same people every visit, with a report after each one." },
    ] satisfies readonly (TitledText & { slot: ImageSlotName })[],
  },
  areas: {
    heading: "London, Kent and the South East.",
    note: "Just outside these areas? Ask us anyway.",
  },
} as const;

export const footerCopy = {
  heading: "Tell us about your space.",
  text: "We reply within one working day.",
} as const;

export const servicesPage = {
  meta: {
    title: "Cleaning services",
    description:
      "Commercial office, holiday let, Airbnb and luxury apartment cleaning across London, Kent and the South East.",
  },
  heading: "Four services, one standard.",
  intro:
    "Office floors, holiday lets, short-lets and private homes. Each client gets a written specification, a regular team and a single point of contact.",
  includedLabel: "What's included",
  frequencyLabel: "How often",
  quoteLabel: "Request a quote",
  faqHeading: "Common questions.",
} as const;

export const aboutPage = {
  meta: {
    title: "About us",
    description:
      "Luxury Commercial Clean is a premium cleaning company for offices, residences and short-let properties across London, Kent and the South East.",
  },
  heading: "A cleaning partner for spaces that have to look their best.",
  // PLACEHOLDER: founding story, to be written with the owners
  paragraphs: [
    "We look after offices, residences and short-let properties where the standard is noticed: reception desks that greet clients, apartments that greet guests, homes that should simply feel right when you walk in.",
    "We are a new company and we are keeping it deliberately small. That means a regular team for every client, proper training, and an owner who answers the phone.",
  ],
  polish: {
    caption: "Glass partition, meeting room",
    button: "Polish",
  },
  principles: {
    heading: "What every client gets.",
    items: [
      { title: "The same team", text: "Regular faces who know your space and how you like it kept." },
      { title: "A written specification", text: "Agreed before the first visit, so nothing is left to memory." },
      { title: "Discretion", text: "We work quietly and keep keys and access codes secure." },
      { title: "Straight answers", text: "Fixed prices, prompt replies, honest reports after each visit." },
    ] satisfies readonly TitledText[],
  },
} as const;

export const contactPage = {
  meta: {
    title: "Contact and quotes",
    description:
      "Request a cleaning quote from Luxury Commercial Clean. Serving London, Kent and the South East.",
  },
  heading: "Start with a few details.",
  intro: "Fill in the form and we'll reply within one working day.",
  introDirect: "Fill in the form and we'll reply within one working day, or get in touch directly.",
  picker: {
    legend: "What needs cleaning?",
    options: [
      { value: "commercial-office", label: "Office", slot: "service-offices" },
      { value: "holiday-let", label: "Holiday let", slot: "service-holiday-lets" },
      { value: "airbnb", label: "Airbnb", slot: "service-airbnb" },
      { value: "luxury-apartment", label: "Apartment", slot: "service-apartments" },
    ] satisfies readonly { value: string; label: string; slot: ImageSlotName }[],
  },
  labels: { phone: "Phone", email: "Email", whatsapp: "WhatsApp", whatsappLink: "Message us", hours: "Hours", area: "Area" },
  areaNote: "London, Kent, Surrey, East Sussex and West Sussex.",
} as const;

// PLACEHOLDER: starting draft only. Have it checked before launch.
export const privacyPage = {
  meta: { title: "Privacy notice", description: "How Luxury Commercial Clean uses the details you send us." },
  heading: "Privacy notice",
  sections: [
    {
      heading: "What we collect",
      text: "When you request a quote we collect your name, contact details, postcode and the property details you give us.",
    },
    {
      heading: "How we use it",
      text: "Only to reply to your request, prepare a quote and provide our services. We do not sell or share your details for marketing.",
    },
    {
      heading: "How long we keep it",
      text: "Enquiries that do not lead to work are deleted after 12 months. Client records are kept as long as tax law requires.",
    },
    {
      heading: "Your rights",
      text: "You can ask to see, correct or delete your data by emailing us. You can also complain to the Information Commissioner's Office (ico.org.uk).",
    },
    {
      heading: "Cookies",
      text: "This site does not use analytics or advertising cookies.",
    },
  ],
} as const;

export const notFound = {
  heading: "This page is not here.",
  intro: "It may have moved, or the link may be out of date.",
  link: { label: "Back to the home page", href: "/" },
} as const;
