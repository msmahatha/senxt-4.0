"use client";

import { motion } from "framer-motion";

export function InnovationsSection() {
  return (
    <section id="product" className="relative py-24 w-full bg-[#050505] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full z-10 mb-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-bold uppercase tracking-[0.2em] text-[#1dd3b0] mb-4"
        >
          PRODUCT PORTFOLIO
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight"
        >
          Precision tools for a<br />
          healthier future.
        </motion.h2>
      </div>

      <div className="max-w-5xl mx-auto w-full px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Quantum Biosensor Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border border-white/10 bg-[#0d1117] p-8 md:p-10 flex flex-col justify-between overflow-hidden group"
          >
            {/* Background Image Overlay */}
            <div 
              className="absolute inset-0 z-0 opacity-15 mix-blend-screen group-hover:opacity-30 transition-opacity duration-700 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/bg_qb.png')` }}
            />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 rounded-full border border-teal-500/30 flex items-center justify-center bg-teal-500/5 overflow-hidden">
                  <img src="/quentam.png" alt="Quantum Biosensor" className="w-10 h-10 object-contain" />
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-teal-400 bg-teal-400/10 uppercase">
                  AVAILABLE
                </span>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Quantum Biosensor</h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-10">
                Next-gen quantum sensing platform for ultra-sensitive detection of infectious diseases.
              </p>

              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500">KEY SPECIFICATIONS</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-neutral-300">
                    <span className="w-1 h-1 rounded-full bg-teal-400" />
                    <span className="font-medium text-neutral-400">Sensitivity:</span> 0.1 attomolar
                  </li>
                  <li className="flex items-center gap-3 text-sm text-neutral-300">
                    <span className="w-1 h-1 rounded-full bg-teal-400" />
                    <span className="font-medium text-neutral-400">Response Time:</span> &lt; 2 mins
                  </li>
                  <li className="flex items-center gap-3 text-sm text-neutral-300">
                    <span className="w-1 h-1 rounded-full bg-teal-400" />
                    <span className="font-medium text-neutral-400">Power Consumption:</span> 50mW
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 rounded-xl bg-black/40 border border-white/10 p-5 relative z-10 backdrop-blur-md">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-2">APPLICATION</p>
              <p className="text-sm text-white font-medium">Hospital diagnostics, Point-of-care testing</p>
            </div>
          </motion.div>

          {/* Electrochemical Biosensor Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-3xl border border-white/10 bg-[#0d1117] p-8 md:p-10 flex flex-col justify-between overflow-hidden group"
          >
            {/* Background Image Overlay */}
            <div 
              className="absolute inset-0 z-0 opacity-15 mix-blend-screen group-hover:opacity-30 transition-opacity duration-700 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/eletronic.png')` }}
            />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 rounded-full border border-teal-500/30 flex items-center justify-center bg-[#E5F5F6] overflow-hidden">
                  <img src="/eletric_logo.png" alt="Electrochemical Biosensor" className="w-10 h-10 object-contain" />
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-teal-400 bg-teal-400/10 uppercase">
                  UPCOMING
                </span>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Electrochemical Biosensor</h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-10">
                Ultra-sensitive viral biomarker detection using NV-center diamonds.
              </p>

              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500">KEY SPECIFICATIONS</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-neutral-300">
                    <span className="w-1 h-1 rounded-full bg-teal-400" />
                    <span className="font-medium text-neutral-400">Target:</span> Viral RNA/DNA
                  </li>
                  <li className="flex items-center gap-3 text-sm text-neutral-300">
                    <span className="w-1 h-1 rounded-full bg-teal-400" />
                    <span className="font-medium text-neutral-400">Platform:</span> Microfluidic chip
                  </li>
                  <li className="flex items-center gap-3 text-sm text-neutral-300">
                    <span className="w-1 h-1 rounded-full bg-teal-400" />
                    <span className="font-medium text-neutral-400">Precision:</span> &gt; 99.9%
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 rounded-xl bg-black/40 border border-white/10 p-5 relative z-10 backdrop-blur-md">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-500 mb-2">APPLICATION</p>
              <p className="text-sm text-white font-medium">Research labs, Pharmaceutical testing</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
