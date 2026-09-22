import "server-only";

import { getDatabase } from "@/lib/db";
import cmsDefaults from "@/data/cms-defaults.json";
import baseDefaults from "@/data/site-content.json";
import { cache } from "react";

export type Job = { code: string; title: string; type: string; location: string };
export type SiteContent = typeof cmsDefaults & {
  hero: { eyebrow: string; titleLineOne: string; titleLineTwo: string; description: string; ctaLabel: string; ctaHref: string };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    channels: { title: string; description: string; email: string }[];
    locations: { title: string; address: string }[];
    hours: string;
  };
  careers: Omit<typeof baseDefaults.careers, "jobs"> & { jobs: Job[] };
};

export const defaultSiteContent: SiteContent = { ...cmsDefaults, ...baseDefaults };

function mergeDefaults(template: unknown, stored: unknown): unknown {
  if (Array.isArray(template)) return Array.isArray(stored) ? stored : template;
  if (template && typeof template === "object") {
    const source = stored && typeof stored === "object" ? stored as Record<string, unknown> : {};
    return Object.fromEntries(Object.entries(template).map(([key, value]) => [key, mergeDefaults(value, source[key])]));
  }
  return stored === undefined ? template : stored;
}

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const defaults = defaultSiteContent;
  if (!process.env.DATABASE_URL) return defaults;

  const database = getDatabase();
  const result = await database.query<{ content: SiteContent }>("SELECT content FROM site_content WHERE id = $1", ["primary"]);
  if (result.rows[0]?.content) {
    const merged = mergeDefaults(defaults, result.rows[0].content);
    if (!isValidSiteContent(merged)) throw new Error("Stored website content is invalid");
    return merged;
  }

  await database.query("INSERT INTO site_content (id, content) VALUES ($1, $2::jsonb) ON CONFLICT (id) DO NOTHING", ["primary", JSON.stringify(defaults)]);
  return defaults;
});

export async function saveSiteContent(content: SiteContent) {
  const database = getDatabase();
  await database.query(
    "INSERT INTO site_content (id, content, updated_at) VALUES ($1, $2::jsonb, NOW()) ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()",
    ["primary", JSON.stringify(content)],
  );
}

export function isValidSiteContent(value: unknown): value is SiteContent {
  function check(candidate: unknown, template: unknown, key = ""): boolean {
    if (typeof template === "string") {
      if (typeof candidate !== "string" || candidate.length > 50000) return false;
      if (key === "logo" && !candidate.trim()) return false;
      if (["title", "titleLineOne", "name", "code", "id", "siteTitle"].includes(key) && !candidate.trim()) return false;
      if (key === "siteUrl") { try { return ["https:", "http:"].includes(new URL(candidate).protocol); } catch { return false; } }
      if (/^(image|logo|bgImage|background|socialImage)$/.test(key)) return candidate === "" || /^\/(?!\/)[^\x00-\x1f]*$/.test(candidate) && !candidate.split("/").includes("..");
      if (/^(href|ctaHref|url|linkedin)$/.test(key)) { if (candidate === "" || /^\/(?!\/)/.test(candidate)) return true; try { return new URL(candidate).protocol === "https:"; } catch { return false; } }
      if (key === "email") return /^\S+@\S+\.\S+$/.test(candidate);
      if (key === "slug") return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(candidate);
      if (key === "kind") return ["h2", "p", "li"].includes(candidate);
      return true;
    }
    if (Array.isArray(template)) return Array.isArray(candidate) && candidate.length <= 500 && candidate.every((item) => check(item, template[0], key));
    if (template && typeof template === "object") return Boolean(candidate && typeof candidate === "object" && !Array.isArray(candidate) && Object.keys(candidate).length === Object.keys(template).length && Object.entries(template).every(([field, sample]) => check((candidate as Record<string, unknown>)[field], sample, field)));
    return false;
  }
  if (!check(value, defaultSiteContent)) return false;
  const content = value as SiteContent;
  return new Set(content.blogs.map((blog) => blog.slug)).size === content.blogs.length && new Set(content.careers.jobs.map((job) => job.code)).size === content.careers.jobs.length;
}
