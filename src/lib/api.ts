export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5174";

export async function getJson(path: string, init?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export async function postJson(path: string, body: unknown) {
  return getJson(path, { method: "POST", body: JSON.stringify(body) });
}


