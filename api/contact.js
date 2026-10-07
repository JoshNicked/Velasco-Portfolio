import { createHash } from "node:crypto";

const COOLDOWN_SECONDS = 2 * 24 * 60 * 60;

const redis = async (...command) => {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error("Redis is not configured");
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(command),
  });
  const data = await response.json();
  if (!response.ok || data.error) throw new Error("Redis request failed");
  return data.result;
};

const getKey = (req) => {
  const forwarded = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const ip = forwarded || req.socket?.remoteAddress || "unknown";
  return `contact:${createHash("sha256").update(ip).digest("hex")}`;
};

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  let key;
  try {
    key = getKey(req);

    if (req.method === "GET") {
      return res.status(200).json({ locked: (await redis("EXISTS", key)) === 1 });
    }
    if (req.method !== "POST") return res.status(405).json({ success: false });

    const accessKey =
      process.env.WEB3FORMS_ACCESS_KEY || process.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) return res.status(500).json({ success: false });

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

    // Claim the slot atomically so concurrent requests cannot both pass.
    const claimed = await redis("SET", key, String(Date.now()), "NX", "EX", COOLDOWN_SECONDS);
    if (claimed !== "OK") return res.status(429).json({ success: false, locked: true });

    const upstream = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...body, access_key: accessKey }),
    });
    const result = await upstream.json().catch(() => ({}));

    if (!upstream.ok || !result.success) {
      await redis("DEL", key);
      return res.status(502).json({ success: false });
    }
    return res.status(200).json({ success: true });
  } catch {
    if (req.method === "POST" && key) await redis("DEL", key).catch(() => {});
    return res.status(500).json({ success: false });
  }
}
