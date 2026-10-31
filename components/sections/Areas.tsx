import { home } from "@/content/copy";
import { areas } from "@/content/site";
import { Section } from "@/components/ui/Section";

export function Areas() {
  return (
    <Section grid labelledBy="areas-heading" className="gap-y-10">
      <h2 id="areas-heading" className="serif reveal col-span-12 text-head md:col-span-6">
        {home.areas.heading}
      </h2>
      <table className="reveal col-span-12 w-full border-collapse self-start md:col-span-5 md:col-start-8">
        <tbody>
          {areas.map((area) => (
            <tr key={area.name} className="border-t border-line">
              <th scope="row" className="w-1/3 py-4.5 pr-4 text-left align-top font-medium">
                {area.name}
              </th>
              <td className="py-4.5 align-top text-muted">{area.places}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="reveal col-span-12 text-small text-muted md:col-span-5">{home.areas.note}</p>
    </Section>
  );
}
