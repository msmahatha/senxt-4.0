"use client";

import { FormEvent, useState, useEffect } from "react";
import Image from "next/image";
import { BriefcaseBusiness, Home, ImageIcon, LogOut, Mail, Plus, Save, Trash2, Upload } from "lucide-react";
import type { SiteContent } from "@/lib/site-content";
import type { MediaFile } from "@/lib/media";

type Section = "hero" | "contact" | "careers" | "media" | "applications";

export function AdminPanel({ configured, initialAuthenticated, initialContent, initialMedia }: {
  configured: boolean;
  initialAuthenticated: boolean;
  initialContent: SiteContent | null;
  initialMedia: MediaFile[];
}) {
  const [authenticated, setAuthenticated] = useState(initialAuthenticated);
  const [content, setContent] = useState(initialContent);
  const [section, setSection] = useState<Section>("hero");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [media, setMedia] = useState(initialMedia);

  const login = async (event: FormEvent) => {
    event.preventDefault(); setBusy(true); setStatus("");
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password }) });
    const result = await response.json() as { error?: string };
    if (!response.ok) { setStatus(result.error ?? "Login failed."); setBusy(false); return; }
    const contentResponse = await fetch("/api/admin/content");
    const mediaResponse = await fetch("/api/admin/media");
    setContent(await contentResponse.json() as SiteContent);
    if (mediaResponse.ok) setMedia(await mediaResponse.json() as MediaFile[]);
    setAuthenticated(true); setPassword(""); setBusy(false);
  };

  const save = async () => {
    if (!content) return; setBusy(true); setStatus("");
    const response = await fetch("/api/admin/content", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(content) });
    const result = await response.json() as { error?: string };
    setStatus(response.ok ? "Changes published successfully." : result.error ?? "Save failed."); setBusy(false);
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" }); setAuthenticated(false); setContent(null); setStatus("");
  };

  if (!configured) return <AdminShell><Notice title="Admin setup required">Set DATABASE_URL, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET in your environment, run the database migration, then restart the application.</Notice></AdminShell>;
  if (!authenticated || !content) return (
    <AdminShell>
      <form onSubmit={login} className="mx-auto max-w-md rounded-3xl border border-white/10 bg-[#111a2f] p-8">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">Secure access</p>
        <h1 className="mb-8 text-3xl font-bold">Website administration</h1>
        <label className="mb-5 block"><span className="mb-2 block text-sm font-semibold">Admin password</span><input autoFocus required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="career-input" /></label>
        <button disabled={busy} className="w-full rounded-xl bg-cyan-600 px-5 py-3 font-bold hover:bg-cyan-500 disabled:opacity-50">{busy ? "Signing in…" : "Sign in"}</button>
        {status && <p role="alert" className="mt-4 text-sm text-red-300">{status}</p>}
      </form>
    </AdminShell>
  );

  return (
    <AdminShell>
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">Content manager</p><h1 className="mt-2 text-4xl font-bold">Website administration</h1></div>
        <div className="flex gap-3"><button onClick={logout} className="admin-secondary"><LogOut size={17} />Log out</button><button onClick={save} disabled={busy} className="admin-primary"><Save size={17} />{busy ? "Publishing…" : "Publish changes"}</button></div>
      </div>
      <div className="grid gap-7 lg:grid-cols-[230px_1fr]">
        <nav className="flex gap-2 overflow-x-auto lg:flex-col" aria-label="Admin sections">
          <NavButton active={section === "hero"} onClick={() => setSection("hero")} icon={<Home size={18} />} label="Homepage hero" />
          <NavButton active={section === "contact"} onClick={() => setSection("contact")} icon={<Mail size={18} />} label="Contact page" />
          <NavButton active={section === "careers"} onClick={() => setSection("careers")} icon={<BriefcaseBusiness size={18} />} label="Careers" />
          <NavButton active={section === "media"} onClick={() => setSection("media")} icon={<ImageIcon size={18} />} label="Media library" />
          <NavButton active={section === "applications"} onClick={() => setSection("applications")} icon={<BriefcaseBusiness size={18} />} label="Job Applications" />
        </nav>
        <div className="rounded-3xl border border-white/10 bg-[#111a2f] p-6 sm:p-9">
          {section === "hero" && <HeroEditor content={content} setContent={setContent} />}
          {section === "contact" && <ContactEditor content={content} setContent={setContent} />}
          {section === "careers" && <CareersEditor content={content} setContent={setContent} />}
          {section === "media" && <MediaManager initialFiles={media} onFilesChange={setMedia} />}
          {section === "applications" && <ApplicationsViewer />}
          {status && <p role="status" className={`mt-7 text-sm ${status.includes("successfully") ? "text-cyan-300" : "text-red-300"}`}>{status}</p>}
        </div>
      </div>
    </AdminShell>
  );
}

function HeroEditor({ content, setContent }: EditorProps) {
  const update = (key: keyof SiteContent["hero"], value: string) => setContent({ ...content, hero: { ...content.hero, [key]: value } });
  return <Editor title="Homepage hero"><Input label="Eyebrow" value={content.hero.eyebrow} onChange={(v) => update("eyebrow", v)} /><Input label="Title line one" value={content.hero.titleLineOne} onChange={(v) => update("titleLineOne", v)} /><Input label="Title line two" value={content.hero.titleLineTwo} onChange={(v) => update("titleLineTwo", v)} /><Textarea label="Description" value={content.hero.description} onChange={(v) => update("description", v)} /><div className="grid gap-5 sm:grid-cols-2"><Input label="Button label" value={content.hero.ctaLabel} onChange={(v) => update("ctaLabel", v)} /><Input label="Button link" value={content.hero.ctaHref} onChange={(v) => update("ctaHref", v)} /></div></Editor>;
}

function ContactEditor({ content, setContent }: EditorProps) {
  const contact = content.contact;
  const update = (key: "eyebrow" | "title" | "description" | "hours", value: string) => setContent({ ...content, contact: { ...contact, [key]: value } });
  return <Editor title="Contact page"><Input label="Eyebrow" value={contact.eyebrow} onChange={(v) => update("eyebrow", v)} /><Input label="Heading" value={contact.title} onChange={(v) => update("title", v)} /><Textarea label="Description" value={contact.description} onChange={(v) => update("description", v)} />
    <h3 className="admin-subheading">Contact channels</h3>{contact.channels.map((channel, index) => <div key={index} className="admin-row grid gap-4 sm:grid-cols-3"><Input label="Title" value={channel.title} onChange={(v) => setContent({ ...content, contact: { ...contact, channels: contact.channels.map((item, i) => i === index ? { ...item, title: v } : item) } })} /><Input label="Description" value={channel.description} onChange={(v) => setContent({ ...content, contact: { ...contact, channels: contact.channels.map((item, i) => i === index ? { ...item, description: v } : item) } })} /><Input label="Email" type="email" value={channel.email} onChange={(v) => setContent({ ...content, contact: { ...contact, channels: contact.channels.map((item, i) => i === index ? { ...item, email: v } : item) } })} /></div>)}
    <h3 className="admin-subheading">Locations</h3>{contact.locations.map((location, index) => <div key={index} className="admin-row grid gap-4 sm:grid-cols-2"><Input label="Title" value={location.title} onChange={(v) => setContent({ ...content, contact: { ...contact, locations: contact.locations.map((item, i) => i === index ? { ...item, title: v } : item) } })} /><Textarea label="Address" value={location.address} onChange={(v) => setContent({ ...content, contact: { ...contact, locations: contact.locations.map((item, i) => i === index ? { ...item, address: v } : item) } })} /></div>)}<Input label="Opening hours" value={contact.hours} onChange={(v) => update("hours", v)} /></Editor>;
}

function CareersEditor({ content, setContent }: EditorProps) {
  const careers = content.careers;
  const updateJob = (index: number, key: keyof SiteContent["careers"]["jobs"][number], value: string) => setContent({ ...content, careers: { ...careers, jobs: careers.jobs.map((job, i) => i === index ? { ...job, [key]: value } : job) } });
  return <Editor title="Careers"><Input label="Eyebrow" value={careers.eyebrow} onChange={(v) => setContent({ ...content, careers: { ...careers, eyebrow: v } })} /><Input label="Heading" value={careers.title} onChange={(v) => setContent({ ...content, careers: { ...careers, title: v } })} /><h3 className="admin-subheading">Open positions</h3>{careers.jobs.map((job, index) => <div key={`${job.code}-${index}`} className="admin-row"><div className="grid gap-4 sm:grid-cols-2"><Input label="Job code" value={job.code} onChange={(v) => updateJob(index, "code", v)} /><Input label="Job title" value={job.title} onChange={(v) => updateJob(index, "title", v)} /><Input label="Employment type" value={job.type} onChange={(v) => updateJob(index, "type", v)} /><Input label="Location" value={job.location} onChange={(v) => updateJob(index, "location", v)} /></div><button onClick={() => setContent({ ...content, careers: { ...careers, jobs: careers.jobs.filter((_, i) => i !== index) } })} className="mt-4 inline-flex items-center gap-2 text-sm text-red-300"><Trash2 size={15} />Remove position</button></div>)}<button onClick={() => setContent({ ...content, careers: { ...careers, jobs: [...careers.jobs, { code: "SXT-NEW", title: "New position", type: "Full-time", location: "Remote" }] } })} className="admin-secondary mt-5"><Plus size={17} />Add position</button></Editor>;
}

function MediaManager({ initialFiles, onFilesChange }: { initialFiles: MediaFile[]; onFilesChange: (files: MediaFile[]) => void }) {
  const [files, setFiles] = useState(initialFiles);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const loadFiles = async () => {
    const response = await fetch("/api/admin/media");
    if (response.ok) {
      const next = await response.json() as MediaFile[];
      setFiles(next);
      onFilesChange(next);
    }
  };

  const upload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setMessage("");
    const form = event.currentTarget;
    const response = await fetch("/api/admin/media", { method: "POST", body: new FormData(form) });
    const result = await response.json() as { error?: string };
    setMessage(response.ok ? "Image uploaded to public/uploads." : result.error ?? "Upload failed.");
    if (response.ok) { form.reset(); await loadFiles(); }
    setBusy(false);
  };

  const remove = async (file: MediaFile) => {
    if (!window.confirm(`Delete ${file.name}?`)) return;
    const response = await fetch(`/api/admin/media?name=${encodeURIComponent(file.name)}`, { method: "DELETE" });
    if (response.ok) { const next = files.filter((item) => item.name !== file.name); setFiles(next); onFilesChange(next); setMessage("Image deleted."); }
    else setMessage("Image could not be deleted.");
  };

  return <Editor title="Media library">
    <p className="text-sm text-neutral-400">Images are stored in <code className="text-cyan-300">public/uploads</code> inside this project. Supported formats: JPG, PNG, WebP, AVIF, and GIF up to 10 MB.</p>
    <form onSubmit={upload} className="admin-row flex flex-col gap-4 sm:flex-row sm:items-end"><label className="flex-1"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-400">Choose image</span><input required name="image" type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" className="block w-full text-sm text-neutral-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:px-4 file:py-2 file:font-semibold file:text-white" /></label><button disabled={busy} className="admin-primary"><Upload size={17} />{busy ? "Uploading…" : "Upload"}</button></form>
    {message && <p role="status" className="text-sm text-cyan-300">{message}</p>}
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{files.map((file) => <article key={file.name} className="overflow-hidden rounded-2xl border border-white/10 bg-[#020718]"><div className="relative aspect-video"><Image src={file.url} alt={file.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" /></div><div className="p-4"><p className="truncate text-sm font-semibold" title={file.name}>{file.name}</p><p className="mt-1 text-xs text-neutral-500">{(file.size / 1024).toFixed(1)} KB</p><div className="mt-4 flex gap-3"><button type="button" onClick={() => navigator.clipboard.writeText(file.url)} className="admin-secondary flex-1">Copy URL</button><button type="button" onClick={() => remove(file)} className="rounded-xl border border-red-400/20 px-3 text-red-300 hover:bg-red-400/10" aria-label={`Delete ${file.name}`}><Trash2 size={16} /></button></div></div></article>)}</div>
    {!files.length && <p className="py-8 text-center text-sm text-neutral-500">No uploaded images yet.</p>}
  </Editor>;
}

function ApplicationsViewer() {
  const [applications, setApplications] = useState<any[]>([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/applications")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setApplications(data))
      .catch(() => setError("Failed to load applications."))
      .finally(() => setBusy(false));
  }, []);

  return <Editor title="Job Applications">
    <p className="text-sm text-neutral-400 mb-4">View and download resumes from candidates who have applied for open positions.</p>
    {busy && <p className="text-sm text-cyan-300">Loading applications...</p>}
    {error && <p className="text-sm text-red-300">{error}</p>}
    {!busy && !error && applications.length === 0 && <p className="text-sm text-neutral-500">No applications received yet.</p>}
    
    <div className="grid gap-4 sm:grid-cols-2">
      {applications.map((app) => (
        <article key={app.id} className="rounded-2xl border border-white/10 bg-[#020718] p-5">
          <h3 className="font-bold text-lg mb-1">{app.name}</h3>
          <p className="text-xs font-semibold text-cyan-400 mb-4 uppercase tracking-wider">{app.job}</p>
          <div className="space-y-2 text-sm text-neutral-300 mb-5">
            <p><span className="text-neutral-500 mr-2">Email:</span><a href={`mailto:${app.email}`} className="hover:text-cyan-300">{app.email}</a></p>
            <p><span className="text-neutral-500 mr-2">Phone:</span>{app.phone}</p>
            <p><span className="text-neutral-500 mr-2">Applied:</span>{new Date(app.createdAt).toLocaleDateString()}</p>
          </div>
          <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="admin-secondary block text-center">Download Resume</a>
        </article>
      ))}
    </div>
  </Editor>;
}


type EditorProps = { content: SiteContent; setContent: (content: SiteContent) => void };
function AdminShell({ children }: { children: React.ReactNode }) { return <main className="min-h-screen bg-[#020718] px-5 pb-24 pt-36 text-white sm:px-8"><div className="mx-auto max-w-7xl">{children}</div></main>; }
function Editor({ title, children }: { title: string; children: React.ReactNode }) { return <section><h2 className="mb-7 text-2xl font-bold">{title}</h2><div className="space-y-5">{children}</div></section>; }
function Notice({ title, children }: { title: string; children: React.ReactNode }) { return <div className="mx-auto max-w-xl rounded-3xl border border-amber-400/20 bg-amber-400/5 p-8"><h1 className="mb-3 text-2xl font-bold">{title}</h1><p className="text-neutral-300">{children}</p></div>; }
function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) { return <button onClick={onClick} className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold ${active ? "bg-cyan-600 text-white" : "text-neutral-300 hover:bg-white/5"}`}>{icon}{label}</button>; }
function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) { return <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-400">{label}</span><input required type={type} value={value} onChange={(e) => onChange(e.target.value)} className="career-input" /></label>; }
function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-400">{label}</span><textarea required rows={3} value={value} onChange={(e) => onChange(e.target.value)} className="career-input resize-y" /></label>; }
