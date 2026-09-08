import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { getDatabase } from "@/lib/db";

export type Job = { code: string; title: string; type: string; location: string };
export type SiteContent = {
  hero: { eyebrow: string; titleLineOne: string; titleLineTwo: string; description: string; ctaLabel: string; ctaHref: string };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    channels: { title: string; description: string; email: string }[];
    locations: { title: string; address: string }[];
    hours: string;
  };
  careers: { eyebrow: string; title: string; jobs: Job[] };
};

const contentPath = path.join(process.cwd(), "data", "site-content.json");

export async function getSiteContent(): Promise<SiteContent> {
  const defaults = JSON.parse(await readFile(contentPath, "utf8")) as SiteContent;
  if (!process.env.DATABASE_URL) return defaults;

  const database = getDatabase();
  await database.query("CREATE TABLE IF NOT EXISTS site_content (id TEXT PRIMARY KEY, content JSONB NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())");
  const result = await database.query<{ content: SiteContent }>("SELECT content FROM site_content WHERE id = $1", ["primary"]);
  if (result.rows[0]?.content && isValidSiteContent(result.rows[0].content)) return result.rows[0].content;

  await database.query("INSERT INTO site_content (id, content) VALUES ($1, $2::jsonb) ON CONFLICT (id) DO NOTHING", ["primary", JSON.stringify(defaults)]);
  return defaults;
}

export async function saveSiteContent(content: SiteContent) {
  const database = getDatabase();
  await database.query(
    "INSERT INTO site_content (id, content, updated_at) VALUES ($1, $2::jsonb, NOW()) ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()",
    ["primary", JSON.stringify(content)],
  );
}

export function isValidSiteContent(value: unknown): value is SiteContent {
  if (!value || typeof value !== "object") return false;
  const content = value as Partial<SiteContent>;
  return Boolean(
    content.hero?.titleLineOne && content.hero.titleLineTwo && content.hero.description &&
    content.contact?.title && Array.isArray(content.contact.channels) && Array.isArray(content.contact.locations) &&
    content.careers?.title && Array.isArray(content.careers.jobs) &&
    content.careers.jobs.every((job) => job.code && job.title && job.type && job.location),
  );
}
