"use client";

import { FormEvent, useRef, useState } from "react";
import { Send, Upload } from "lucide-react";
import type { Job } from "@/lib/site-content";

export function CareerContent({ eyebrow, title, jobs }: { eyebrow: string; title: string; jobs: Job[] }) {
  const [selectedJob, setSelectedJob] = useState("");
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState<{ type: "idle" | "submitting" | "success" | "error"; message?: string }>({ type: "idle" });
  const formRef = useRef<HTMLDivElement>(null);

  const chooseJob = (code: string) => {
    setSelectedJob(code);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus({ type: "submitting" });
    try {
      const response = await fetch("/api/careers", { method: "POST", body: new FormData(formElement) });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Application could not be delivered.");
      formElement.reset();
      setSelectedJob("");
      setFileName("");
      setStatus({ type: "success", message: "Application submitted successfully. We’ll be in touch." });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Application could not be delivered." });
    }
  };

  return (
    <div className="min-h-screen bg-[#020718] px-5 pb-24 pt-36 text-[#f5f7fb] sm:px-8 lg:px-12 lg:pt-40">
      <div className="mx-auto max-w-[1440px]">
        <p className="mb-7 text-sm font-bold uppercase tracking-[0.25em] text-[#168f85] sm:text-base">
          {eyebrow}
        </p>
        <h1 className="max-w-5xl text-4xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
          {title}
        </h1>

        <div className="mt-20 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(460px,1fr)] lg:gap-20">
          <section aria-labelledby="open-positions-heading">
            <div className="mb-10 flex items-center gap-4">
              <h2 id="open-positions-heading" className="text-2xl font-bold sm:text-3xl">Open Positions</h2>
              <span className="rounded-full bg-[#071b2c] px-4 py-1.5 text-sm font-bold text-[#168f85]">{jobs.length}</span>
            </div>

            <div className="space-y-7">
              {jobs.map((job) => (
                <button
                  key={job.code}
                  type="button"
                  onClick={() => chooseJob(job.code)}
                  className={`group flex w-full items-center justify-between rounded-[2rem] border p-8 text-left transition-all duration-300 sm:p-10 ${
                    selectedJob === job.code
                      ? "border-[#168f85]/70 bg-[#132038] shadow-[0_0_28px_rgba(22,143,133,0.12)]"
                      : "border-white/[0.07] bg-[#111a2f] hover:-translate-y-1 hover:border-[#168f85]/40 hover:bg-[#142039]"
                  }`}
                >
                  <span>
                    <span className="mb-3 block font-mono text-sm text-[#97a6c0] sm:text-base">{job.code}</span>
                    <span className="block text-xl font-bold leading-tight sm:text-2xl">{job.title}</span>
                    <span className="mt-3 flex items-center gap-5 text-sm text-[#97a6c0] sm:text-base">
                      <span>{job.type}</span><span aria-hidden="true">•</span><span>{job.location}</span>
                    </span>
                  </span>
                  <span className="ml-5 grid size-12 shrink-0 place-items-center rounded-full border border-white/10 text-white transition-colors group-hover:border-[#168f85]/60 group-hover:text-[#43e4cf] sm:size-14">
                    <Send className="size-5" strokeWidth={1.8} />
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section ref={formRef} className="rounded-[2.5rem] border border-white/[0.07] bg-[#111a2f] p-7 sm:p-10 lg:sticky lg:top-28 lg:p-12">
            <h2 className="mb-10 text-3xl font-bold">Apply for a position</h2>
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Full Name"><input required name="name" placeholder="John Doe" className="career-input" /></Field>
                <Field label="Email Address"><input required name="email" type="email" placeholder="john@example.com" className="career-input" /></Field>
              </div>
              <Field label="Contact Number"><input required name="phone" type="tel" placeholder="+91 98765 43210" className="career-input" /></Field>
              <Field label="Job Code">
                <select required name="job" value={selectedJob} onChange={(event) => setSelectedJob(event.target.value)} className="career-input appearance-none">
                  <option value="" disabled>Select a job...</option>
                  {jobs.map((job) => <option key={job.code} value={job.code}>{job.code} — {job.title}</option>)}
                </select>
              </Field>
              <Field label="CV / Resume Upload">
                <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 px-5 text-center text-[#97a6c0] transition-colors hover:border-[#168f85]/50 hover:text-white">
                  <Upload className="mb-4 size-9" strokeWidth={1.7} />
                  <span>{fileName || "Click or drag your CV to upload (PDF, DOCX)"}</span>
                  <input required name="resume" type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")} />
                </label>
              </Field>
              <button disabled={status.type === "submitting"} type="submit" className="w-full rounded-2xl bg-[#168f85] px-6 py-4 text-lg font-bold text-white transition-all hover:bg-[#1aa398] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#43e4cf] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111a2f] disabled:cursor-not-allowed disabled:opacity-60">
                {status.type === "submitting" ? "Submitting…" : "Submit Application"}
              </button>
              {status.type !== "idle" && status.type !== "submitting" && (
                <p role="status" className={`text-center text-sm ${status.type === "success" ? "text-[#7befde]" : "text-red-300"}`}>{status.message}</p>
              )}
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold text-white sm:text-base">{label}</span>{children}</label>;
}
