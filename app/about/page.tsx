import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Sense-XT Innovations Private Limited is a DPIIT approved deep-tech startup building at the intersection of quantum technology, nanotechnology, and artificial intelligence.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Who We Are</span>
        </h1>
        <p className="text-xl text-neutral-400 font-light max-w-3xl leading-relaxed">
          Sense-XT Innovations Private Limited is a DPIIT approved deep-tech startup building next-generation solutions at the intersection of Quantum Technology, Nanotechnology, and Artificial Intelligence. Our work focuses on translating advanced scientific research into real-world sensing and diagnostic technologies, aligned with India&apos;s vision under the National Quantum Mission.
        </p>
      </div>
      
      <div className="mt-8">
        <AboutSection />
      </div>
    </div>
  );
}
