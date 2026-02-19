/**
 * Start Next.js standalone server with HOSTNAME=0.0.0.0 so Render/proxy can reach it.
 */
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const serverPath = join(root, ".next", "standalone", "server.js");

const env = { ...process.env, HOSTNAME: process.env.HOSTNAME || "0.0.0.0" };
const child = spawn(process.execPath, [serverPath], { env, stdio: "inherit" });
child.on("exit", (code, sig) => process.exit(code ?? (sig ? 1 : 0)));
