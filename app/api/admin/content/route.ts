import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, validAdminToken } from "@/lib/admin-auth";
import { getSiteContent, isValidSiteContent, saveSiteContent } from "@/lib/site-content";

async function authorized() {
  return validAdminToken((await cookies()).get(ADMIN_COOKIE)?.value);
}

export async function GET() {
  if (!(await authorized())) return Response.json({ error: "Unauthorized." }, { status: 401 });
  return Response.json(await getSiteContent());
}

export async function PUT(request: Request) {
  if (!(await authorized())) return Response.json({ error: "Unauthorized." }, { status: 401 });
  const content: unknown = await request.json().catch(() => null);
  if (!isValidSiteContent(content)) return Response.json({ error: "Content is incomplete or invalid." }, { status: 400 });

  try {
    await saveSiteContent(content);
    revalidatePath("/");
    revalidatePath("/career");
    revalidatePath("/contact");
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Content save failed", error);
    return Response.json({ error: "Content storage is not writable on this deployment." }, { status: 507 });
  }
}
