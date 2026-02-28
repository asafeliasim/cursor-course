import type { KeyType } from "../types";

export function generateKey(type: KeyType): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const prefix = type === "dev" ? "dandi-dev-" : "dandi-prod-";
  let result = prefix;
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function maskKey(key: unknown): string {
  if (key == null || typeof key !== "string") return "************************";
  if (key.length <= 12) return "************************";
  const prefix = key.startsWith("dandi-dev-") ? "dandi-dev-" : key.startsWith("dandi-prod-") ? "dandi-prod-" : key.slice(0, 8);
  return prefix + "************************";
}
