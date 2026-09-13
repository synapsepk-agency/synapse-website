import { createHmac, timingSafeEqual } from "node:crypto";

const ADMIN_USER = "MeerakBaloch";
const ADMIN_PASS = "Meerak@12Baloch";
const SECRET = "synapse-inbox-token-v1";

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function checkAdmin(username: string, password: string) {
  return username.trim() === ADMIN_USER && password === ADMIN_PASS;
}

export function issueToken() {
  const exp = String(Date.now() + 1000 * 60 * 60 * 12);
  const sig = createHmac("sha256", SECRET).update(exp).digest("hex");
  return `${exp}.${sig}`;
}

export function verifyToken(token: string) {
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  const expected = createHmac("sha256", SECRET).update(exp).digest("hex");
  if (!safeEqual(sig, expected)) return false;
  return Date.now() < Number(exp);
}
