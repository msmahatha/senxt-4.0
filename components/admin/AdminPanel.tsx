"use client";

import { FormEvent, useState, useEffect } from "react";
import Image from "next/image";
import { BriefcaseBusiness, Home, ImageIcon, LogOut, Mail, Save, Trash2, Upload } from "lucide-react";
import type { SiteContent } from "@/lib/site-content";
import type { MediaFile } from "@/lib/media";
import type { JobApplication } from "@/lib/applications";
import cmsDefaults from "@/data/cms-defaults.json";
import baseDefaults from "@/data/site-content.json";
import { ContentTreeEditor } from "./ContentTreeEditor";

type Section = "hero" | "contact" | "careers" | "media" | "applications" | keyof typeof cmsDefaults | "partners" | "team";

export function AdminPanel({ configured, notificationsConfigured, initialAuthenticated, initialContent, initialMedia }: {
  configured: boolean;
  notificationsConfigured: boolean;
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
    try {
      await adminJson("/api/admin/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password }) });
      const next = await adminJson("/api/admin/content") as SiteContent;
      const images = await adminJson("/api/admin/media") as MediaFile[];
      setContent(next); setMedia(images); setAuthenticated(true); setPassword("");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Login failed."); }
    finally { setBusy(false); }
  };

  const save = async () => {
    if (!content) return; setBusy(true); setStatus("");
    try {
      await adminJson("/api/admin/content", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(content) });
      setStatus("Changes published successfully.");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Save failed."); }
    finally { setBusy(false); }
  };

  const logout = async () => {
    try { await adminJson("/api/admin/logout", { method: "POST" }); setAuthenticated(false); setContent(null); setStatus(""); }
    catch { setStatus("Logout failed. Please try again."); }
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
          <NavButton active={section === "about"} onClick={() => setSection("about")} icon={<Home size={18} />} label="About page" />
          <NavButton active={section === "partners"} onClick={() => setSection("partners")} icon={<Home size={18} />} label="Collaboration logos & names" />
          <NavButton active={section === "team"} onClick={() => setSection("team")} icon={<Home size={18} />} label="Team" />
          <NavButton active={section === "overview"} onClick={() => setSection("overview")} icon={<Home size={18} />} label="Research overview" />
          <NavButton active={section === "products"} onClick={() => setSection("products")} icon={<Home size={18} />} label="Product cards" />
          <NavButton active={section === "rnd"} onClick={() => setSection("rnd")} icon={<Home size={18} />} label="Patents & R&D" />
          <NavButton active={section === "blogs"} onClick={() => setSection("blogs")} icon={<Home size={18} />} label="Blogs" />
          <NavButton active={section === "publications"} onClick={() => setSection("publications")} icon={<Home size={18} />} label="Publications" />
          <NavButton active={section === "legal"} onClick={() => setSection("legal")} icon={<Home size={18} />} label="Legal pages" />
          <NavButton active={section === "headers"} onClick={() => setSection("headers")} icon={<Home size={18} />} label="Page headings" />
          <NavButton active={section === "zoom"} onClick={() => setSection("zoom")} icon={<Home size={18} />} label="Homepage zoom" />
          <NavButton active={section === "settings"} onClick={() => setSection("settings")} icon={<Home size={18} />} label="Navigation, footer & SEO" />
          <NavButton active={section === "applications"} onClick={() => setSection("applications")} icon={<BriefcaseBusiness size={18} />} label="Job Applications" />
        </nav>
        <div className="rounded-3xl border border-white/10 bg-[#111a2f] p-6 sm:p-9">
          {section === "hero" && <HeroEditor content={content} setContent={setContent} />}

          {section !== "hero" && section !== "media" && section !== "applications" && <ManagedEditor section={section} content={content} setContent={setContent} media={media} />}
          {section === "media" && <MediaManager initialFiles={media} onFilesChange={setMedia} />}
          {section === "applications" && <ApplicationsViewer notificationsConfigured={notificationsConfigured} />}
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
    try {
      await adminJson("/api/admin/media", { method: "POST", body: new FormData(form) });
      setMessage("Image uploaded to public/uploads."); form.reset(); await loadFiles();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Upload failed."); }
    finally { setBusy(false); }
  };

  const remove = async (file: MediaFile) => {
    if (!window.confirm(`Delete ${file.name}?`)) return;
    const response = await fetch(`/api/admin/media?name=${encodeURIComponent(file.name)}`, { method: "DELETE" });
    if (response.ok) { const next = files.filter((item) => item.name !== file.name); setFiles(next); onFilesChange(next); setMessage("Image deleted."); }
    else { const result = await response.json() as { error?: string }; setMessage(result.error ?? "Image could not be deleted."); }
  };

  return <Editor title="Media library">
    <p className="text-sm text-neutral-400">Images are stored in <code className="text-cyan-300">public/uploads</code> inside this project. Supported formats: JPG, PNG, WebP, AVIF, and GIF up to 10 MB.</p>
    <form onSubmit={upload} className="admin-row flex flex-col gap-4 sm:flex-row sm:items-end"><label className="flex-1"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-400">Choose image</span><input required name="image" type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" className="block w-full text-sm text-neutral-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:px-4 file:py-2 file:font-semibold file:text-white" /></label><button disabled={busy} className="admin-primary"><Upload size={17} />{busy ? "Uploading…" : "Upload"}</button></form>
    {message && <p role="status" className="text-sm text-cyan-300">{message}</p>}
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{files.map((file) => <article key={file.name} className="overflow-hidden rounded-2xl border border-white/10 bg-[#020718]"><div className="relative aspect-video"><Image src={file.url} alt={file.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" /></div><div className="p-4"><p className="truncate text-sm font-semibold" title={file.name}>{file.name}</p><p className="mt-1 text-xs text-neutral-500">{(file.size / 1024).toFixed(1)} KB</p><div className="mt-4 flex gap-3"><button type="button" onClick={() => navigator.clipboard.writeText(file.url)} className="admin-secondary flex-1">Copy URL</button>{file.url.startsWith("/uploads/") && <button type="button" onClick={() => remove(file)} className="rounded-xl border border-red-400/20 px-3 text-red-300 hover:bg-red-400/10" aria-label={`Delete ${file.name}`}><Trash2 size={16} /></button>}</div></div></article>)}</div>
    {!files.length && <p className="py-8 text-center text-sm text-neutral-500">No uploaded images yet.</p>}
  </Editor>;
}

function ApplicationsViewer({ notificationsConfigured }: { notificationsConfigured: boolean }) {
  const [applications, setApplications] = useState<JobApplication[]>([]);
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
    <p className="text-sm text-neutral-400 mb-4">{notificationsConfigured ? "External application notifications are configured. Delivery depends on your notification provider." : "Applications are saved here. External notifications are not enabled; check this panel for new submissions."}</p>
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



function ManagedEditor({ section, content, setContent, media }: EditorProps & { section: Exclude<Section, "hero" | "media" | "applications">; media: MediaFile[] }) {
  const defaults = { ...cmsDefaults, ...baseDefaults };
  if (section === "partners" || section === "team") {
    return <Editor title={section === "partners" ? "Partners & collaborators" : "Team members"}><ContentTreeEditor name={section} value={content.about[section]} template={defaults.about[section]} media={media} onChange={(value) => setContent({ ...content, about: { ...content.about, [section]: value } } as SiteContent)} /></Editor>;
  }
  return <Editor title={section.replace(/^./, (c) => c.toUpperCase())}><ContentTreeEditor value={content[section]} template={defaults[section]} media={media} onChange={(value) => setContent({ ...content, [section]: value } as SiteContent)} /></Editor>;
}

type EditorProps = { content: SiteContent; setContent: (content: SiteContent) => void };
async function adminJson(url: string, options?: RequestInit): Promise<unknown> {
  const response = await fetch(url, options);
  const result: unknown = await response.json();
  if (!response.ok) throw new Error(result && typeof result === "object" && "error" in result ? String(result.error) : "Request failed. Please try again.");
  return result;
}
function AdminShell({ children }: { children: React.ReactNode }) { return <main className="min-h-screen bg-[#020718] px-5 pb-24 pt-36 text-white sm:px-8"><div className="mx-auto max-w-7xl">{children}</div></main>; }
function Editor({ title, children }: { title: string; children: React.ReactNode }) { return <section><h2 className="mb-7 text-2xl font-bold">{title}</h2><div className="space-y-5">{children}</div></section>; }
function Notice({ title, children }: { title: string; children: React.ReactNode }) { return <div className="mx-auto max-w-xl rounded-3xl border border-amber-400/20 bg-amber-400/5 p-8"><h1 className="mb-3 text-2xl font-bold">{title}</h1><p className="text-neutral-300">{children}</p></div>; }
function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) { return <button onClick={onClick} className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold ${active ? "bg-cyan-600 text-white" : "text-neutral-300 hover:bg-white/5"}`}>{icon}{label}</button>; }
function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) { return <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-400">{label}</span><input required type={type} value={value} onChange={(e) => onChange(e.target.value)} className="career-input" /></label>; }
function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-wider text-neutral-400">{label}</span><textarea required rows={3} value={value} onChange={(e) => onChange(e.target.value)} className="career-input resize-y" /></label>; }
