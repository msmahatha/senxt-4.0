import { HeroSection } from "@/components/sections/HeroSection";
import { ZoomExperience } from "@/components/sections/ZoomExperience";
import { OverviewSection } from "@/components/sections/OverviewSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { getSiteContent } from "@/lib/site-content";

export default async function Home() {
  const content = await getSiteContent();
  return (
    <>
      <HeroSection content={content.hero} />
      <ZoomExperience />
      <OverviewSection />
      <AboutSection minimal />
    </>
  );
}
