import type { Metadata } from "next";
import { CareerContent } from "@/components/sections/CareerContent";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the vanguard at Sense-XT Innovations. Explore open positions in quantum metrology, AI biosensor engineering, and electrochemical systems analysis.",
};


export default async function CareerPage() {
  const { careers } = await getSiteContent();
  return <CareerContent eyebrow={careers.eyebrow} title={careers.title} jobs={careers.jobs} />;
}
