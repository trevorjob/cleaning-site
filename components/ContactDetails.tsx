import { contactPage } from "@/content/copy";
import { contact, contactLinks } from "@/content/site";

const { labels } = contactPage;

export function ContactDetails({ withHours = false, className = "" }: { readonly withHours?: boolean; readonly className?: string }) {
  const rows = [
    ...contactLinks.map((link) => ({
      label: labels[link.kind],
      value: (
        <a href={link.href} className="break-all">
          {link.kind === "whatsapp" ? labels.whatsappLink : link.text}
        </a>
      ),
    })),
    ...(withHours
      ? [
          { label: labels.hours, value: contact.hours },
          { label: labels.area, value: contactPage.areaNote },
        ]
      : []),
  ];

  return (
    <dl className={`space-y-4 ${className}`}>
      {rows.map((row) => (
        <div key={row.label}>
          <dt className="text-small text-muted">{row.label}</dt>
          <dd className="mt-1">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
