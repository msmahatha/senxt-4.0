"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ZoomExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const humanRef = useRef<HTMLDivElement>(null);
  const cellRef = useRef<HTMLDivElement>(null);
  const moleculeRef = useRef<HTMLDivElement>(null);
  const atomRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2800",
          scrub: 1.2,
          pin: true,
        },
      });

      // Master ring expansion drives the depth transition.
      tl.to(ringRef.current, {
        scale: 42,
        opacity: 0.1,
        borderWidth: "1px",
        ease: "power2.inOut",
        duration: 12,
      }, 0);

      // Keep each phase overlapping slightly so the transition never feels empty.
      tl.to(humanRef.current, { opacity: 0, y: -20, scale: 1.45, duration: 2.1, ease: "power2.inOut" }, 1.8);

      // Cell Phase
      tl.fromTo(cellRef.current, { opacity: 0, y: 24, scale: 0.84 }, { opacity: 1, y: 0, scale: 1, duration: 1.8, ease: "power2.out" }, 1.3);
      tl.to(cellRef.current, { opacity: 0, y: -16, scale: 1.45, duration: 2, ease: "power2.inOut" }, 3.9);

      // Molecule Phase
      tl.fromTo(moleculeRef.current, { opacity: 0, y: 24, scale: 0.84 }, { opacity: 1, y: 0, scale: 1, duration: 1.8, ease: "power2.out" }, 3.4);
      tl.to(moleculeRef.current, { opacity: 0, y: -16, scale: 1.42, duration: 2, ease: "power2.inOut" }, 6);

      // Atom Phase
      tl.fromTo(atomRef.current, { opacity: 0, y: 30, scale: 0.82 }, { opacity: 1, y: 0, scale: 1, duration: 2, ease: "power2.out" }, 5.9);
      // Wait a bit before releasing pin
      tl.to(atomRef.current, { opacity: 0, y: -42, duration: 1.3, ease: "power2.in" }, 9.4);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#050505] w-full">
      <div ref={containerRef} className="relative h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-28 bg-gradient-to-b from-[#030712] via-[#06171f]/75 to-transparent" />
        <div className="pointer-events-none absolute top-0 left-1/2 z-10 h-56 w-[125%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(33,213,191,0.2),rgba(213,166,74,0.1)_34%,transparent_66%)] blur-2xl" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent" />

        {/* Abstract Glowing Ring representing the focal point */}
        <div 
          ref={ringRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-64 md:h-64 rounded-full border border-cyan-500 shadow-[0_0_50px_rgba(33,213,191,0.2)] mix-blend-screen"
        />
        
        {/* Content Layers */}
        <div ref={humanRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 w-full pointer-events-none">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md">
            CLINICAL<span className="text-cyan-500">.</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-neutral-400 font-light max-w-md tracking-wide">
            Macro-level symptom analysis and traditional diagnostics.
          </p>
        </div>

        <div ref={cellRef} className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 px-4 w-full pointer-events-none">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md">
            PATHOGEN<span className="text-cyan-500">.</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-neutral-400 font-light max-w-md tracking-wide">
            Cellular anomalies and pathogenic structures. The battleground of early infection.
          </p>
        </div>

        <div ref={moleculeRef} className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 px-4 w-full pointer-events-none">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md">
            BIOSENSOR<span className="text-purple-500">.</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-neutral-400 font-light max-w-md tracking-wide">
            Targeted biomolecular interactions. Sensing specific proteins and nucleic acids.
          </p>
        </div>

        <div ref={atomRef} className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 px-4 w-full pointer-events-none">
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-600 glow-cyan">
            QUANTUM<span className="text-white">.</span>
          </h2>
          <p className="mt-4 text-sm md:text-lg text-cyan-200/80 font-light max-w-lg tracking-wide drop-shadow-[0_0_10px_rgba(33,213,191,0.3)]">
            Sub-atomic precision. Harnessing quantum effects for an ultra-sensitive limit of detection.
          </p>
        </div>
      </div>
    </section>
  );
}
