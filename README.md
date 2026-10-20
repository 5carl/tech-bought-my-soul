# tech-bought-my-soul

**Tap the next message instead of typing it.** It's a companion to [i-have-adhd](https://github.com/ayghri/i-have-adhd).

[![License](https://img.shields.io/badge/license-MIT-blue?style=flat)](LICENSE)

> PlayStation and some drank *(technology bought my soul)*
>
> Kendrick Lamar, "A.D.H.D", *Section.80* (2011)

So i-have-adhd changed how Claude talks to you, and this changes how you talk back.

When Claude leaves you a next move, the reply ends with 2 to 4 buttons. Those are the messages you were most likely about to type anyway. Tap one and it sends. No more typing "go", "yes do 2", or "1B" forty times a day.

Starting is usually the hardest part, and a button is just about the smallest start you can get.

![Claude Code with three predicted-reply buttons above the prompt](https://raw.githubusercontent.com/5carl/tech-bought-my-soul/main/assets/claude-code.png)

## Install

Paste this into Claude Code and it'll handle the install for you.

```text
Install the tech-bought-my-soul plugin from https://github.com/5carl/tech-bought-my-soul, refer to the repo's AGENTS.md for instructions.
```

If you'd rather do it by hand, the steps are in [INSTALL.md](INSTALL.md).

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

Typing works the same as before, and the buttons clear as soon as you send anything.

![Paseo with predicted-reply chips under an agent turn](https://raw.githubusercontent.com/5carl/tech-bought-my-soul/main/assets/paseo.png)

## How it works

1. The plugin adds a short rule to Claude's system prompt. The rule tells Claude to end each reply with one hidden line of predicted replies.
2. Claude writes that line as a markdown reference definition. That's a fancy way of saying a link definition nothing ever uses, so every CommonMark renderer just draws it as nothing.

   ```markdown
   [abcs]: # (["Go", "Show me the diff", "Run only auth.spec.ts"])
   ```

3. The client reads that line and draws the buttons. The reply itself doesn't change.

The first button is the most likely reply. Anything destructive or outward-facing, like delete, force push, send, pay, or publish, never shows up as a bare "Go". It gets spelled out, like "Yes, delete the 3 files", so you know exactly what you're tapping.

## Pairs with i-have-adhd

Each one works on its own, but they were built to go together. i-have-adhd makes every reply end with one concrete next action, and tech-bought-my-soul puts that action one tap away.

## Tune it

The rule lives in `hooks/register.tsx` (`RULE`), and the Paseo renderer lives in `paseo/client/abcs-row.tsx`. Fork it, edit it, and reinstall from your fork. [INSTALL.md](INSTALL.md) has the steps.

## Requirements

- Claude Code 2.1.296 or newer. The terminal buttons use Claude Code's early-access hooks-module API, so that part could change between releases.
- Paseo 0.9.1 or newer for the Paseo client, with plugins turned on.

## Credits

Companion to [i-have-adhd](https://github.com/ayghri/i-have-adhd) by Ayoub G.

The name comes from a lyric in Kendrick Lamar's "A.D.H.D". This project isn't affiliated with or endorsed by Kendrick Lamar, TDE, or anybody with a Pulitzer.

## License

[MIT](LICENSE).

Star ⭐ if it saved you from typing "go" one more time.
