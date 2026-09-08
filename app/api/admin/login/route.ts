import { cookies } from "next/headers";
import { ADMIN_COOKIE, adminToken, validAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { password?: string } | null;
  if (!validAdminPassword(body?.password)) {
    return Response.json({ error: "Invalid password." }, { status: 401 });
  }

  const token = adminToken();
  if (!token) return Response.json({ error: "Admin access is not configured." }, { status: 503 });

  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return Response.json({ ok: true });
}
