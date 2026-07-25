"use client";

import { motion } from "framer-motion";

import { BLOGS } from "@/data/blogs";

const PATENTS = [
  {
    title: "Speedy Heat-Induced Vacuum Assisted Process to Synthesize Quantum Dots",
    id: "Patent No. 592404",
    status: "Granted",
    image: "/patent.png",
    description: "A patented, ultrafast vacuum-assisted thermal process for synthesizing graphene and carbon quantum dots (GQDs/CQDs) from sustainable carbon precursors. The technology enables scalable production of highly crystalline quantum dots (~3.2 nm average size) in under one minute through a simple, cost-effective, and environmentally friendly process. Its high yield, rapid synthesis, and industrial scalability make it ideal for applications in sensing, healthcare, energy, electronics, and advanced nanotechnology.",
  }
];

import Link from "next/link";

export function RNDResourcesSection() {
  return (
    <section className="relative py-24 w-full bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full z-10">
        
        <div className="grid grid-cols-1 gap-12 lg:gap-16">
          {/* Patents Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 border-b border-white/10 pb-4">
              <h3 className="text-2xl font-bold text-white tracking-wide">Patents</h3>
              <p className="text-sm text-cyan-400 mt-1 uppercase tracking-widest font-mono">Intellectual Property</p>
            </div>
            <div className="space-y-6">
              {PATENTS.map((patent, idx) => (
                <article key={idx} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex flex-col md:flex-row gap-8 items-start">
                  {patent.image && (
                    <div className="w-full md:w-1/4 shrink-0 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center border border-white/10 p-2 aspect-[3/4] max-w-[200px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={patent.image} alt={patent.title} className="w-full h-full object-contain rounded-lg" />
                    </div>
                  )}
                  <div className="flex-grow flex flex-col">
                    <div>
                      <h4 className="text-xl font-semibold text-white leading-snug mb-2">{patent.title}</h4>
                      <p className="text-sm text-cyan-400 font-mono mb-4">{patent.id}</p>
                      {patent.description && (
                        <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">{patent.description}</p>
                      )}
                    </div>
                    <div className="mt-2">
                      <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase ${patent.status === 'Granted' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                        {patent.status}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>

          {/* Blogs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-6 border-b border-white/10 pb-4">
              <h3 className="text-2xl font-bold text-white tracking-wide">Blogs</h3>
              <p className="text-sm text-cyan-400 mt-1 uppercase tracking-widest font-mono">Latest News</p>
            </div>
            <div className="space-y-6">
              {BLOGS.map((blog, idx) => (
                <Link href={`/rnd/blogs/${blog.slug}`} key={idx} className="group p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all cursor-pointer flex gap-6 items-start">
                  <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden relative bg-neutral-900 hidden sm:block">
                    <div className={`absolute inset-0 bg-gradient-to-br ${blog.gradient} opacity-80`} />
                    <div 
                      className="absolute inset-0 bg-contain bg-no-repeat bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url('/blogs/${blog.slug}.jpg')` }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-neutral-500 mb-2 font-mono">{blog.date}</p>
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">{blog.title}</h4>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed line-clamp-2">{blog.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
