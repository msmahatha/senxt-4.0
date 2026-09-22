import type { Metadata } from "next";
import { getSiteContent } from "@/lib/site-content";
import { InnovationsSection } from "@/components/sections/InnovationsSection";

export async function generateMetadata(): Promise<Metadata> { const { headers } = await getSiteContent(); return { title: headers.product.title, description: headers.product.description }; }


export default async function ProductPage() {
  const content = await getSiteContent();
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">{content.headers.product.title}</h1>
        <p className="text-xl text-neutral-400 font-light max-w-3xl leading-relaxed">{content.headers.product.description}</p>
      </div>
      
      <div className="mt-[-100px]"><InnovationsSection content={content.products} /></div>
    </div>
  );
}
