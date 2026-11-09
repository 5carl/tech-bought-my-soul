// The [abcs] line parser, with no dependencies, so other plugins can import it
// (Approvals does: `tech-bought-my-soul/abcs`). Claude ends a reply with
// [abcs]: # (["Go", "Do 2 first"]), a markdown reference definition, so Paseo's
// markdown-it draws nothing for it. Kept identical to the Claude Code mod's parser
// so both clients read the same line.
export const BLOCK = /^\[abcs\]:[ \t]*#[ \t]*\((\[.*\])\)[ \t]*$/gm;
// Any [abcs] line, valid or not, for stripping it from displayed text.
export const BLOCK_LINE = /^\[abcs\]:.*$/gm;
export const MAX = 4;

// Paseo hands Codex replies to plugins HTML-escaped (&quot; for "), Claude's raw.
const ENTITIES: Record<string, string> = { "&quot;": '"', "&#39;": "'", "&#x27;": "'", "&lt;": "<", "&gt;": ">", "&amp;": "&" };
const unescapeHtml = (s: string) => s.replace(/&(?:quot|#39|#x27|lt|gt|amp);/g, (e) => ENTITIES[e]);

export function parseAbcs(text: string): string[] {
  let last: string | undefined;
  for (const m of unescapeHtml(text).matchAll(BLOCK)) last = m[1];
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
