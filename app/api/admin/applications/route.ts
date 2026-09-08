import { cookies } from "next/headers";
import { ADMIN_COOKIE, validAdminToken } from "@/lib/admin-auth";
import { getApplications } from "@/lib/applications";

async function authorized() {
  return validAdminToken((await cookies()).get(ADMIN_COOKIE)?.value);
}

export async function GET() {
  if (!(await authorized())) return Response.json({ error: "Unauthorized." }, { status: 401 });
  
  try {
    const applications = await getApplications();
    return Response.json(applications);
  } catch (error) {
    console.error("Failed to fetch applications", error);
    return Response.json({ error: "Could not fetch applications from the database." }, { status: 500 });
  }
}
