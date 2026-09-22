import { getSiteContent } from "@/lib/site-content";

export async function LegalPage({ name }: { name: "terms-and-conditions" | "privacy-policy" | "refund-and-cancellation" }) {
  const content = (await getSiteContent()).legal[name];
  return <main className="min-h-screen bg-[#050505] px-6 pb-24 pt-32 text-white"><article className="mx-auto max-w-4xl"><h1 className="mb-10 text-4xl font-bold tracking-tight md:text-5xl">{content.title}</h1><div className="space-y-6">{content.blocks.map((block, index) => block.kind === "h2" ? <h2 key={index} className="pt-5 text-2xl font-semibold">{block.text}</h2> : block.kind === "li" ? <ul key={index} className="list-disc pl-6 text-neutral-300"><li>{block.text}</li></ul> : <p key={index} className="body-copy text-lg font-light text-neutral-300">{block.text}</p>)}</div></article></main>;
}
