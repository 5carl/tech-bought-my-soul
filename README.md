# tech-bought-my-soul

**Tap the next message. Don't type it.** A companion to [i-have-adhd](https://github.com/ayghri/i-have-adhd).

[![License](https://img.shields.io/badge/license-MIT-blue?style=flat)](LICENSE)

> PlayStation and some drank *(technology bought my soul)*
>
> Kendrick Lamar, "A.D.H.D", *Section.80* (2011)

i-have-adhd fixed how Claude talks. This fixes how you talk back.

Every reply that leaves a next move open ends with 2 to 4 buttons, the messages you were most likely about to type. Tap one and it sends. That's it. No more typing "go", "yes do 2", or "1B" forty times a day.

Starting is the hardest step. A button is the smallest possible start.

![Claude Code with three predicted-reply buttons above the prompt](https://raw.githubusercontent.com/5carl/tech-bought-my-soul/main/assets/claude-code.png)

## Install

Copy/paste into your Claude Code prompt:

```text
Install the tech-bought-my-soul plugin from https://github.com/5carl/tech-bought-my-soul, refer to the repo's AGENTS.md for instructions.
```

Or 🔗 [check the installation instructions](INSTALL.md).

## What changes

### Before

> Fixed the token check in `src/auth.ts:42`. Want me to run the auth tests, or should I show you the diff first?
>
> ```
> > _
> ```
>
> *(you, typing "run the tests" for the 30th time today)*

### After

> Fixed the token check in `src/auth.ts:42`. Want me to run the auth tests, or should I show you the diff first?
>
> ```
> [ 1: Go ]  2: Show me the diff  3: Run only auth.spec.ts  Dismiss
> ```
>
> *(you, pressing `1`)*

## Where it works

| Client | What you get | How you pick |
| --- | --- | --- |
| Claude Code (terminal) | A row of buttons above the prompt | Click, or press `1` to `4` with an empty prompt |
| [Paseo](https://paseo.sh) | Tappable chips under each agent turn, desktop and mobile | Tap |

Typing still works exactly like before. The buttons clear the moment you send anything.

![Paseo with predicted-reply chips under an agent turn](https://raw.githubusercontent.com/5carl/tech-bought-my-soul/main/assets/paseo.png)

## How it works

1. The plugin adds a short rule to Claude's system prompt: end each reply with one hidden line of predicted replies.
2. Claude writes it as a markdown reference definition, which every CommonMark renderer draws as nothing:

   ```markdown
   [abcs]: # (["Go", "Show me the diff", "Run only auth.spec.ts"])
   ```

3. The client reads that line and draws the buttons. The reply itself is untouched.

The first option is the most likely reply. Anything destructive or outward-facing (delete, force push, send, pay, publish) is never a bare "Go". It gets named, like "Yes, delete the 3 files", so every tap is an informed one.

## Pairs with i-have-adhd

They work alone, but they were made for each other. i-have-adhd makes every reply end with one concrete next action. tech-bought-my-soul makes that action one tap away.

## Tune it

The rule lives in `hooks/register.tsx` (`RULE`). The Paseo renderer lives in `paseo/client/abcs-row.tsx`. Fork, edit, reinstall from your fork (see [INSTALL.md](INSTALL.md)).

## Requirements

- Claude Code 2.1.296 or newer. The terminal buttons use Claude Code's early-access hooks-module API, which may change between releases.
- Paseo 0.9.1 or newer for the Paseo client, with plugins enabled.

## Credits

Companion to [i-have-adhd](https://github.com/ayghri/i-have-adhd) by Ayoub G.

The name is a lyric from Kendrick Lamar's "A.D.H.D". Not affiliated with or endorsed by Kendrick Lamar, TDE, or anybody with a Pulitzer.

## License

[MIT](LICENSE).

Star ⭐ if it saved you from typing "go" one more time.
