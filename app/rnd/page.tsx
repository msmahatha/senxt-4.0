import type { Metadata } from "next";
import { RNDResourcesSection } from "@/components/sections/RNDResourcesSection";

export const metadata: Metadata = {
  title: "Research & Development",
  description:
    "Explore Sense-XT's R&D wing: high-precision electrochemical biosensors, quantum fluorescence nanodiamonds, and AI-powered ultra-early viral tracking.",
};

export default function RNDPage() {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-0">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 uppercase">
          Research & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Development</span>
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 font-light max-w-3xl leading-relaxed">
          Advancing the frontiers of quantum healthcare.
        </p>
      </div>

      <RNDResourcesSection />
    </div>
  );
}
