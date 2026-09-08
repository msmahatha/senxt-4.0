import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://sense-xt.vercel.app"),
  title: {
    default: "Sense-XT Innovations | Deep-Tech Diagnostics",
    template: "%s | Sense-XT Innovations",
  },
  description:
    "Advancing next-generation sensor fabrication and AI for ultra-early disease detection. India's leading deep-tech healthcare startup.",
  keywords: [
    "biosensor",
    "nanotech",
    "diagnostics",
    "deep-tech",
    "dengue detection",
    "graphene sensor",
    "India healthtech",
    "electrochemical biosensor",
    "Sense-XT",
  ],
  authors: [{ name: "Sense-XT Innovations Pvt. Ltd." }],
  creator: "Sense-XT Innovations",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sense-xt.vercel.app",
    siteName: "Sense-XT Innovations",
    title: "Sense-XT Innovations | Deep-Tech Diagnostics",
    description:
      "Advancing next-generation sensor fabrication and AI for ultra-early disease detection.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Sense-XT Innovations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sense-XT Innovations | Deep-Tech Diagnostics",
    description:
      "Advancing next-generation sensor fabrication and AI for ultra-early disease detection.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#050505] text-white selection:bg-cyan-500/30">
        <MotionProvider>
          <Navbar />
          <CursorEffect />
          <div className="flex-grow">{children}</div>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
