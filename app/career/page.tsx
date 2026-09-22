import type { Metadata } from "next";
import { CareerContent } from "@/components/sections/CareerContent";
import { getSiteContent } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const { careers } = await getSiteContent();
  return { title: careers.metaTitle, description: careers.metaDescription };
}


export default async function CareerPage() {
  const { careers } = await getSiteContent();
  return <CareerContent content={careers} />;
}
