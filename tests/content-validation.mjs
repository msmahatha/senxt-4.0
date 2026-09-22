import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import assert from "node:assert/strict";
import ts from "typescript";

const require = createRequire(import.meta.url);
const load = async (filename, aliases = {}) => {
  const source = await readFile(new URL(`../${filename}`, import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
  const exports = {};
  Function("require", "exports", compiled)((name) => name === "server-only" ? {} : name in aliases ? aliases[name] : require(name), exports);
  return exports;
};

const cms = require("../data/cms-defaults.json");
const base = require("../data/site-content.json");
const schema = await load("lib/site-content.ts", { "@/lib/db": {}, "@/data/cms-defaults.json": cms, "@/data/site-content.json": base });
const defaults = schema.defaultSiteContent;
assert.equal(schema.isValidSiteContent(defaults), true);
const rejects = (mutate) => { const candidate = structuredClone(defaults); mutate(candidate); assert.equal(schema.isValidSiteContent(candidate), false); };
rejects((candidate) => { delete candidate.about.team; });
rejects((candidate) => { candidate.hero.ctaHref = "javascript:alert(1)"; });
rejects((candidate) => { candidate.settings.logo = "https://remote.test/image.png"; });
rejects((candidate) => { candidate.settings.logo = "/uploads/../secret.png"; });
rejects((candidate) => { candidate.settings.siteUrl = "not-a-url"; });
rejects((candidate) => { candidate.blogs.push(candidate.blogs[0]); });
rejects((candidate) => { candidate.blogs[0].slug = "unsafe/slug"; });
rejects((candidate) => { candidate.careers.jobs.push(candidate.careers.jobs[0]); });
rejects((candidate) => { candidate.contact.channels[0].email = "invalid-email"; });
rejects((candidate) => { candidate.legal["terms-and-conditions"].blocks[0].kind = "script"; });
rejects((candidate) => { candidate.unexpected = "extra field"; });
const emptyLists = structuredClone(defaults); emptyLists.blogs = []; emptyLists.about.partners = []; assert.equal(schema.isValidSiteContent(emptyLists), true);

process.env.ADMIN_PASSWORD = "test-password-not-for-deployment";
process.env.ADMIN_SESSION_SECRET = "test-session-secret-not-for-deployment";
const auth = await load("lib/admin-auth.ts");
const token = auth.adminToken();
assert.equal(auth.validAdminToken(token), true);
assert.equal(auth.validAdminToken(`${token}tampered`), false);
assert.equal(auth.validAdminToken("legacy-static-token"), false);
assert.equal(auth.validAdminPassword(process.env.ADMIN_PASSWORD), true);
assert.equal(auth.validAdminPassword("wrong"), false);
console.log("Content validation and admin session tests passed.");
