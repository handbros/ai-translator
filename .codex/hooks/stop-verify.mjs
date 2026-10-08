import { spawnSync } from "node:child_process";

const input = await new Promise((resolve) => {
  let data = "";
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (chunk) => {
    data += chunk;
  });
  process.stdin.on("end", () => resolve(data));
});

const payload = input ? JSON.parse(input) : {};

if (payload.stop_hook_active) {
  process.stdout.write("{}");
  process.exit(0);
}

const gitRoot = spawnSync("git", ["rev-parse", "--show-toplevel"], {
  encoding: "utf8",
});
const workspace = gitRoot.stdout.trim() || process.cwd();

for (const script of ["format", "verify"]) {
  const command =
    process.platform === "win32"
      ? [
          process.env.ComSpec ?? "cmd.exe",
          ["/d", "/s", "/c", `pnpm run ${script}`],
        ]
      : ["pnpm", ["run", script]];
  const result = spawnSync(command[0], command[1], {
    cwd: workspace,
    encoding: "utf8",
  });

  process.stderr.write(result.stdout ?? "");
  process.stderr.write(result.stderr ?? "");
  if (result.error) {
    process.stderr.write(`${result.error.message}\n`);
  }

  if (result.status !== 0) {
    process.stdout.write(
      JSON.stringify({
        decision: "block",
        reason: `pnpm run ${script} failed. Fix the reported errors and run the completion checks again.`,
      }),
    );
    process.exit(0);
  }
}

process.stdout.write("{}");
