"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { SiteContent } from "@/lib/site-content";

export function AboutSection({ minimal = false, content }: { minimal?: boolean; content: SiteContent["about"] }) {
  const WHAT_WE_DO = content.whatWeDo;
  const LEADERSHIP = content.team;
  const INSTITUTE_SLIDES = [...content.partners, ...content.partners];
  return (
    <section id="about" className="relative py-24 w-full bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full z-10 flex flex-col gap-16">
        <div className="w-full flex flex-col lg:flex-row gap-16 items-start lg:items-stretch">

          {minimal && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 flex flex-col"
            >
              <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-xs font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                {content.badge}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
                {content.title}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1dd3b0] to-blue-500 glow-cyan">{content.subtitle}</span>
              </h2>
              <p className="body-copy text-neutral-300 font-light text-base md:text-lg mb-8">
                {content.description}
              </p>

              <div className="mt-6 rounded-[1.5rem] border border-[#21d5bf]/20 bg-gradient-to-br from-[#21d5bf]/6 via-white/[0.02] to-[#d5a64a]/10 p-5 md:p-6">
                <p className="text-sm md:text-base font-bold uppercase tracking-[0.22em] text-[#d5a64a]">{content.partnersTitle}</p>
                <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#050505]/70">
                  <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 md:w-28 bg-gradient-to-r from-[#050505] to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 md:w-28 bg-gradient-to-l from-[#050505] to-transparent" />

                  <div className="institution-marquee flex w-max gap-6 px-5 py-5 md:gap-8 md:px-7 md:py-7">
                    {INSTITUTE_SLIDES.map((institute, index) => (
                      <article
                        key={`${institute.id}-${index}`}
                        className="flex min-w-[280px] items-center gap-4 rounded-2xl border border-white/10 bg-[#020202]/90 px-4 py-3 md:min-w-[340px] md:gap-5 md:px-6 md:py-4 shrink-0"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white md:h-20 md:w-20">
                          <Image
                            src={institute.logo}
                            alt={`${institute.name} logo`}
                            fill
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
            </motion.div>
          )}

          <div className={`flex flex-col gap-6 w-full ${minimal ? 'lg:w-1/2' : 'lg:w-full'}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 border border-white/10 bg-white/[0.02] rounded-3xl hover:bg-white/[0.04] transition-colors"
            >
              <h3 className="text-xl font-semibold text-white mb-4">{content.whatWeDoTitle}</h3>
              <div className="space-y-4">
                {WHAT_WE_DO.map((item) => (
                  <div key={item.title} className="rounded-xl border border-white/10 bg-[#050505]/40 p-4">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[#d5a64a] mb-2">{item.title}</h4>
                    <p className="body-copy text-neutral-400 font-light text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>


          </div>
        </div>

        {!minimal && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full relative p-8 md:p-12 border border-[#1dd3b0]/20 bg-gradient-to-br from-[#1dd3b0]/5 to-transparent rounded-3xl overflow-hidden"
          >
            {/* Ambient Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#1dd3b0]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
              {/* Vision Card */}
              <div className="group flex flex-col justify-start rounded-2xl border border-white/5 bg-[#050505]/60 p-8 hover:bg-[#050505]/80 hover:border-[#1dd3b0]/30 transition-all duration-500">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1dd3b0]/10 text-[#1dd3b0] ring-1 ring-inset ring-[#1dd3b0]/20 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 tracking-wide group-hover:text-[#1dd3b0] transition-colors">{content.visionTitle}</h3>
                <p className="body-copy text-neutral-400 font-light text-base group-hover:text-neutral-300 transition-colors">
                  {content.vision}
                </p>
              </div>

              {/* Mission Card */}
              <div className="group flex flex-col justify-start rounded-2xl border border-white/5 bg-[#050505]/60 p-8 hover:bg-[#050505]/80 hover:border-[#d5a64a]/30 transition-all duration-500">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d5a64a]/10 text-[#d5a64a] ring-1 ring-inset ring-[#d5a64a]/20 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 tracking-wide group-hover:text-[#d5a64a] transition-colors">{content.missionTitle}</h3>
                <p className="body-copy text-neutral-400 font-light text-base group-hover:text-neutral-300 transition-colors">
                  {content.mission}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {!minimal && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10"
          >
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d5a64a]">{content.teamEyebrow}</p>
                <h3 className="mt-2 text-2xl md:text-3xl font-semibold text-white">{content.teamTitle}</h3>
              </div>
              <p className="max-w-xl text-sm text-neutral-400 font-light">
                {content.teamDescription}
              </p>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory pb-6 -mx-8 px-8 lg:pb-0 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3 gap-6 hide-scrollbar">
              {LEADERSHIP.map((leader, index) => (
                <motion.article
                  key={leader.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                  className="snap-center shrink-0 w-[80vw] sm:w-[350px] lg:w-auto rounded-2xl border border-white/10 bg-[#050505]/60 p-6 hover:border-[#21d5bf]/45 transition-colors flex flex-col h-full"
                >
                  {leader.image ? (
                    <div className="relative w-full aspect-[4/5] mb-5 overflow-hidden rounded-xl border border-white/10">
                      <Image src={leader.image} alt={leader.name} fill sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center h-11 w-11 rounded-full border border-[#d5a64a]/40 bg-[#d5a64a]/10 text-[#d5a64a] text-sm font-semibold mb-4">
                      {index + 1}
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-semibold text-white">{leader.name}</h4>
                      <p className="mt-1 text-sm font-medium text-[#d5a64a]">{leader.role}</p>
                    </div>
                    {leader.linkedin && (
                      <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[#0077b5] transition-colors shrink-0 pt-1">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                  </div>

                  {leader.company && (
                    <p className="mt-1 text-xs text-neutral-400">{leader.company}</p>
                  )}

                  {leader.education && (
                    <div className="mt-4 space-y-1.5">
                      {leader.education.map((edu, idx) => (
                        <p key={idx} className="text-xs text-neutral-300 font-light flex items-start gap-2">
                          <span className="mt-1 h-1 w-1 rounded-full bg-white/40 shrink-0" />
                          <span>{edu}</span>
                        </p>
                      ))}
                    </div>
                  )}

                  {leader.researchInterests && (
                    <div className="mt-5 pt-4 border-t border-white/10 mt-auto">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1dd3b0] mb-2">{content.researchInterestsLabel}</p>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed">{leader.researchInterests}</p>
                    </div>
                  )}
                </motion.article>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d5a64a]">{content.commitmentTitle}</p>
              <p className="mt-3 text-sm md:text-base text-neutral-300 font-light leading-relaxed">
                {content.commitment}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
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
