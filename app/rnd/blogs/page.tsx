"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

import { BLOGS } from "@/data/blogs";

export default function BlogsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".blog-card", 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.2, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
            Insights & <span className="text-purple-500">Updates</span>
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl font-light">
            Thoughts from our engineering and research teams on the bleeding edge of deep-tech and medical hardware.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOGS.map((blog, index) => (
            <Link href={`/rnd/blogs/${blog.slug}`} key={index} className="blog-card group cursor-none h-full flex flex-col">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-neutral-900">
                {/* Fallback gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${blog.gradient} opacity-80 group-hover:scale-110 transition-transform duration-700`} />
                
                {/* Actual image */}
                <div 
                  className="absolute inset-0 bg-contain bg-no-repeat bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url('/blogs/${blog.slug}.jpg')` }}
                />
                
                <div className="absolute top-4 left-4">
                  <span className="bg-black/50 backdrop-blur-md border border-white/10 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {blog.category}
                  </span>
                </div>
              </div>
              
              <div className="flex-grow flex flex-col">
                <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">
                  <span>{blog.date}</span>
                  <span className="w-1 h-1 rounded-full bg-neutral-700" />
                  <span>{blog.readTime}</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                  {blog.title}
                </h2>
                
                <p className="text-neutral-400 font-light leading-relaxed mb-6 line-clamp-3">
                  {blog.excerpt}
                </p>
                
                <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-white group-hover:text-purple-400 transition-colors">
                  Read Article
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
