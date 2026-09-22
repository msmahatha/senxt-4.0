import { readdir, mkdir, copyFile, unlink, constants } from "node:fs/promises";
import path from "node:path";
import pg from "pg";

const source = path.join(process.cwd(), "public", "uploads", "resumes");
const destination = path.join(process.cwd(), "storage", "resumes");
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false } });
try {
  await mkdir(destination, { recursive: true });
  const names = await readdir(source).catch((error) => { if (error.code === "ENOENT") return []; throw error; });
  let migrated = 0;
  for (const name of names) {
    if (!/^[a-f0-9-]+\.(pdf|doc|docx)$/i.test(name)) throw new Error("Unexpected file in public resume folder; inspect before moving it");
    await copyFile(path.join(source, name), path.join(destination, name), constants.COPYFILE_EXCL).catch((error) => { if (error.code !== "EEXIST") throw error; });
    await pool.query("UPDATE job_applications SET resume_url = $1 WHERE resume_url = $2", [`/api/admin/resumes/${name}`, `/uploads/resumes/${name}`]);
    await unlink(path.join(source, name));
    migrated += 1;
  }
  console.log(`Moved ${migrated} candidate documents into private project storage.`);
} finally { await pool.end(); }
