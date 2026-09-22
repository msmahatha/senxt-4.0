import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, validAdminToken, sameOrigin } from "@/lib/admin-auth";
import { getSiteContent, isValidSiteContent, saveSiteContent } from "@/lib/site-content";
import { listMediaFiles } from "@/lib/media";

async function authorized() {
  return validAdminToken((await cookies()).get(ADMIN_COOKIE)?.value);
}

export async function GET() {
  if (!(await authorized())) return Response.json({ error: "Unauthorized." }, { status: 401 });
  try { return Response.json(await getSiteContent()); }
  catch { return Response.json({ error: "Could not load content from PostgreSQL." }, { status: 503 }); }
}

export async function PUT(request: Request) {
  if (!sameOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  if (!(await authorized())) return Response.json({ error: "Unauthorized." }, { status: 401 });
  const payload = await request.text();
  if (Buffer.byteLength(payload, "utf8") > 2 * 1024 * 1024) return Response.json({ error: "Website content must be 2 MB or smaller." }, { status: 413 });
  let content: unknown;
  try { content = JSON.parse(payload); } catch { content = null; }
  if (!isValidSiteContent(content)) return Response.json({ error: "Check the content fields, local image paths, links, email addresses, and unique blog slugs/job codes." }, { status: 400 });

  try {
    const files = new Set((await listMediaFiles()).map((file) => file.url));
    function validImages(value: unknown): boolean {
      if (Array.isArray(value)) return value.every(validImages);
      if (value && typeof value === "object") return Object.entries(value).every(([key, item]) => /^(image|logo|bgImage|background|socialImage)$/.test(key) ? typeof item === "string" && (item === "" || files.has(item)) : validImages(item));
      return true;
    }
    if (!validImages(content)) return Response.json({ error: "One or more selected images do not exist in the project. Choose an image from the media library." }, { status: 400 });
    await saveSiteContent(content);
    revalidatePath("/", "layout");
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Content save failed", error);
    return Response.json({ error: "Could not save content to PostgreSQL. Please try again." }, { status: 503 });
  }
}
