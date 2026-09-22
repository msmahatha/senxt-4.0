import Image from "next/image";
import type { SiteContent } from "@/lib/site-content";

export function InnovationsSection({ content }: { content: SiteContent["products"] }) {
  return <section id="product" className="relative w-full overflow-hidden border-t border-white/5 bg-[#050505] py-24">
    <header className="mx-auto mb-16 max-w-7xl px-6 text-center"><p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">{content.eyebrow}</p><h2 className="whitespace-pre-line text-4xl font-bold leading-tight tracking-tight md:text-6xl">{content.title}</h2></header>
    <div className="mx-auto grid max-w-5xl gap-8 px-6 md:grid-cols-2">{content.items.map((product, index) => <article key={index} className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0d1117] p-8 md:p-10">
      {product.background && <Image src={product.background} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="pointer-events-none object-cover opacity-15" />}
      <div className="relative z-10"><div className="mb-8 flex items-start justify-between">{product.image && <Image src={product.image} alt={product.title} width={48} height={48} className="h-12 w-12 rounded-full object-contain" />}<span className="rounded-full bg-cyan-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">{product.status}</span></div><h3 className="mb-4 text-3xl font-bold">{product.title}</h3><p className="body-copy mb-10 text-sm text-neutral-400">{product.description}</p></div>
      <div className="relative z-10 mt-10 rounded-xl border border-white/10 bg-black/40 p-5"><p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500">{content.applicationLabel}</p><p className="text-sm">{product.application}</p></div>
    </article>)}</div>
  </section>;
}
