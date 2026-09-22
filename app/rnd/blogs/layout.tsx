import type { Metadata } from "next";
import { getSiteContent } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> { const { headers } = await getSiteContent(); return { title: headers.rndblogs.title, description: headers.rndblogs.description }; }

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
