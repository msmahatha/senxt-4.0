import type { Metadata } from "next";
import { getSiteContent } from "@/lib/site-content";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Navbar } from "@/components/shared/Navbar";
import { CursorEffect } from "@/components/shared/CursorEffect";
import { Footer } from "@/components/shared/Footer";
import { MotionProvider } from "@/components/shared/MotionProvider";

export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteContent();
  return {
    metadataBase: new URL(settings.siteUrl),
    title: { default: settings.siteTitle, template: "%s | Sense-XT Innovations" },
    description: settings.description,
    openGraph: { title: settings.siteTitle, description: settings.description, images: settings.socialImage ? [settings.socialImage] : [] },
    twitter: { card: "summary_large_image", title: settings.siteTitle, description: settings.description, images: settings.socialImage ? [settings.socialImage] : [] },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getSiteContent();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#050505] text-white selection:bg-cyan-500/30">
        <MotionProvider>
          <Navbar settings={content.settings} />
          <CursorEffect />
          <div className="flex-grow">{children}</div>
          <Footer content={content} />
        </MotionProvider>
      </body>
    </html>
  );
}
