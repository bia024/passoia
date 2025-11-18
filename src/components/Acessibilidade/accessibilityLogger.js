// src/components/Acessibilidade/accessibilityLogger.js
const LS_KEY = "accessibility_logs_v1";

export function logEvent(event, detail = "", meta = {}) {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    const entry = { ts: Date.now(), event, detail, meta };
    arr.push(entry);
    // keep last 500
    localStorage.setItem(LS_KEY, JSON.stringify(arr.slice(-500)));
    console.info("[A11Y LOG]", entry);
  } catch (e) {
    console.warn("Failed to log accessibility event", e);
  }
}

export function getLogs() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function clearLogs() {
  localStorage.removeItem(LS_KEY);
}
