import { cookies } from "next/headers";
import { ADMIN_COOKIE, adminToken, validAdminPassword, sameOrigin } from "@/lib/admin-auth";

const attempts = new Map<string, { count: number; expires: number }>();

export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ error: "Invalid request origin." }, { status: 403 });
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const recent = attempts.get(key);
  if (recent && recent.expires > Date.now() && recent.count >= 5) return Response.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
  const body = (await request.json().catch(() => null)) as { password?: string } | null;
  if (!validAdminPassword(body?.password)) {
    attempts.set(key, { count: recent && recent.expires > Date.now() ? recent.count + 1 : 1, expires: Date.now() + 15 * 60 * 1000 });
    return Response.json({ error: "Invalid password." }, { status: 401 });
  }
  attempts.delete(key);

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
