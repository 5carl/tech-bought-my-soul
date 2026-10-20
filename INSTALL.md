# How to install

## Claude Code

### Install

```bash
claude plugin marketplace add 5carl/tech-bought-my-soul
claude plugin install tech-bought-my-soul@tech-bought-my-soul
```

Start a new session. The rule loads with it, and buttons appear above the prompt after the next reply that leaves a move open.

### Verify

```bash
claude plugin list
claude -p "Propose a command to rename folder old to new. Don't run it."
```

The second command's output should end with a line starting `[abcs]: # (`.

### Update

```bash
claude plugin marketplace update tech-bought-my-soul
claude plugin update tech-bought-my-soul@tech-bought-my-soul
```

### Uninstall

```bash
claude plugin uninstall tech-bought-my-soul@tech-bought-my-soul
claude plugin marketplace remove tech-bought-my-soul
```

Or keep it installed and turn it off: `claude plugin disable tech-bought-my-soul@tech-bought-my-soul`.

## Paseo

The Paseo client draws the buttons. The rule that makes Claude write the hidden line comes from the Claude Code plugin, so install that one too. Paseo's Claude agents load your user plugins.

### Enable plugins

Plugins are trusted, unsandboxed code. Turn them on in **Settings → Plugins → Enable plugins**, or set `"pluginsEnabled": true` in the daemon's `config.json` and run `paseo reload`.

### Install

```bash
paseo plugin install git:5carl/tech-bought-my-soul:paseo
```

### Verify

```bash
paseo plugin ls
```

`tech-bought-my-soul` should report `running`. Ask an agent something with a next step, and chips appear under its reply.

### Update / uninstall

```bash
paseo plugin update tech-bought-my-soul
paseo plugin remove tech-bought-my-soul
```

## From a local clone (development)

```bash
git clone https://github.com/5carl/tech-bought-my-soul
cd tech-bought-my-soul
claude plugin marketplace add "$PWD"
claude plugin install tech-bought-my-soul@tech-bought-my-soul

cd paseo && npm install && npm run typecheck
paseo plugin install "$PWD"
```

After editing, run `claude plugin update tech-bought-my-soul@tech-bought-my-soul` (bump the version in `.claude-plugin/plugin.json` first) and `paseo plugin reload tech-bought-my-soul`.

