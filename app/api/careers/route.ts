import { saveApplication } from "@/lib/applications";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ACCEPTED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export async function POST(request: Request) {
  const form = await request.formData();
  const name = form.get("name");
  const email = form.get("email");
  const phone = form.get("phone");
  const job = form.get("job");
  const resume = form.get("resume");

  if (![name, email, phone, job].every((value) => typeof value === "string" && value.trim())) {
    return Response.json({ error: "Please complete every required field." }, { status: 400 });
  }

  if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!(resume instanceof File) || resume.size === 0) {
    return Response.json({ error: "Please attach your resume." }, { status: 400 });
  }

  if (resume.size > MAX_RESUME_BYTES) {
    return Response.json({ error: "Resume files must be 5 MB or smaller." }, { status: 413 });
  }

  if (!ACCEPTED_RESUME_TYPES.has(resume.type)) {
    return Response.json({ error: "Resume must be a PDF, DOC, or DOCX file." }, { status: 415 });
  }

  const webhookUrl = process.env.CAREERS_WEBHOOK_URL;

  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads", "resumes");
    await mkdir(uploadDir, { recursive: true });
    
    const ext = resume.name.split('.').pop() || 'pdf';
    const filename = `${randomUUID()}.${ext}`;
    const filePath = path.join(uploadDir, filename);
    
    const arrayBuffer = await resume.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(filePath, buffer);

    await saveApplication({
      name: name as string,
      email: email as string,
      phone: phone as string,
      job: job as string,
      resumeUrl: `/uploads/resumes/${filename}`
    });

    if (webhookUrl) {
      const response = await fetch(webhookUrl, { method: "POST", body: form, cache: "no-store" });
      if (!response.ok) console.error(`Application provider returned ${response.status}`);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Career application processing failed", error);
    return Response.json(
      { error: "We could not process your application. Please email careers@sense-xt.com." },
      { status: 502 },
    );
  }
}
