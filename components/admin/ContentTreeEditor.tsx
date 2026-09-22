"use client";

import Image from "next/image";
import type { MediaFile } from "@/lib/media";

type Value = string | Value[] | { [key: string]: Value };
const labelFor = (key: string) => key.replace(/([A-Z])/g, " $1").replace(/[-_]/g, " ").replace(/^./, (s) => s.toUpperCase());

export function ContentTreeEditor({ value, template, onChange, media, name = "Content" }: {
  value: unknown; template: unknown; onChange: (value: unknown) => void; media: MediaFile[]; name?: string;
}) {
  return <TreeField value={value as Value} template={template as Value} onChange={onChange} media={media} name={name} />;
}

function TreeField({ value, template, onChange, media, name }: { value: Value; template: Value; onChange: (value: Value) => void; media: MediaFile[]; name: string }) {
  if (typeof value === "string") {
    if (name === "kind") return <label className="block"><span className="mb-2 block text-xs font-bold text-neutral-400">Block type</span><select className="career-input" value={value} onChange={(event) => onChange(event.target.value)}><option value="h2">Section heading</option><option value="p">Paragraph</option><option value="li">Bullet point</option></select></label>;
    if (name === "status") return <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-400">Status</span><select className="career-input" value={value} onChange={(event) => onChange(event.target.value)}><option value="Available">Available</option><option value="Upcoming">Upcoming</option></select></label>;
    const isImage = /^(image|logo|bgImage|background|socialImage)$/i.test(name);
    return <label className="block space-y-2"><span className="block text-xs font-bold uppercase tracking-wider text-neutral-400">{labelFor(name)}</span>
      {name === "doi" && <span className="block text-xs text-neutral-400">Enter a verified DOI (for example, 10.1234/example). Leave blank to hide the paper link.</span>}
      {name === "url" && <span className="block text-xs text-neutral-400">Enter your full company profile URL. Leave blank to hide this social link.</span>}
      {isImage && value && <span className="relative block h-24 w-32 overflow-hidden rounded-lg border border-white/10"><Image src={value} alt="Selected image preview" fill sizes="128px" className="object-contain" /></span>}
      {isImage && <select aria-label={`Choose ${labelFor(name)}`} className="career-input" value={media.some((file) => file.url === value) ? value : ""} onChange={(event) => onChange(event.target.value)}><option value="">Choose a project image…</option>{media.map((file) => <option key={file.url} value={file.url}>{file.url}</option>)}</select>}
      {value.length > 120 || /description|abstract|address|mission|vision|commitment|text|excerpt|paragraph/i.test(name)
        ? <textarea rows={4} className="career-input resize-y" value={value} onChange={(event) => onChange(event.target.value)} />
        : <input className="career-input" value={value} onChange={(event) => onChange(event.target.value)} />}
    </label>;
  }

  if (Array.isArray(value)) {
    const sample = Array.isArray(template) ? template[0] : "";
    const add = () => {
      const item = structuredClone(sample ?? "");
      if (item && typeof item === "object" && !Array.isArray(item)) {
        const suffix = Date.now().toString(36);
        if ("slug" in item) item.slug = `new-blog-${suffix}`;
        if ("id" in item) item.id = `new-${suffix}`;
        if ("code" in item) item.code = `SXT-${suffix}`;
        if ("title" in item) item.title = "New item";
        if ("name" in item) item.name = "New item";
      }
      onChange([...value, item]);
    };
    const move = (index: number, offset: number) => { const next = [...value]; [next[index], next[index + offset]] = [next[index + offset], next[index]]; onChange(next); };
    return <div className="space-y-4"><h3 className="admin-subheading">{labelFor(name)} <span className="text-neutral-500">({value.length})</span></h3>{value.map((item, index) => {
      const title = typeof item === "object" && !Array.isArray(item) ? item.title || item.name || item.label || item.code : `Item ${index + 1}`;
      return <details key={index} className="admin-row"><summary className="cursor-pointer font-semibold">{typeof title === "string" ? title : `Item ${index + 1}`}</summary><div className="mt-5 space-y-5"><TreeField value={item} template={sample} onChange={(next) => onChange(value.map((entry, i) => i === index ? next : entry))} media={media} name={typeof item === "string" ? "Paragraph" : "Item"} /><div className="flex flex-wrap gap-3"><button type="button" disabled={index === 0} onClick={() => move(index, -1)} className="admin-secondary disabled:opacity-30">Move up</button><button type="button" disabled={index === value.length - 1} onClick={() => move(index, 1)} className="admin-secondary disabled:opacity-30">Move down</button><button type="button" onClick={() => onChange(value.filter((_, i) => i !== index))} className="admin-secondary text-red-300">Remove</button></div></div></details>;
    })}<button type="button" onClick={add} className="admin-secondary">+ Add {labelFor(name)}</button></div>;
  }

  return <div className="space-y-5">{Object.entries(value).map(([key, item]) => <TreeField key={key} name={key} value={item} template={typeof template === "object" && !Array.isArray(template) ? template[key] : item} media={media} onChange={(next) => onChange({ ...value, [key]: next })} />)}</div>;
}
