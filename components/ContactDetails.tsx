import { contactPage } from "@/content/copy";
import { contact } from "@/content/site";

const { labels } = contactPage;

export function ContactDetails({ withHours = false, className = "" }: { readonly withHours?: boolean; readonly className?: string }) {
  const rows = [
    { label: labels.phone, value: <a href={contact.phoneHref}>{contact.phoneDisplay}</a> },
    { label: labels.email, value: <a href={`mailto:${contact.email}`} className="break-all">{contact.email}</a> },
    { label: labels.whatsapp, value: <a href={contact.whatsappHref}>{labels.whatsappLink}</a> },
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
