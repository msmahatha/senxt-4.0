"use client";

import { motion } from "framer-motion";
import { Atom, Layers } from "lucide-react";

const cards = [
  {
    title: "Electrochemical Biosensors",
    description: "Rapid, reliable electrochemical sensing platforms optimized for the early detection of infectious diseases, particularly Dengue and other mosquito-borne infections.",
    icon: Atom,
  },
  {
    title: "Quantum Biosensing",
    description: "Leveraging fluorescence nanodiamonds for ultra-sensitive detection of extremely low viral biomarker concentrations, facilitating ultra-early stage diagnosis.",
    icon: Layers,
  },
  {
    title: "AI & Hardware Integration",
    description: "Next-generation hardware platforms seamlessly integrated with Artificial Intelligence to deliver enhanced analytical precision and data-driven diagnostics.",
    image: "/ai_hardware.png",
    bgImage: "/Ai_hardware_bg.png",
  },
];

export function OverviewSection() {
  return (
    <section id="rnd" className="relative py-24 w-full bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-cyan-500 font-mono tracking-widest uppercase text-sm mb-4">Research & Development</h3>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight max-w-2xl">
            Redefining precision healthcare through <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">quantum deep-tech.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm overflow-hidden hover:bg-white/[0.05] hover:border-cyan-500/30 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-700" />
              
              {card.bgImage && (
                <div 
                  className="absolute inset-0 z-0 opacity-15 mix-blend-screen group-hover:opacity-30 transition-opacity duration-700 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url('${card.bgImage}')` }}
                />
              )}
              
              {card.image ? (
                <img src={card.image} alt={card.title} className="w-12 h-12 rounded-lg object-cover mb-6 drop-shadow-[0_0_8px_rgba(33,213,191,0.75)]" />
              ) : card.icon ? (
                <card.icon className="w-10 h-10 text-cyan-400 mb-6 group-hover:text-cyan-300 transition-colors duration-300 drop-shadow-[0_0_8px_rgba(33,213,191,0.75)]" />
              ) : null}
              
              <h4 className="text-xl font-semibold text-white mb-3">{card.title}</h4>
              <p className="text-neutral-400 font-light leading-relaxed">{card.description}</p>
              
              <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-cyan-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
