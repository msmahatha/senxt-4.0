import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";

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
  return createHash("sha256").update(`${password}:${secret}`).digest("hex");
}

export function validAdminToken(candidate?: string) {
  const expected = adminToken();
  if (!candidate || !expected) return false;
  return timingSafeEqual(digest(candidate), digest(expected));
}

export function validAdminPassword(candidate: unknown) {
  const expected = configuredAdminPassword();
  if (typeof candidate !== "string" || !expected) return false;
  return timingSafeEqual(digest(candidate), digest(expected));
}
