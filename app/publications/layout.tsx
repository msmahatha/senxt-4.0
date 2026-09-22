import type { Metadata } from "next";
import { getSiteContent } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> { const { headers } = await getSiteContent(); return { title: headers.publications.title, description: headers.publications.description }; }

export default function PublicationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
