import assert from "node:assert/strict";

const origin = process.env.CHECK_SITE_URL || "http://localhost:3000";
const request = (url, options = {}) => fetch(`${origin}${url}`, { ...options, headers: { origin, ...options.headers } });
assert.equal((await request("/api/admin/content")).status, 401);
assert.equal((await request("/api/admin/applications")).status, 401);
assert.equal((await request("/api/admin/resumes/00000000-0000-0000-0000-000000000000.pdf")).status, 401);
const login = await request("/api/admin/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password: process.env.ADMIN_PASSWORD }) });
assert.equal(login.status, 200, "Admin login failed");
const cookie = login.headers.get("set-cookie").split(";")[0];
const headers = { cookie, "content-type": "application/json" };
const response = await request("/api/admin/content", { headers });
assert.equal(response.status, 200);
const content = await response.json();
for (const section of ["blogs", "about", "overview", "products", "publications", "legal", "settings", "rnd", "headers", "zoom"]) assert.ok(content[section], `${section} missing`);
const published = await request("/api/admin/content", { method: "PUT", headers, body: JSON.stringify(content) });
assert.equal(published.status, 200, "Publishing unchanged website content failed");
const invalid = structuredClone(content); invalid.blogs.push(invalid.blogs[0]);
assert.equal((await request("/api/admin/content", { method: "PUT", headers, body: JSON.stringify(invalid) })).status, 400);
const fake = new FormData(); fake.set("image", new Blob(["not an image"], { type: "image/png" }), "fake.png");
assert.equal((await request("/api/admin/media", { method: "POST", headers: { cookie }, body: fake })).status, 415);
const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aC9sAAAAASUVORK5CYII=", "base64");
const form = new FormData(); form.set("image", new Blob([png], { type: "image/png" }), "cms-verification.png");
const uploaded = await request("/api/admin/media", { method: "POST", headers: { cookie }, body: form });
assert.equal(uploaded.status, 201, "Image upload failed");
const image = await uploaded.json();
try {
  const media = await (await request("/api/admin/media", { headers: { cookie } })).json();
  assert.ok(media.some((file) => file.url === image.url));
  assert.ok(media.every((file) => /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(file.url)), "Media library contains non-images");
} finally {
  assert.equal((await request(`/api/admin/media?name=${encodeURIComponent(image.name)}`, { method: "DELETE", headers: { cookie } })).status, 200);
}
for (const route of ["/", "/about", "/product", "/rnd", "/rnd/blogs", `/rnd/blogs/${content.blogs[0].slug}`, "/publications", "/terms-and-conditions", "/privacy-policy", "/refund-and-cancellation", "/career", "/contact", "/admin"]) {
  const page = await request(route, { headers: { cookie } }); assert.equal(page.status, 200, `${route} failed`);
  const html = await page.text(); assert.ok(!html.includes("{item.description}"), "Unresolved content field");
  const assets = [...new Set([...html.matchAll(/(?:href|src)="([^" ]*\/_next\/static\/[^" ]*)"/g)].map((match) => match[1]))];
  assert.ok(assets.some((asset) => asset.endsWith(".css")), `${route} has no stylesheet`);
  await Promise.all(assets.map(async (asset) => {
    const result = await request(asset);
    assert.equal(result.status, 200, `${route}: missing asset ${asset}`);
    const type = result.headers.get("content-type") || "";
    assert.ok(asset.endsWith(".css") ? type.includes("text/css") : /javascript/.test(type), `${route}: incorrect asset type ${asset}`);
  }));
}
assert.equal((await request("/api/admin/logout", { method: "POST", headers: { cookie } })).status, 200);
console.log("Admin API, publishing, media, protected downloads, and all public routes passed. Temporary test image removed.");
