import { saveApplication } from "@/lib/applications";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { getSiteContent } from "@/lib/site-content";

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
  const { careers } = await getSiteContent();
  if (!careers.jobs.some((position) => position.code === job)) return Response.json({ error: "Please choose an available position." }, { status: 400 });
  let filePath: string | undefined;

  try {
    const uploadDir = path.join(process.cwd(), "storage", "resumes");
    await mkdir(uploadDir, { recursive: true });
    
    const ext = resume.type === "application/pdf" ? "pdf" : resume.type === "application/msword" ? "doc" : "docx";
    const filename = `${randomUUID()}.${ext}`;
    filePath = path.join(uploadDir, filename);
    
    const arrayBuffer = await resume.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(filePath, buffer);

    await saveApplication({
      name: name as string,
      email: email as string,
      phone: phone as string,
      job: job as string,
      resumeUrl: `/api/admin/resumes/${filename}`
    });

    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, { method: "POST", body: form, cache: "no-store", signal: AbortSignal.timeout(10000) });
        if (!response.ok) console.error(`Application provider returned ${response.status}`);
      } catch { console.error("Optional application notification failed"); }
    }

    return Response.json({ ok: true });
  } catch (error) {
    if (filePath) await unlink(filePath).catch(() => undefined);
    console.error("Career application processing failed", error);
    return Response.json(
      { error: "We could not process your application. Please email careers@sense-xt.com." },
      { status: 502 },
    );
  }
}
