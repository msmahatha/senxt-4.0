import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { SiteContent } from "@/lib/site-content";

const icons = { youtube: ExternalLink, linkedin: ExternalLink, instagram: ExternalLink, twitter: ExternalLink };

export function Footer({ content }: { content: SiteContent }) {
  const { settings, contact, legal } = content;
  const socialLinks = settings.socialLinks.filter((link) => link.url.trim());
  return <footer className="relative mt-auto w-full overflow-hidden border-t border-white/5 bg-[#050505] pb-8 pt-24"><div className="mx-auto max-w-7xl px-6 lg:px-8">
    <nav aria-label="Footer navigation" className="mb-12 flex flex-wrap justify-center gap-x-8 gap-y-5 border-b border-white/10 pb-8 md:justify-start">
      {settings.navigation.map((link, index) => <Link key={`${link.href}-${index}`} href={link.href} className="text-sm font-semibold uppercase tracking-wider text-neutral-300 transition-colors hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400">{link.label}</Link>)}
    </nav>
    <div className="grid items-start gap-12 md:grid-cols-3">
    <div className="text-center md:text-left"><Link href="/" className="mb-6 inline-block">{settings.logo && <Image src={settings.logo} alt="Company logo" width={150} height={45} className="object-contain" />}</Link><div className="space-y-3 text-sm text-neutral-400">{contact.locations.map((location, index) => <p key={index}><strong className="font-medium text-white">{location.title}:</strong> {location.address.replace(/\n/g, " ")}</p>)}</div></div>
    <nav aria-label="Legal information" className="flex flex-col items-center gap-4 text-sm text-neutral-400">{Object.entries(legal).map(([name, page]) => <Link key={name} href={`/${name}`} className="hover:text-cyan-400">{page.title}</Link>)}</nav>
    <div className="flex flex-col items-center gap-6 md:items-end"><div className="flex flex-wrap gap-3">{socialLinks.map((link, index) => { const Icon = icons[link.label.toLowerCase() as keyof typeof icons] ?? ExternalLink; return <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="rounded-xl bg-white/5 p-3 text-neutral-400 hover:text-cyan-400"><Icon className="h-5 w-5" /></a>; })}</div><p className="text-center text-xs text-neutral-500 md:text-right">{settings.copyright}</p><p className="text-xs text-neutral-400">{settings.credit}</p></div>
  </div></div><div className="pointer-events-none mt-14 overflow-hidden"><p className="whitespace-nowrap bg-gradient-to-b from-white/10 to-transparent bg-clip-text text-center text-[22vw] font-black leading-none tracking-tighter text-transparent">{settings.footerBrand}</p></div></footer>;
}
