import fs from "node:fs/promises";
import path from "node:path";

const DEFAULT_CONFIG = {
  plans: {
    standard: { monthlyLimit: 3 },
    premium: { monthlyLimit: null },
  },
  reliability: {
    threshold: 0.95,
    window: 50,
    minRuns: 20,
  },
  tools: {
    "compress-pdf": { enabled: true, tier: "freemium" },
    "rotate-pdf": { enabled: true, tier: "freemium" },
    "pdf-to-excel": { enabled: true, tier: "freemium" },
    "pdf-to-jpg": { enabled: true, tier: "premium" },
    "tiktok-download": { enabled: true, tier: "premium" },
    "youtube-download": { enabled: true, tier: "premium" },
    "pdf-to-word": { enabled: false, tier: "premium", hardDisabled: true },
  },
  overrides: {
    forceEnable: [],
    forceDisable: [],
  },
};

const DATA_DIR = process.env.PDFTOOLS_DATA_DIR || path.join(process.cwd(), "data");
const CONFIG_PATH = path.join(DATA_DIR, "tools-config.json");

const mergeConfig = (base, override) => ({
  ...base,
  ...override,
  plans: { ...base.plans, ...override?.plans },
  reliability: { ...base.reliability, ...override?.reliability },
  tools: { ...base.tools, ...override?.tools },
  overrides: { ...base.overrides, ...override?.overrides },
});

const readJson = async (filePath, fallback) => {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw || "{}");
    return mergeConfig(fallback, parsed);
  } catch {
    return fallback;
  }
};

export async function getToolsConfig() {
  return readJson(CONFIG_PATH, DEFAULT_CONFIG);
}

export function getConfigPaths() {
  return { DATA_DIR, CONFIG_PATH };
}
