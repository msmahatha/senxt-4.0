import pg from "pg";

const brokenDois = new Set(["10.1038/s41565-025-0000-1", "10.1002/adma.202400002", "10.1016/j.bios.2024.100003"]);
const placeholderSocials = new Set(["https://youtube.com", "https://twitter.com", "https://instagram.com", "https://linkedin.com"]);
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false } });
const client = await pool.connect();
try {
  await client.query("BEGIN");
  const result = await client.query("SELECT content FROM site_content WHERE id=$1 FOR UPDATE", ["primary"]);
  const content = result.rows[0]?.content;
  if (!content) throw new Error("Website content is missing");
  let cleared = 0;
  for (const publication of content.publications ?? []) {
    if (brokenDois.has(publication.doi)) { publication.doi = ""; cleared++; }
  }
  for (const social of content.settings?.socialLinks ?? []) {
    if (placeholderSocials.has(social.url.replace(/\/$/, ""))) { social.url = ""; cleared++; }
  }
  if (cleared) await client.query("UPDATE site_content SET content=$1::jsonb, updated_at=NOW() WHERE id=$2", [JSON.stringify(content), "primary"]);
  await client.query("COMMIT");
  console.log(`Cleared ${cleared} confirmed broken or placeholder destinations. Content records preserved.`);
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally { client.release(); await pool.end(); }
