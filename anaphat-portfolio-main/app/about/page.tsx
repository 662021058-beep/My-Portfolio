import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import Services from "@/components/about/Services";
import ApproachValues from "@/components/about/ApproachValues";
import Activities from "@/components/about/Activities";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutStory />
      <Services />
      <Activities />
      <ApproachValues />
    </main>
  );
}
