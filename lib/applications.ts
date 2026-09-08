import "server-only";

import { getDatabase } from "@/lib/db";
import { randomUUID } from "node:crypto";

export type JobApplication = {
  id: string;
  name: string;
  email: string;
  phone: string;
  job: string;
  resumeUrl: string;
  createdAt: string;
};

export async function initializeApplicationsTable() {
  const database = getDatabase();
  await database.query(`
    CREATE TABLE IF NOT EXISTS job_applications (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      job TEXT NOT NULL,
      resume_url TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

export async function saveApplication(data: Omit<JobApplication, "id" | "createdAt">) {
  await initializeApplicationsTable();
  const database = getDatabase();
  const id = randomUUID();
  await database.query(
    "INSERT INTO job_applications (id, name, email, phone, job, resume_url) VALUES ($1, $2, $3, $4, $5, $6)",
    [id, data.name, data.email, data.phone, data.job, data.resumeUrl]
  );
  return id;
}

export async function getApplications(): Promise<JobApplication[]> {
  await initializeApplicationsTable();
  const database = getDatabase();
  const result = await database.query<JobApplication>(
    "SELECT id, name, email, phone, job, resume_url as \"resumeUrl\", created_at as \"createdAt\" FROM job_applications ORDER BY created_at DESC"
  );
  return result.rows;
}
