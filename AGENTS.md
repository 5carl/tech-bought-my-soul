# Agent guide

The map for agents installing or changing [tech-bought-my-soul](https://github.com/5carl/tech-bought-my-soul). Do not read secrets, home-directory configuration, or unrelated files. Only run commands the user approved.

## Installing for a user

1. Follow the **Claude Code** section of `INSTALL.md`.
2. If the user runs [Paseo](https://paseo.sh), also follow its section. Check the daemon's `pluginsEnabled` first. If it is false or missing, ask the user before enabling plugins, and tell them plugins are trusted, unsandboxed code.
3. Verify with the commands in `INSTALL.md`, and report what you saw.

## Repository map

| Area | Location | Purpose |
| --- | --- | --- |
| Claude Code manifest | `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` | Plugin and marketplace metadata |
| Claude Code module | `hooks/hooks.json`, `hooks/register.tsx` | The rule (`RULE`), the parser, the terminal button band |
| State contract | `types/index.d.ts` | Declares the `$.state` value the module keeps |
| Tests | `hooks/abcs.test.ts` | Parser and stripping tests |
| Paseo plugin | `paseo/` | Server hook that appends a button row per turn, client renderer |
| Shared format | `paseo/shared/abcs.ts` | Must match the parser in `hooks/register.tsx` |

## The contract

Claude ends a reply with one line, after a blank line:

```markdown
[abcs]: # (["Go", "Show me the diff"])
```

2 to 4 JSON strings, no parentheses inside them. Both parsers take the last such line in a message. If you change the format, change both parsers and the tests together.

## Checks

```bash
claude plugin validate .
claude plugin test .
cd paseo && npm install && npm run typecheck
```
