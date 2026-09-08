import type { Metadata } from "next";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Sense-XT Innovations for research collaboration, product demos, pilot deployments, and press inquiries.",
};

export default async function ContactPage() {
  const { contact } = await getSiteContent();
  return (
    <main className="min-h-screen bg-[#050505] pt-24">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-16 text-center lg:px-8">
        <p className="mb-4 text-sm font-bold uppercase tracking-widest text-[#1dd3b0]">{contact.eyebrow}</p>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">{contact.title}</h1>
        <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-neutral-400 md:text-xl">{contact.description}</p>
      </div>
      <section className="relative pb-16">
        <div className="relative z-10 mx-auto grid max-w-4xl grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:px-8">
          {contact.channels.map((channel) => (
            <div key={channel.email} className="flex flex-col items-center rounded-[2rem] border border-white/5 bg-[#0a0f18] p-10 text-center transition-all duration-300 hover:border-[#1dd3b0]/30 hover:bg-[#0c1421]">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#1dd3b0]/10 ring-1 ring-inset ring-[#1dd3b0]/20"><ContactIcon /></div>
              <h2 className="mb-3 text-xl font-bold text-white">{channel.title}</h2>
              <p className="mb-8 flex-grow text-sm leading-relaxed text-neutral-400">{channel.description}</p>
              <a href={`mailto:${channel.email}`} className="text-sm font-semibold text-[#1dd3b0] decoration-2 underline-offset-4 hover:underline">{channel.email}</a>
            </div>
          ))}
        </div>
      </section>
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#1d977e] p-12 text-center shadow-2xl md:p-16">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />
            <h2 className="relative z-10 mb-10 text-3xl font-bold text-white md:text-5xl">Our Locations</h2>
            <div className="relative z-10 mb-12 flex flex-col items-center justify-center gap-10 md:flex-row md:items-start md:gap-16">
              {contact.locations.map((location) => <div key={location.title} className="text-center"><h3 className="mb-3 text-xl font-semibold text-white">{location.title}</h3><p className="whitespace-pre-line text-lg font-light leading-relaxed text-white/90">{location.address}</p></div>)}
            </div>
            <div className="relative z-10 inline-block rounded-xl border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-sm"><span className="text-sm font-semibold tracking-wide text-white">{contact.hours}</span></div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactIcon() {
  return <svg className="h-6 w-6 text-[#1dd3b0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-8.57 5.27a2.25 2.25 0 01-2.36 0L2.25 6.75" /></svg>;
}
