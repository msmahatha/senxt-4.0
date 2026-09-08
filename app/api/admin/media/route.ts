import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, validAdminToken } from "@/lib/admin-auth";
import { listMediaFiles, uploadDirectory } from "@/lib/media";

const maxImageBytes = 10 * 1024 * 1024;
const imageExtensions = new Map([
  ["image/jpeg", ".jpg"], ["image/png", ".png"], ["image/webp", ".webp"], ["image/avif", ".avif"], ["image/gif", ".gif"],
]);

async function authorized() {
  return validAdminToken((await cookies()).get(ADMIN_COOKIE)?.value);
}

export async function GET() {
  if (!(await authorized())) return Response.json({ error: "Unauthorized." }, { status: 401 });
  return Response.json(await listMediaFiles());
}

export async function POST(request: Request) {
  if (!(await authorized())) return Response.json({ error: "Unauthorized." }, { status: 401 });
  const image = (await request.formData()).get("image");
  if (!(image instanceof File) || image.size === 0) return Response.json({ error: "Choose an image to upload." }, { status: 400 });
  const extension = imageExtensions.get(image.type);
  if (!extension) return Response.json({ error: "Use JPG, PNG, WebP, AVIF, or GIF." }, { status: 415 });
  if (image.size > maxImageBytes) return Response.json({ error: "Images must be 10 MB or smaller." }, { status: 413 });

  await mkdir(uploadDirectory, { recursive: true });
  const baseName = image.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "image";
  const name = `${baseName}-${randomUUID().slice(0, 8)}${extension}`;
  await writeFile(path.join(uploadDirectory, name), Buffer.from(await image.arrayBuffer()), { flag: "wx" });
  return Response.json({ name, url: `/uploads/${name}` }, { status: 201 });
}

export async function DELETE(request: Request) {
  if (!(await authorized())) return Response.json({ error: "Unauthorized." }, { status: 401 });
  const name = new URL(request.url).searchParams.get("name");
  if (!name || path.basename(name) !== name || name === ".gitkeep") return Response.json({ error: "Invalid filename." }, { status: 400 });
  await unlink(path.join(uploadDirectory, name)).catch((error: NodeJS.ErrnoException) => {
    if (error.code !== "ENOENT") throw error;
  });
  return Response.json({ ok: true });
}
