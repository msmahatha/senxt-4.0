import type { Metadata } from "next";
import { getSiteContent } from "@/lib/site-content";
import { AboutSection } from "@/components/sections/AboutSection";

export async function generateMetadata(): Promise<Metadata> { const { headers } = await getSiteContent(); return { title: headers.about.title, description: headers.about.description }; }

export default async function AboutPage() {
  const content = await getSiteContent();
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-8 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">{content.headers.about.title}</h1>
        <p className="text-xl text-neutral-400 font-light max-w-3xl leading-relaxed">{content.headers.about.description}</p>
      </div>
      
      <div className="mt-8">
        <AboutSection content={content.about} />
      </div>
    </div>
  );
}
