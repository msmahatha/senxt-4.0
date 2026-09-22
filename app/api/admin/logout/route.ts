import { cookies } from "next/headers";
import { ADMIN_COOKIE, sameOrigin } from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  (await cookies()).delete(ADMIN_COOKIE);
  return Response.json({ ok: true });
}
