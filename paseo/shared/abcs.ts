import { z } from "zod";

// Claude ends a reply with [abcs]: # (["Go", "Do 2 first"]), a markdown reference
// definition, so Paseo's markdown-it draws nothing for it. Kept identical to the
// Claude Code mod's parser so both clients read the same line.
const BLOCK = /^\[abcs\]:[ \t]*#[ \t]*\((\[.*\])\)[ \t]*$/gm;
const MAX = 4;

export const ABCS_KIND = "abcs";
export const abcsSchema = z.object({ options: z.array(z.string()).max(MAX) });

export function parseAbcs(text: string): string[] {
  let last: string | undefined;
  for (const m of text.matchAll(BLOCK)) last = m[1];
  if (!last) return [];
  try {
    const parsed: unknown = JSON.parse(last);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((o): o is string => typeof o === "string" && o.trim() !== "")
      .map((o) => o.trim().slice(0, 120))
      .slice(0, MAX);
  } catch {
    return [];
  }
}
