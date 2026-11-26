// The Funniest Toaster Error Message: a toaster that gives up on the
// 3 a.m. frozen-bread run and admits, deadpan, that neither of them is
// coping. The line goes to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OPENING = "ERROR: It's 3 a.m. The bread is still frozen.";
const PUNCHLINE = "Neither of us is okay right now.";

// Two short sentences, one voice: the appliance states the facts, then
// quietly confesses it is in the same boat as its owner.
function assemble(): string {
  return `${OPENING} ${PUNCHLINE}`;
}

// The gate counts characters, so the check below mirrors it exactly:
// one line, no trailing newline, 1 to 120 characters of plain UTF-8.
function checkLength(text: string): void {
  const n = [...text].length;
  if (n < 1 || n > 120) {
    throw new Error(`entry is ${n} chars; the toaster gate is 1-120`);
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  const line = assemble();
  checkLength(line);
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), line, "utf8");
}

main();
