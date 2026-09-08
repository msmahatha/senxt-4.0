import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { ADMIN_COOKIE, configuredAdminPassword, validAdminToken } from "@/lib/admin-auth";
import { getSiteContent } from "@/lib/site-content";
import { listMediaFiles } from "@/lib/media";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function AdminPage() {
  const configured = Boolean(configuredAdminPassword() && process.env.ADMIN_SESSION_SECRET && process.env.DATABASE_URL);
  const authenticated = validAdminToken((await cookies()).get(ADMIN_COOKIE)?.value);
  const content = authenticated ? await getSiteContent() : null;
  const media = authenticated ? await listMediaFiles() : [];
  return <AdminPanel configured={configured} initialAuthenticated={authenticated} initialContent={content} initialMedia={media} />;
}
