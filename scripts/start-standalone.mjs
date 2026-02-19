/**
 * Start Next.js standalone server so Render/proxy can reach it.
 * - Runs from .next/standalone (required for correct path resolution).
 * - Binds to 0.0.0.0 so the proxy can connect.
 */
import { spawn } from "child_process";
import { existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const standaloneDir = join(root, ".next", "standalone");
const serverPath = join(standaloneDir, "server.js");

if (!existsSync(serverPath)) {
  console.error("Missing .next/standalone/server.js — run 'npm run build' first.");
  process.exit(1);
}

const env = {
  ...process.env,
  NODE_ENV: process.env.NODE_ENV || "production",
  HOSTNAME: process.env.HOSTNAME || "0.0.0.0",
  PORT: process.env.PORT || "3000",
};

const child = spawn(process.execPath, ["server.js"], {
  env,
  stdio: "inherit",
  cwd: standaloneDir,
});

child.on("exit", (code, sig) => process.exit(code ?? (sig ? 1 : 0)));
