"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import type { SiteContent } from "@/lib/site-content";

import Link from "next/link";

export function RNDResourcesSection({ content, blogs }: { content: SiteContent["rnd"]; blogs: SiteContent["blogs"] }) {
  const PATENTS = content.patents;
  const BLOGS = blogs;
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
              <h3 className="text-2xl font-bold text-white tracking-wide">{content.patentsTitle}</h3>
              <p className="text-sm text-cyan-400 mt-1 uppercase tracking-widest font-mono">{content.patentsEyebrow}</p>
            </div>
            <div className="space-y-6">
              {PATENTS.map((patent) => (
                <article key={patent.id} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex flex-col md:flex-row gap-8 items-start">
                  {patent.image && (
                    <div className="w-full md:w-1/4 shrink-0 rounded-xl overflow-hidden bg-white/5 flex items-center justify-center border border-white/10 p-2 aspect-[3/4] max-w-[200px]">
                      <Image src={patent.image} alt={patent.title} width={184} height={245} sizes="(max-width: 768px) 184px, 25vw" className="w-full h-full object-contain rounded-lg" />
                    </div>
                  )}
                  <div className="flex-grow flex flex-col">
                    <div>
                      <h4 className="text-xl font-semibold text-white leading-snug mb-2">{patent.title}</h4>
                      <p className="text-sm text-cyan-400 font-mono mb-4">{patent.id}</p>
                      {patent.description && (
                        <p className="body-copy text-sm text-neutral-400 font-light mb-6">{patent.description}</p>
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
              <h3 className="text-2xl font-bold text-white tracking-wide">{content.blogsTitle}</h3>
              <p className="text-sm text-cyan-400 mt-1 uppercase tracking-widest font-mono">{content.blogsEyebrow}</p>
            </div>
            <div className="space-y-6">
              {BLOGS.map((blog) => (
                <Link href={`/rnd/blogs/${blog.slug}`} key={blog.slug} className="group p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all cursor-pointer flex gap-6 items-start">
                  <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden relative bg-neutral-900 hidden sm:block">
                    <div className={`absolute inset-0 bg-gradient-to-br ${blog.gradient} opacity-80`} />
                    {blog.image && <Image src={blog.image} alt="" fill sizes="96px" className="object-contain transition-transform duration-500 group-hover:scale-110" />}
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
