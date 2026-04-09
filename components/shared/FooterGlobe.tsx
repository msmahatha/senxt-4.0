"use client";

import { Globe } from "@/components/ui/component";

const markers = [
  { id: "sf", location: [37.7595, -122.4367] as [number, number], label: "San Francisco" },
  { id: "nyc", location: [40.7128, -74.006] as [number, number], label: "New York" },
  { id: "canada", location: [56.1304, -106.3468] as [number, number], label: "Canada" },
  { id: "tokyo", location: [35.6762, 139.6503] as [number, number], label: "Tokyo" },
  { id: "london", location: [51.5074, -0.1278] as [number, number], label: "London" },
  { id: "sydney", location: [-33.8688, 151.2093] as [number, number], label: "Sydney" },
  { id: "capetown", location: [-33.9249, 18.4241] as [number, number], label: "Cape Town" },
  { id: "dubai", location: [25.2048, 55.2708] as [number, number], label: "Dubai" },
  { id: "kolkata", location: [22.5726, 88.3639] as [number, number], label: "Kolkata" },
  { id: "paris", location: [48.8566, 2.3522] as [number, number], label: "Paris" },
  { id: "saopaulo", location: [-23.5505, -46.6333] as [number, number], label: "Sao Paulo" },
];

const arcs = [
  {
    id: "sf-tokyo",
    from: [37.7595, -122.4367] as [number, number],
    to: [35.6762, 139.6503] as [number, number],
    label: "SF to Tokyo",
  },
  {
    id: "nyc-london",
    from: [40.7128, -74.006] as [number, number],
    to: [51.5074, -0.1278] as [number, number],
    label: "NYC to London",
  },
];

export function FooterGlobe() {
  return (
    <section className="relative mx-auto mb-20 w-full max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-br from-[#21d5bf]/10 via-[#050505] to-[#d5a64a]/10 px-6 py-10 md:px-10">
      <div className="mb-7 text-center">
        <p className="text-[11px] font-bold tracking-[0.2em] text-[#d5a64a] uppercase">Global Presence</p>
        <h3 className="mt-2 text-2xl md:text-3xl font-semibold text-white">Sense-XT Research Network</h3>
      </div>

      <div className="mx-auto w-full max-w-md">
        <Globe
          markers={markers}
          arcs={arcs}
          markerColor={[0.129, 0.835, 0.749]}
          baseColor={[0.03, 0.11, 0.14]}
          arcColor={[0.835, 0.651, 0.29]}
          glowColor={[0.129, 0.835, 0.749]}
          dark={1}
          mapBrightness={10}
          markerSize={0.025}
          markerElevation={0.01}
        />
      </div>
    </section>
  );
}
