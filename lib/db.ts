import "server-only";

import { Pool } from "pg";

const globalForPostgres = globalThis as unknown as { senseXtPool?: Pool };

export function getDatabase() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not configured");

  if (!globalForPostgres.senseXtPool) {
    globalForPostgres.senseXtPool = new Pool({
      connectionString,
      max: 10,
      ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
    });
  }
  return globalForPostgres.senseXtPool;
}
