Shows the replies you were most likely to send next as buttons under an agent's turn. Tap one and Paseo sends it to that agent as your next message.

## How it works

The agent ends its reply with one hidden line that lists 2 to 4 predicted replies.

```markdown
[abcs]: # (["Go", "Show me the diff", "Run only auth.spec.ts"])
```

It is a markdown reference definition, so the chat draws nothing for it. When a turn completes, the plugin reads the last such line in the reply and adds a row of buttons below it. The first button is the most likely reply. Tapping a button or Dismiss hides the row. Buttons are disabled while the agent is running.

## Setup

This plugin only draws the buttons. The agent has to be told to write the hidden line. The companion Claude Code plugin in the same repository adds that rule to Claude's system prompt, and Paseo's Claude agents load your Claude Code user plugins. See the [README](https://github.com/5carl/tech-bought-my-soul#install) for setup. Other providers show buttons only if you give them the same instruction yourself, for example in an agent profile or `AGENTS.md`.

Requires Paseo 0.11.0 or later. Works on desktop, web and mobile.

## Data access

The plugin reads the text of an agent's last reply when its turn ends. It sends nothing over the network, reads no files or credentials, and runs no commands. Tapping a button sends that button's text to the agent, which passes it to the agent's provider like any message you type.

## Limitations

- Buttons appear only after a turn completes, not on failed or stopped turns.
- At most 4 buttons, each trimmed to 120 characters.
- The predictions come from the agent, so their quality depends on the model and the instruction it was given.
