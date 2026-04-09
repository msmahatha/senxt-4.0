"use client";

import Link from "next/link";
import { motion } from "framer-motion";


export function ApplicationsSection() {
  return (
    <section id="applications" className="relative py-24 w-full bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
            Applied at <br/> <span className="text-cyan-500 glow-cyan">Clinical Scale.</span>
          </h2>
          <p className="text-neutral-400 font-light leading-relaxed mb-8 text-lg">
            From eradicating mosquito-borne diseases to charting the future of neuro-diagnostics, our nanoscale developments enable rapid, reliable, and ultra-early medical interventions.
          </p>
          <Link
            href="/rnd"
            className="inline-flex items-center text-cyan-400 font-medium tracking-wide hover:text-cyan-300 transition-colors group"
          >
            Explore the whitepapers
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
