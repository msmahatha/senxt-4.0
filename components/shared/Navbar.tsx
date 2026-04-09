"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileInsightOpen, setIsMobileInsightOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileInsightOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Trigger glassmorphism after scrolling past 50px from the hero section
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Calculate scroll progress percentage
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to check initial scroll position
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div 
        className="fixed top-0 left-0 h-[2px] bg-cyan-400 shadow-[0_0_10px_rgba(33,213,191,0.8)] z-[60] transition-all duration-150 ease-out" 
        style={{ width: `${scrollProgress}%` }}
      />
      <nav 
        className={`fixed left-0 right-0 w-full z-50 transition-all duration-500 flex justify-center ${
          isScrolled ? "top-3 sm:top-4 px-3 sm:px-6" : "top-0 px-4 sm:px-6 lg:px-8 py-4 sm:py-6"
        }`}
      >
        <div 
          className={`w-full max-w-7xl flex items-center justify-between transition-all duration-500 ${
            isScrolled 
              ? "bg-[#050505]/70 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/50 rounded-2xl px-4 sm:px-6 py-3" 
              : "bg-transparent border border-transparent px-0 py-0"
          }`}
        >
          <Link href="/" className="flex items-center gap-3 group relative cursor-none z-50">
            <div className={`relative overflow-hidden group-hover:scale-105 transition-all duration-500 ${isScrolled ? 'w-[120px] sm:w-[150px]' : 'w-[140px] sm:w-[160px]'}`}>
              <Image
                src="/logo.png"
                alt="Sense-XT Logo"
                width={180}
                height={54}
                className="object-contain w-full h-auto"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-wrap items-center gap-4 lg:gap-6 text-xs lg:text-sm font-medium tracking-widest uppercase text-white/70">
            <Link href="/" className="hover:text-cyan-400 transition-colors cursor-none">Home</Link>
            <Link href="/rnd" className="hover:text-cyan-400 transition-colors cursor-none">R&D</Link>
            <Link href="/product" className="hover:text-cyan-400 transition-colors cursor-none">Product</Link>

            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors cursor-none"
                aria-haspopup="menu"
              >
                <span className="uppercase font-bold tracking-widest">INSIGHT</span>
                <span className="text-[10px] text-cyan-400 transition-transform duration-300 group-hover:rotate-180">▼</span>
              </button>

              <div className="pointer-events-none absolute left-1/2 top-full mt-3 w-52 -translate-x-1/2 rounded-xl border border-white/10 bg-[#050505]/95 p-2 opacity-0 shadow-lg shadow-black/60 backdrop-blur-xl transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                <Link href="/about" className="block rounded-lg px-3 py-2 text-xs text-white/80 hover:bg-cyan-500/15 hover:text-cyan-300 transition-colors cursor-none">About</Link>
                <Link href="/publications" className="block rounded-lg px-3 py-2 text-xs text-white/80 hover:bg-cyan-500/15 hover:text-cyan-300 transition-colors cursor-none">Publications</Link>
                <Link href="/blogs" className="block rounded-lg px-3 py-2 text-xs text-white/80 hover:bg-cyan-500/15 hover:text-cyan-300 transition-colors cursor-none">Blogs</Link>
              </div>
            </div>

            <Link href="/career" className="hover:text-cyan-400 transition-colors cursor-none">Career</Link>
            <Link href="/contact" className="border border-blue-500/70 bg-blue-500/10 px-4 py-2 flex items-center gap-2 rounded-full text-blue-400 hover:bg-blue-500/20 transition-colors cursor-none">Contact</Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="lg:hidden flex flex-col items-center justify-center gap-1.5 p-2 rounded-full hover:bg-white/5 transition-colors cursor-none z-50 relative"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              if (isMobileMenuOpen) {
                setIsMobileInsightOpen(false);
              }
            }}
            aria-label="Toggle Menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 origin-center ${isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 origin-center ${isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-6 text-xl font-bold tracking-widest uppercase text-white/80">
          <Link onClick={closeMobileMenu} href="/" className="hover:text-cyan-400 transition-colors cursor-none">Home</Link>
          <Link onClick={closeMobileMenu} href="/rnd" className="hover:text-cyan-400 transition-colors cursor-none">R&D</Link>
          <Link onClick={closeMobileMenu} href="/product" className="hover:text-cyan-400 transition-colors cursor-none">Product</Link>

          <div className="w-full max-w-xs rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
            <button
              type="button"
              onClick={() => setIsMobileInsightOpen((prev) => !prev)}
              className="flex w-full items-center justify-between text-sm font-semibold uppercase tracking-widest text-white/80 hover:text-cyan-300 transition-colors"
            >
              <span className="uppercase font-bold tracking-widest">INSIGHT</span>
              <span className={`text-xs text-cyan-400 transition-transform duration-300 ${isMobileInsightOpen ? "rotate-180" : ""}`}>▼</span>
            </button>

            <div className={`grid overflow-hidden transition-all duration-300 ${isMobileInsightOpen ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr] mt-0"}`}>
              <div className="min-h-0">
                <div className="flex flex-col gap-2 border-t border-white/10 pt-3">
                  <Link onClick={closeMobileMenu} href="/about" className="rounded-lg px-3 py-2 text-sm font-medium text-white/70 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors cursor-none">About</Link>
                  <Link onClick={closeMobileMenu} href="/publications" className="rounded-lg px-3 py-2 text-sm font-medium text-white/70 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors cursor-none">Publications</Link>
                  <Link onClick={closeMobileMenu} href="/blogs" className="rounded-lg px-3 py-2 text-sm font-medium text-white/70 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors cursor-none">Blogs</Link>
                </div>
              </div>
            </div>
          </div>

          <Link onClick={closeMobileMenu} href="/career" className="hover:text-cyan-400 transition-colors cursor-none">Career</Link>
          <Link onClick={closeMobileMenu} href="/contact" className="text-blue-400 border border-blue-500 px-8 py-3 rounded-full hover:bg-blue-500/10 transition-colors cursor-none">Contact</Link>
        </div>
      </div>
    </>
  );
}
