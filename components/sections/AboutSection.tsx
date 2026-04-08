"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const RESEARCHERS = [
  {
    name: "Dr. A. Sharma",
    role: "Quantum Biosensing Lead",
    image: "/researchers/dr-a-sharma.svg",
  },
  {
    name: "Dr. J. Doe",
    role: "Nanofabrication Scientist",
    image: "/researchers/dr-j-doe.svg",
  },
  {
    name: "S. Lee",
    role: "Electrochemical Systems Researcher",
    image: "/researchers/s-lee.svg",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 w-full bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full z-10 flex flex-col gap-16">
        <div className="w-full flex flex-col lg:flex-row gap-16 items-start">
        
        {/* Left Side: Main Title & "Make in India" Badge */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2"
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-xs font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(212,175,55,0.2)]">
            Make in India
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            Sense-XT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1dd3b0] to-blue-500 glow-cyan">Innovations.</span>
          </h2>
          <p className="text-neutral-300 font-light leading-relaxed text-lg mb-8">
            A deep-tech startup focused on advancing next-generation diagnostic sensor fabrication for early, ultra-precise disease detection. Based in Jalpaiguri and Kolkata, and incubated at Jadavpur University.
          </p>

          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-neutral-400">Jadavpur University Incubated</span>
            <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-neutral-400">Supported by QMET</span>
            <span className="px-4 py-2 rounded-lg border border-[#1dd3b0]/30 text-[#1dd3b0] shadow-[0_0_10px_rgba(29,211,176,0.1)] text-sm">National Quantum Mission</span>
          </div>
        </motion.div>

          {/* Right Side: Content Cards */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 border border-white/10 bg-white/[0.02] rounded-3xl hover:bg-white/[0.04] transition-colors"
            >
              <h3 className="text-xl font-semibold text-white mb-3">AI & Next-Gen Hardware</h3>
              <p className="text-neutral-400 font-light leading-relaxed text-sm">
                We specialize in the design and fabrication of biosensors using advanced nanotechnology and next-generation hardware platforms. By integrating Artificial Intelligence (AI), we deliver enhanced analytical precision and data-driven diagnostics, currently centered on electrochemical sensing for rapid and reliable detection of infectious diseases, particularly dengue and other mosquito-borne infections.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative p-8 border border-[#1dd3b0]/20 bg-gradient-to-br from-[#1dd3b0]/5 to-transparent rounded-3xl overflow-hidden hover:border-[#1dd3b0]/50 transition-colors"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <svg className="w-24 h-24 text-[#1dd3b0]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 12l10 10 10-10L12 2zm0 4.236l5.764 5.764L12 17.764 6.236 12 12 6.236z"/></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 relative z-10">Quantum Biosensing</h3>
              <p className="text-neutral-400 font-light leading-relaxed text-sm relative z-10">
                Advancing beyond conventional approaches, Sense-XT is transitioning into quantum biosensing. Leveraging fluorescence nanodiamonds to achieve ultra-sensitive detection capabilities, our deep-tech approach detects extremely low concentrations of viral biomarkers in blood, facilitating ultra-early stage diagnosis with significantly improved accuracy. Looking ahead, we pledge to expand our technological applications to complex neurodegenerative disorders.
              </p>
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
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d5a64a]">Core Team</p>
              <h3 className="mt-2 text-2xl md:text-3xl font-semibold text-white">Researchers Behind Sense-XT</h3>
            </div>
            <p className="max-w-xl text-sm text-neutral-400 font-light">
              Meet the scientists shaping our biosensing stack from nanofabrication to quantum detection workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RESEARCHERS.map((researcher, index) => (
              <motion.article
                key={researcher.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-[#050505]/60 p-5 hover:border-[#21d5bf]/45 transition-colors"
              >
                <div className="relative overflow-hidden rounded-xl border border-white/10">
                  <Image
                    src={researcher.image}
                    alt={`${researcher.name} researcher portrait`}
                    width={640}
                    height={760}
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <h4 className="mt-4 text-lg font-semibold text-white">{researcher.name}</h4>
                <p className="mt-1 text-sm text-[#d5a64a]">{researcher.role}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
