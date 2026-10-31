import type { ImageSlotName } from "./types";

export type Service = {
  /** Anchor id on /services, and the ?service= value that preselects the quote form. */
  readonly id: string;
  readonly title: string;
  /** One or two words, set huge in the home page list. */
  readonly shortTitle: string;
  readonly tagline: string;
  readonly summary: string;
  readonly intro: string;
  readonly image: ImageSlotName;
  /** The cleaning in progress in this kind of space, shown in the home page list. */
  readonly actionImage: ImageSlotName;
  readonly included: readonly string[];
  readonly frequency: string;
  readonly propertyType: string;
};

export const services: readonly Service[] = [
  {
    id: "commercial-offices",
    title: "Commercial offices",
    shortTitle: "Offices",
    tagline: "Daily and out of hours",
    summary: "Daily and out-of-hours cleaning for offices, receptions and shared floors.",
    intro:
      "We clean early in the morning or after close, so the first person through the door sees the space at its best. One team, one written specification.",
    image: "service-offices",
    actionImage: "action-offices",
    included: [
      "Desks, meeting rooms and touchpoints wiped and sanitised",
      "Receptions presented to a front-of-house standard",
      "Kitchens, tea points and washrooms cleaned and restocked",
      "Floors mopped and vacuumed, glass partitions polished",
      "Bins emptied and recycling separated",
    ],
    frequency: "Daily, several times a week, or periodic deep cleans.",
    propertyType: "commercial-office",
  },
  {
    id: "holiday-lets",
    title: "Holiday lets",
    shortTitle: "Holiday lets",
    tagline: "Changeovers and linen",
    summary: "Changeover cleans, linen and presentation between every stay.",
    intro:
      "Changeovers timed to your booking calendar. Beds made, bathrooms reset, supplies checked and anything out of place reported back to you.",
    image: "service-holiday-lets",
    actionImage: "action-holiday-lets",
    included: [
      "Full clean of kitchen, bathrooms and living areas",
      "Beds made with fresh linen, towels set out",
      "Consumables and welcome items restocked",
      "Damage or missing items photographed and reported",
    ],
    frequency: "After each stay, mid-stay refreshes, or seasonal deep cleans.",
    propertyType: "holiday-let",
  },
  {
    id: "airbnb",
    title: "Airbnb",
    shortTitle: "Airbnb",
    tagline: "Same-day turnarounds",
    summary: "Fast, reliable turnarounds that protect your reviews.",
    intro:
      "Cleanliness is the score guests notice first. We turn your listing around between check-out and check-in, and send photos when it is done.",
    image: "service-airbnb",
    actionImage: "action-airbnb",
    included: [
      "Every room cleaned to a written checklist",
      "Beds made to a hotel standard",
      "Towels, toiletries and kitchen basics restocked",
      "Photo report after every turnaround",
    ],
    frequency: "After each booking, including same-day turnarounds.",
    propertyType: "airbnb",
  },
  {
    id: "luxury-apartments",
    title: "Luxury apartments",
    shortTitle: "Apartments",
    tagline: "Discreet, regular care",
    summary: "Discreet, regular cleaning for high-end homes.",
    intro:
      "A small, vetted team that knows your home and its finishes. Marble, natural stone, lacquer and brass cleaned the way they should be.",
    image: "service-apartments",
    actionImage: "action-apartments",
    included: [
      "Every room cleaned to an agreed specification",
      "Stone and specialist surfaces cleaned with suitable products",
      "Kitchens and bathrooms cleaned and polished",
      "Beds changed and linen refreshed on request",
    ],
    frequency: "Weekly, fortnightly, or a one-off deep clean.",
    propertyType: "luxury-apartment",
  },
];

export const serviceFaqs = [
  {
    question: "Can you clean outside working hours?",
    answer: "Yes. Most office work happens before 8am or after 6pm. We agree access and key-holding before the first visit.",
  },
  {
    question: "Will we have the same cleaners each time?",
    answer: "Yes. Each client has a regular team, and cover staff are briefed on your specification.",
  },
  {
    question: "Are you insured?",
    answer: "Yes. We carry public liability and employer's liability insurance and can share certificates on request.",
  },
  {
    question: "How is pricing worked out?",
    answer: "We take a brief or visit, agree a written specification, then quote a fixed price. No call-out fees.",
  },
] as const;
