import Link from "next/link";

const PUBLICATIONS = [
  {
    title: "Quantum-Enhanced Biosensing for Ultra-Early Disease Detection",
    authors: "Dr. A. Sharma, et al.",
    journal: "Nature Nanotechnology",
    year: "2025",
    abstract: "This paper demonstrates a novel limit of detection paradigm utilizing quantum tunneling effects in 2D material biosensors, achieving a 100x improvement in sensitivity.",
    doi: "10.1038/s41565-025-0000-1"
  },
  {
    title: "Scalable Fabrication of Graphene Field-Effect Transistors",
    authors: "Dr. J. Doe, Dr. A. Sharma",
    journal: "Advanced Materials",
    year: "2024",
    abstract: "We outline a pioneering methodology for the roll-to-roll production of graphene FET arrays without compromising electrical mobility or structural integrity.",
    doi: "10.1002/adma.202400002"
  },
  {
    title: "Multiplexed Pathogen Detection via Opto-Electronic Micro-Arrays",
    authors: "S. Lee, et al.",
    journal: "Biosensors and Bioelectronics",
    year: "2024",
    abstract: "A comprehensive analysis of multi-pathogen identification in under 15 minutes using an integrated opto-electronic microarray framework.",
    doi: "10.1016/j.bios.2024.100003"
  }
];

export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
            Our <span className="text-cyan-500">Publications</span>
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl font-light">
            Peer-reviewed research and scientific breakthroughs driving the core technology at Sense-XT.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {PUBLICATIONS.map((pub, index) => (
            <div key={pub.doi} className="reveal-card group relative p-8 md:p-10 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 overflow-hidden" style={{ "--reveal-index": index } as React.CSSProperties}>
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm font-medium text-cyan-400 mb-4">
                  <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full">{pub.journal}</span>
                  <span className="text-neutral-500">{pub.year}</span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-semibold mb-3 group-hover:text-cyan-300 transition-colors">
                  {pub.title}
                </h2>
                
                <p className="text-neutral-300 font-medium mb-4">
                  {pub.authors}
                </p>
                
                <p className="text-neutral-400 font-light leading-relaxed mb-6">
                  {pub.abstract}
                </p>
                
                <Link 
                  href={`https://doi.org/${pub.doi}`}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-white hover:text-cyan-400 transition-colors cursor-none"
                >
                  Read Paper
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
