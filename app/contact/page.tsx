import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Sense-XT Innovations for research collaboration, product demos, pilot deployments, and press inquiries.",
};

const channels = [
  {
    title: "Partnership",
    description: "For research collaborations and strategic alliances.",
    email: "partnership@sense-xt.com",
    icon: (
      <svg className="w-6 h-6 text-[#1dd3b0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    )
  },
  {
    title: "General Enquiry",
    description: "For general information and business queries.",
    email: "info@sense-xt.com",
    icon: (
      <svg className="w-6 h-6 text-[#1dd3b0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    )
  },
  {
    title: "Careers",
    description: "Send your portfolio and CV for future consideration.",
    email: "careers@sense-xt.com",
    icon: (
      <svg className="w-6 h-6 text-[#1dd3b0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    )
  }
];

export default function ContactPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#050505]">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-16 text-center">
        <p className="text-[#1dd3b0] text-sm font-bold tracking-widest uppercase mb-4">
          Get in touch
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
          We&apos;d love to hear from you.
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
          Whether you have a question about our technology, pricing, or just want to connect — our team is ready to help.
        </p>
      </div>

      {/* Contact Channels Grid */}
      <section className="relative pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {channels.map((channel) => (
            <div
              key={channel.title}
              className="flex flex-col items-center text-center rounded-[2rem] border border-white/5 bg-[#0a0f18] p-10 hover:bg-[#0c1421] hover:border-[#1dd3b0]/30 transition-all duration-300"
            >
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#1dd3b0]/10 ring-1 ring-inset ring-[#1dd3b0]/20">
                {channel.icon}
              </div>
              <h3 className="text-xl text-white font-bold mb-3">{channel.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-8 flex-grow">
                {channel.description}
              </p>
              <a
                href={`mailto:${channel.email}`}
                className="text-[#1dd3b0] font-semibold text-sm hover:underline decoration-2 underline-offset-4"
              >
                {channel.email}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* HQ Section */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="rounded-[2.5rem] bg-[#1d977e] p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent pointer-events-none" />
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-10 relative z-10">
              Our Locations
            </h2>
            
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-10 md:gap-16 mb-12 relative z-10">
              <div className="text-center">
                <h3 className="font-semibold text-white mb-3 text-xl">Headquarters</h3>
                <p className="text-lg text-white/90 font-light leading-relaxed">
                  Ashram Para,<br />
                  Jalpaiguri – 735101
                </p>
              </div>
              
              <div className="text-center">
                <h3 className="font-semibold text-white mb-3 text-xl">Operations</h3>
                <p className="text-lg text-white/90 font-light leading-relaxed">
                  Jadavpur University,<br />
                  Kolkata - 700032
                </p>
              </div>
              

            </div>
            
            <div className="inline-block rounded-xl border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-sm relative z-10">
              <span className="text-white text-sm font-semibold tracking-wide">
                Open Mon-Fri, 9:00 - 18:00
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
