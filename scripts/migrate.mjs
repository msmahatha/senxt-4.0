import { readFile } from "node:fs/promises";
import pg from "pg";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");

const sql = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");
const initialContent = JSON.parse(await readFile(new URL("../data/site-content.json", import.meta.url), "utf8"));
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
});

try {
  await pool.query(sql);
  await pool.query(
    "INSERT INTO site_content (id, content) VALUES ($1, $2::jsonb) ON CONFLICT (id) DO NOTHING",
    ["primary", JSON.stringify(initialContent)],
  );
  console.log("PostgreSQL migration complete.");
} finally {
  await pool.end();
}
