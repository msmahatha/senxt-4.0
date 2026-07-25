import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Sense-XT Innovations for research collaboration, product demos, pilot deployments, and press inquiries.",
};

const channels = [
  {
    title: "General Inquiries",
    detail: "contact@sense-xt.com",
    hint: "For partnership and business queries",
    href: "mailto:contact@sense-xt.com",
  },
  {
    title: "Careers",
    detail: "career@sense-xt.com",
    hint: "For role and hiring related queries",
    href: "mailto:career@sense-xt.com",
  }
];

export default function ContactPage() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
          Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Us</span>
        </h1>
        <p className="text-xl text-neutral-400 font-light max-w-3xl leading-relaxed">
          Reach Sense-XT for collaborations, product walkthroughs, pilot programs, and media inquiries. We respond to every verified request.
        </p>
      </div>

      <section className="relative pb-24 pt-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[780px] bg-cyan-600/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            {channels.map((channel) => (
              <a
                key={channel.title}
                href={channel.href}
                className="block rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-colors"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300 mb-3">{channel.title}</p>
                <p className="text-xl md:text-2xl text-white font-semibold mb-2">{channel.detail}</p>
                <p className="text-sm text-neutral-400">{channel.hint}</p>
              </a>
            ))}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9 backdrop-blur-md">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">Send a Message</h2>
            <p className="text-sm text-neutral-400 mb-6">
              Share a brief note and our team will reach out with the next steps.
            </p>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-xl border border-white/10 bg-[#050505]/60 px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400"
              />
              <input
                type="email"
                placeholder="Work Email"
                className="w-full rounded-xl border border-white/10 bg-[#050505]/60 px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400"
              />
              <input
                type="text"
                placeholder="Organization"
                className="w-full rounded-xl border border-white/10 bg-[#050505]/60 px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400"
              />
              <textarea
                rows={5}
                placeholder="How can we help?"
                className="w-full rounded-xl border border-white/10 bg-[#050505]/60 px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 resize-none"
              />
              <button
                type="button"
                className="w-full rounded-xl border border-cyan-400/60 bg-cyan-500/10 py-3 text-cyan-200 font-medium tracking-wider uppercase text-sm hover:bg-cyan-500/20 transition-colors"
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
