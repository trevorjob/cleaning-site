import { home } from "@/content/copy";
import { pageMetadata } from "@/lib/metadata";
import { Areas } from "@/components/sections/Areas";
import { Hero } from "@/components/sections/Hero";
import { Kit } from "@/components/sections/Kit";
import { Overnight } from "@/components/sections/Overnight";
import { Services } from "@/components/sections/Services";
import { Statement } from "@/components/sections/Statement";
import { Steps } from "@/components/sections/Steps";

export const metadata = pageMetadata({ ...home.meta, path: "/", absoluteTitle: true });

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <Services />
      <Kit />
      <Overnight />
      <Steps />
      <Areas />
    </>
  );
}
