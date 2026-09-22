import { readFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, validAdminToken } from "@/lib/admin-auth";

export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  if (!validAdminToken((await cookies()).get(ADMIN_COOKIE)?.value)) return Response.json({ error: "Unauthorized." }, { status: 401 });
  const { name } = await params;
  if (!/^[a-f0-9-]+\.(pdf|doc|docx)$/i.test(name)) return Response.json({ error: "Invalid document." }, { status: 400 });
  try {
    const file = await readFile(path.join(process.cwd(), "storage", "resumes", name));
    return new Response(new Uint8Array(file), { headers: { "content-type": "application/octet-stream", "content-disposition": `attachment; filename="${name}"`, "cache-control": "private, no-store" } });
  } catch {
    return Response.json({ error: "Document not found." }, { status: 404 });
  }
}
