"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const WHAT_WE_DO = [
  {
    title: "Next-Generation Biosensors",
    description: "Graphene and other 2D nanomaterial-based biosensor systems for high-performance diagnostic use cases.",
  },
  {
    title: "Electrochemical Sensing",
    description: "Electrochemical sensing platforms designed for ultra-sensitive and reliable detection workflows.",
  },
  {
    title: "Quantum Biosensing",
    description: "Fluorescent nanodiamonds and quantum defects for precision biosensing at extremely low biomarker concentrations.",
  },
  {
    title: "Disease Detection",
    description: "Detection pipelines for viral diseases and neurodegenerative biomarkers through advanced sensor architectures.",
  },
  {
    title: "AI-Integrated Diagnostics",
    description: "Smart diagnostics with AI-assisted real-time analysis to accelerate insight generation and decision support.",
  },
];

const MISSION_POINTS = [
  "Develop quantum and nano-enabled biosensors.",
  "Bridge research with real-world applications.",
  "Contribute to India&apos;s deep-tech ecosystem.",
  "Enable next-generation diagnostics.",
];

const LEADERSHIP = [
  { name: "Manas Thakur", role: "Co-founder & CEO" },
  { name: "Sk Najes Riaz", role: "Co-founder & CTO" },
  { name: "Sourav Sarkar", role: "Co-founder & Mentor" },
];

const INSTITUTES = [
  {
    id: "iic-jadavpur-university",
    name: "IIC Jadavpur University",
    logo: "/institutes/iic-jadavpur-university-updated.jpeg",
  },
  {
    id: "jadavpur-university",
    name: "Jadavpur University",
    logo: "/institutes/jadavpur-university-updated.png",
  },
  {
    id: "qmet-iit-bombay",
    name: "QMET IIT Bombay",
    logo: "/institutes/qmet-iit-bombay-updated.png",
  },
  {
    id: "national-quantum-mission",
    name: "National Quantum Mission (NQM)",
    logo: "/institutes/national-quantum-mission-updated.png",
  },
  {
    id: "iim-calcutta-innovation-park",
    name: "IIM Calcutta Innovation Park",
    logo: "/institutes/iim-calcutta-innovation-park-updated.png",
  },
  {
    id: "make-in-india",
    name: "Make in India",
    logo: "/institutes/make-in-india-updated.jpg",
  },
];

const INSTITUTE_SLIDES = [...INSTITUTES, ...INSTITUTES];

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 w-full bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full z-10 flex flex-col gap-16">
        <div className="w-full flex flex-col lg:flex-row gap-16 items-start lg:items-stretch">

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 flex flex-col"
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-xs font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(212,175,55,0.2)]">
            DPIIT Approved Startup
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
            Sense-XT Innovations
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1dd3b0] to-blue-500 glow-cyan">Private Limited</span>
          </h2>
          <p className="text-neutral-300 font-light leading-relaxed text-lg mb-8">
            We build next-generation solutions at the intersection of Quantum Technology, Nanotechnology, and Artificial Intelligence. Our work translates advanced scientific research into real-world sensing and diagnostic technologies aligned with India&apos;s National Quantum Mission.
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-[#21d5bf]/20 bg-gradient-to-br from-[#21d5bf]/6 via-white/[0.02] to-[#d5a64a]/10 p-5 md:p-6">
            <p className="text-sm md:text-base font-bold uppercase tracking-[0.22em] text-[#d5a64a]">Institutional Ecosystem</p>
            <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#050505]/70">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 md:w-28 bg-gradient-to-r from-[#050505] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 md:w-28 bg-gradient-to-l from-[#050505] to-transparent" />

              <div className="institution-marquee flex w-max gap-6 px-5 py-5 md:gap-8 md:px-7 md:py-7">
                {INSTITUTE_SLIDES.map((institute, index) => (
                  <article
                    key={`${institute.id}-${index}`}
                    className="flex min-w-[360px] items-center gap-4 rounded-2xl border border-white/10 bg-[#020202]/90 px-4 py-3 md:min-w-[440px] md:gap-5 md:px-6 md:py-4"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white md:h-20 md:w-20">
                      <Image
                        src={institute.logo}
                        alt={`${institute.name} logo`}
                        fill
                        unoptimized
                        sizes="80px"
                        className="object-contain p-1.5"
                      />
                    </div>
                    <p className="text-lg font-semibold text-neutral-100 leading-tight md:text-xl">{institute.name}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 hidden lg:grid lg:flex-1 grid-cols-2 gap-4 auto-rows-fr">
            {INSTITUTES.map((institute) => (
              <article
                key={`grid-${institute.id}`}
                className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex items-center gap-4"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white">
                  <Image
                    src={institute.logo}
                    alt={`${institute.name} logo`}
                    fill
                    unoptimized
                    sizes="64px"
                    className="object-contain p-1.5"
                  />
                </div>
                <p className="text-base font-medium text-neutral-100 leading-tight">{institute.name}</p>
              </article>
            ))}
          </div>
        </motion.div>

          <div className="lg:w-1/2 flex flex-col gap-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 border border-white/10 bg-white/[0.02] rounded-3xl hover:bg-white/[0.04] transition-colors"
            >
              <h3 className="text-xl font-semibold text-white mb-4">What We Do</h3>
              <div className="space-y-4">
                {WHAT_WE_DO.map((item) => (
                  <div key={item.title} className="rounded-xl border border-white/10 bg-[#050505]/40 p-4">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[#d5a64a] mb-2">{item.title}</h4>
                    <p className="text-neutral-400 font-light leading-relaxed text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative p-8 border border-[#1dd3b0]/20 bg-gradient-to-br from-[#1dd3b0]/5 to-transparent rounded-3xl overflow-hidden hover:border-[#1dd3b0]/50 transition-colors"
            >
              <h3 className="text-xl font-semibold text-white mb-3">Vision</h3>
              <p className="text-neutral-300 font-light leading-relaxed text-sm mb-6">
                To position India as a global leader in quantum-enabled sensing and nanotechnology innovation.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">Mission</h3>
              <ul className="space-y-3">
                {MISSION_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-neutral-300 font-light leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#1dd3b0]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10"
        >
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d5a64a]">Leadership</p>
              <h3 className="mt-2 text-2xl md:text-3xl font-semibold text-white">Founding Team</h3>
            </div>
            <p className="max-w-xl text-sm text-neutral-400 font-light">
              Leadership driving our deep-tech roadmap across quantum biosensing, nanotechnology, and AI-integrated diagnostics.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LEADERSHIP.map((leader, index) => (
              <motion.article
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-[#050505]/60 p-6 hover:border-[#21d5bf]/45 transition-colors"
              >
                <div className="inline-flex items-center justify-center h-11 w-11 rounded-full border border-[#d5a64a]/40 bg-[#d5a64a]/10 text-[#d5a64a] text-sm font-semibold">
                  {index + 1}
                </div>
                <h4 className="mt-4 text-xl font-semibold text-white">{leader.name}</h4>
                <p className="mt-2 text-sm text-[#d5a64a]">{leader.role}</p>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d5a64a]">Commitment</p>
            <p className="mt-3 text-sm md:text-base text-neutral-300 font-light leading-relaxed">
              We are committed to building technologies that create real impact in healthcare and advanced sensing, contributing to a technologically empowered India.
            </p>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes instituteMarquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .institution-marquee {
          animation: instituteMarquee 46s linear infinite;
        }

        .institution-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
