#!/usr/bin/env node
/**
 * Copy static and public assets into standalone output for Azure/production.
 * Run automatically after `next build` when output is "standalone".
 */
import { cpSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const standalone = join(root, ".next", "standalone");

if (!existsSync(standalone)) {
  console.warn("No .next/standalone found; skipping copy (run next build with output: 'standalone' first).");
  process.exit(0);
}

const nextStatic = join(root, ".next", "static");
const standaloneNextStatic = join(standalone, ".next", "static");
if (existsSync(nextStatic)) {
  cpSync(nextStatic, standaloneNextStatic, { recursive: true });
  console.log("Copied .next/static to standalone.");
}

const publicDir = join(root, "public");
const standalonePublic = join(standalone, "public");
if (existsSync(publicDir)) {
  cpSync(publicDir, standalonePublic, { recursive: true });
  console.log("Copied public to standalone.");
}

process.exit(0);
