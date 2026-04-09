"use client";

import { motion } from "framer-motion";

const innovations = [
  { id: 1, title: "Dengue Detection Platform", subtitle: "Rapid Electrochemical Sensor", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop" },
  { id: 2, title: "Quantum Biosensing Prototype", subtitle: "Fluorescence Nanodiamonds", image: "https://images.unsplash.com/photo-1628863353691-0071c8c1874c?q=80&w=800&auto=format&fit=crop" },
  { id: 3, title: "Data-Driven AI Diagnostics", subtitle: "Next-Gen Hardware", image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=800&auto=format&fit=crop" },
];

export function InnovationsSection() {
  return (
    <section id="product" className="relative py-24 w-full bg-[#050505] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full z-10 mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-white tracking-tight"
        >
          Innovations in <span className="text-purple-500 glow-purple">Progress.</span>
        </motion.h2>
      </div>

      <div className="max-w-screen-2xl mx-auto w-full px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {innovations.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-none"
            >
              {/* Background Image (We use unsplash placeholders simulating abstract tech) */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-cyan-400 font-mono text-sm mb-2">{item.subtitle}</p>
                  <h3 className="text-3xl font-bold text-white mb-4">{item.title}</h3>
                  <div className="w-12 h-1 bg-cyan-500 group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
