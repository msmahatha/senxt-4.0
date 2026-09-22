import type { Metadata } from "next";
import { getSiteContent } from "@/lib/site-content";
import { RNDResourcesSection } from "@/components/sections/RNDResourcesSection";

export async function generateMetadata(): Promise<Metadata> { const { headers } = await getSiteContent(); return { title: headers.rnd.title, description: headers.rnd.description }; }

export default async function RNDPage() {
  const content = await getSiteContent();
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-0">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 uppercase">{content.headers.rnd.title}</h1>
        <p className="text-xl md:text-2xl text-neutral-400 font-light max-w-3xl leading-relaxed">{content.headers.rnd.description}</p>
      </div>

      <RNDResourcesSection content={content.rnd} blogs={content.blogs} />
    </div>
  );
}
