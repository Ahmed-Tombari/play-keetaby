// Starts the API and the site together, prefixes their output, and stops both
// when you press Ctrl+C. No dependencies, plain node.
//
//   npm run dev
//
// API on 5000 (override with BACKEND_PORT), site on 3210 (override with
// FRONTEND_PORT). 3000 belongs to another app on this machine, so the site uses
// 3210.

import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const backendPort = process.env.BACKEND_PORT ?? "5000";
const frontendPort = process.env.FRONTEND_PORT ?? "3210";

const procs = [];

function run(name, args, cwd) {
  const child = spawn("npm", args, {
    cwd,
    env: { ...process.env },
    shell: process.platform === "win32",
    stdio: ["ignore", "pipe", "pipe"],
  });
  procs.push(child);
  const tag = name.padEnd(8);
  const write = (stream, chunk) => {
    for (const line of chunk.toString().split(/\r?\n/)) {
      if (line.trim()) stream.write(`${tag} ${line}\n`);
    }
  };
  child.stdout.on("data", (c) => write(process.stdout, c));
  child.stderr.on("data", (c) => write(process.stderr, c));
  child.on("exit", (code) => {
    if (code) console.log(`${tag} stopped (exit ${code})`);
  });
  return child;
}

function shutdown() {
  console.log("\nstopping both...");
  for (const p of procs) {
    if (p.exitCode === null) {
      if (process.platform === "win32") spawn("taskkill", ["/pid", String(p.pid), "/t", "/f"]);
      else p.kill("SIGTERM");
    }
  }
  setTimeout(() => process.exit(0), 600);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

console.log(`backend  http://localhost:${backendPort}   API`);
console.log(`frontend http://localhost:${frontendPort}   open this one`);
console.log("Ctrl+C stops both\n");

run("backend", ["start"], join(root, "backend"));
run("frontend", ["run", "dev", "--", "--port", frontendPort], join(root, "frontend"));
