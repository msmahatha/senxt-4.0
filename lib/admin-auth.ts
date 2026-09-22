import "server-only";

import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "sense_xt_admin";

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

export function configuredAdminPassword() {
  return process.env.ADMIN_PASSWORD;
}

export function adminToken() {
  const password = configuredAdminPassword();
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!password || !secret) return null;
  const expiresAt = Date.now() + 8 * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ expiresAt })).toString("base64url");
  const signature = createHmac("sha256", `${password}:${secret}`).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function validAdminToken(candidate?: string) {
  const password = configuredAdminPassword();
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!candidate || !password || !secret) return false;
  const parts = candidate.split(".");
  const [payload, signature] = parts;
  if (parts.length !== 2 || !payload || !signature) return false;
  const expected = createHmac("sha256", `${password}:${secret}`).update(payload).digest("base64url");
  if (!timingSafeEqual(digest(signature), digest(expected))) return false;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { expiresAt?: unknown };
    return typeof session.expiresAt === "number" && session.expiresAt > Date.now();
  } catch { return false; }
}

export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

export function validAdminPassword(candidate: unknown) {
  const expected = configuredAdminPassword();
  if (typeof candidate !== "string" || !expected) return false;
  return timingSafeEqual(digest(candidate), digest(expected));
}
