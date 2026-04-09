"use client";

import { useEffect, useRef, useState } from "react";
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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const speedFactor = isMobile ? 0.78 : 1;
      const enterY = isMobile ? 16 : 22;
      const exitY = isMobile ? -14 : -20;
      const atomEnterY = isMobile ? 18 : 24;
      const atomExitY = isMobile ? -24 : -32;

      const phases = [humanRef.current, cellRef.current, moleculeRef.current, atomRef.current].filter(
        Boolean,
      );

      gsap.set(phases, {
        autoAlpha: 0,
        y: isMobile ? 14 : 18,
        scale: 0.96,
      });
      gsap.set(humanRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
      });

      if (prefersReducedMotion) {
        if (isMounted) {
          setIsReady(true);
        }
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: isMobile ? "+=2200" : "+=3000",
          scrub: isMobile ? 0.7 : 0.9,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Master ring expansion drives the depth transition.
      tl.fromTo(
        ringRef.current,
        { scale: 0.95, opacity: 0.9, borderWidth: "2px" },
        {
          scale: isMobile ? 26 : 38,
          opacity: 0.12,
          borderWidth: "1px",
          ease: "power1.inOut",
          duration: 12 * speedFactor,
        },
        0,
      );

      // Human phase out.
      tl.to(
        humanRef.current,
        {
          autoAlpha: 0,
          y: isMobile ? -16 : -22,
          scale: isMobile ? 1.08 : 1.13,
          duration: 1.1 * speedFactor,
          ease: "power2.inOut",
        },
        1.4 * speedFactor,
      );

      // Cell phase in then out.
      tl.fromTo(
        cellRef.current,
        { autoAlpha: 0, y: enterY, scale: 0.9 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9 * speedFactor,
          ease: "power2.out",
          immediateRender: false,
        },
        2.3 * speedFactor,
      );
      tl.to(
        cellRef.current,
        {
          autoAlpha: 0,
          y: exitY,
          scale: isMobile ? 1.08 : 1.12,
          duration: 1 * speedFactor,
          ease: "power2.inOut",
        },
        4.4 * speedFactor,
      );

      // Molecule phase in then out.
      tl.fromTo(
        moleculeRef.current,
        { autoAlpha: 0, y: enterY, scale: 0.9 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9 * speedFactor,
          ease: "power2.out",
          immediateRender: false,
        },
        5.35 * speedFactor,
      );
      tl.to(
        moleculeRef.current,
        {
          autoAlpha: 0,
          y: exitY,
          scale: isMobile ? 1.08 : 1.12,
          duration: 1 * speedFactor,
          ease: "power2.inOut",
        },
        7.35 * speedFactor,
      );

      // Atom phase in and release.
      tl.fromTo(
        atomRef.current,
        { autoAlpha: 0, y: atomEnterY, scale: isMobile ? 0.92 : 0.88 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1 * speedFactor,
          ease: "power2.out",
          immediateRender: false,
        },
        8.25 * speedFactor,
      );
      tl.to(
        atomRef.current,
        {
          autoAlpha: 0,
          y: atomExitY,
          duration: 1.1 * speedFactor,
          ease: "power2.in",
        },
        10.9 * speedFactor,
      );

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          if (isMounted) {
            setIsReady(true);
          }
        });
      });
    });

    return () => {
      isMounted = false;
      ctx.revert();
    };
  }, []);

  return (
    <section className="bg-[#050505] w-full">
      <div ref={containerRef} className="relative h-[100svh] md:h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-20 md:h-28 bg-gradient-to-b from-[#030712] via-[#06171f]/75 to-transparent" />
        <div className="pointer-events-none absolute top-0 left-1/2 z-10 h-40 md:h-56 w-[160%] md:w-[125%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(33,213,191,0.2),rgba(213,166,74,0.1)_34%,transparent_66%)] blur-2xl" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent" />

        <div
          className={`pointer-events-none absolute inset-0 z-30 transition-opacity duration-700 ${isReady ? "opacity-0" : "opacity-100"}`}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[#050505]" />
          <div className="absolute inset-0 animate-pulse">
            <div className="absolute top-1/2 left-1/2 h-32 w-32 md:h-44 md:w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/30 shadow-[0_0_40px_rgba(33,213,191,0.2)]" />
            <div className="absolute top-1/2 left-1/2 w-[82%] max-w-[540px] -translate-x-1/2 -translate-y-1/2 px-6">
              <div className="mx-auto h-8 md:h-10 w-3/4 rounded-md bg-white/12" />
              <div className="mx-auto mt-5 h-3 w-2/3 rounded bg-white/10" />
              <div className="mx-auto mt-2 h-3 w-1/2 rounded bg-white/10" />
            </div>
          </div>
        </div>

        {/* Abstract Glowing Ring representing the focal point */}
        <div 
          ref={ringRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-64 md:h-64 rounded-full border border-cyan-500 shadow-[0_0_50px_rgba(33,213,191,0.2)] mix-blend-screen"
        />
        
        {/* Content Layers */}
        <div ref={humanRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 w-full pointer-events-none">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-tight text-white drop-shadow-md">
            CLINICAL<span className="text-cyan-500">.</span>
          </h2>
          <p className="mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-neutral-400 font-light max-w-[20rem] sm:max-w-md tracking-wide">
            Macro-level symptom analysis and traditional diagnostics.
          </p>
        </div>

        <div ref={cellRef} className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 px-4 w-full pointer-events-none">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-tight text-white drop-shadow-md">
            PATHOGEN<span className="text-cyan-500">.</span>
          </h2>
          <p className="mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-neutral-400 font-light max-w-[20rem] sm:max-w-md tracking-wide">
            Cellular anomalies and pathogenic structures. The battleground of early infection.
          </p>
        </div>

        <div ref={moleculeRef} className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 px-4 w-full pointer-events-none">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-tight text-white drop-shadow-md">
            BIOSENSOR<span className="text-purple-500">.</span>
          </h2>
          <p className="mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-neutral-400 font-light max-w-[20rem] sm:max-w-md tracking-wide">
            Targeted biomolecular interactions. Sensing specific proteins and nucleic acids.
          </p>
        </div>

        <div ref={atomRef} className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 px-4 w-full pointer-events-none">
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tighter leading-tight text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-600 glow-cyan">
            QUANTUM<span className="text-white">.</span>
          </h2>
          <p className="mt-3 md:mt-4 text-xs sm:text-sm md:text-lg text-cyan-200/80 font-light max-w-[21rem] sm:max-w-lg tracking-wide drop-shadow-[0_0_10px_rgba(33,213,191,0.3)]">
            Sub-atomic precision. Harnessing quantum effects for an ultra-sensitive limit of detection.
          </p>
        </div>
      </div>
    </section>
  );
}
