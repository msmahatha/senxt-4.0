import "server-only";

import { readdir, stat } from "node:fs/promises";
import path from "node:path";

export type MediaFile = { name: string; url: string; size: number; uploadedAt: string };
export const uploadDirectory = path.join(process.cwd(), "public", "uploads");

export async function listMediaFiles(): Promise<MediaFile[]> {
  const publicDirectory = path.join(process.cwd(), "public");
  const files: MediaFile[] = [];
  async function scan(directory: string) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (entry.name.startsWith(".") || entry.name === "resumes") continue;
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) await scan(fullPath);
      else if (entry.isFile() && /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(entry.name)) {
        const details = await stat(fullPath);
        files.push({ name: entry.name, url: `/${path.relative(publicDirectory, fullPath).split(path.sep).join("/")}`, size: details.size, uploadedAt: details.mtime.toISOString() });
      }
    }
  }
  await scan(publicDirectory);
  return files.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
}
