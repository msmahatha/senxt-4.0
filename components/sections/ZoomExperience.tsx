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
          end: "+=2500",
          scrub: 1,
          pin: true,
        },
      });

      // Ring scaling master animation
      tl.to(ringRef.current, {
        scale: 40,
        opacity: 0.1,
        borderWidth: "1px",
        ease: "power2.inOut",
        duration: 10,
      }, 0);

      // Human Phase
      tl.to(humanRef.current, { opacity: 0, scale: 2, duration: 2 }, 1);

      // Cell Phase
      tl.fromTo(cellRef.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 2 }, 2);
      tl.to(cellRef.current, { opacity: 0, scale: 2, duration: 2 }, 4);

      // Molecule Phase
      tl.fromTo(moleculeRef.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 2 }, 5);
      tl.to(moleculeRef.current, { opacity: 0, scale: 2, duration: 2 }, 7);

      // Atom Phase
      tl.fromTo(atomRef.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 2 }, 8);
      // Wait a bit before releasing pin
      tl.to(atomRef.current, { opacity: 0, y: -50, duration: 1 }, 10);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#050505] w-full">
      <div ref={containerRef} className="relative h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center">
        {/* Abstract Glowing Ring representing the focal point */}
        <div 
          ref={ringRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-64 md:h-64 rounded-full border border-cyan-500 shadow-[0_0_50px_rgba(0,240,255,0.2)] mix-blend-screen"
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
          <p className="mt-4 text-sm md:text-lg text-cyan-200/80 font-light max-w-lg tracking-wide drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">
            Sub-atomic precision. Harnessing quantum effects for an ultra-sensitive limit of detection.
          </p>
        </div>
      </div>
    </section>
  );
}