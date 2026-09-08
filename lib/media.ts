import "server-only";

import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";

export type MediaFile = { name: string; url: string; size: number; uploadedAt: string };
export const uploadDirectory = path.join(process.cwd(), "public", "uploads");

export async function listMediaFiles(): Promise<MediaFile[]> {
  await mkdir(uploadDirectory, { recursive: true });
  const names = (await readdir(uploadDirectory)).filter((name) => name !== ".gitkeep");
  const files = await Promise.all(names.map(async (name) => {
    const details = await stat(path.join(uploadDirectory, name));
    return { name, url: `/uploads/${name}`, size: details.size, uploadedAt: details.mtime.toISOString() };
  }));
  return files.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
}
