import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Options } from '../types'

// Claude ends a reply with [abcs]: # (["Go", "Do 2 first"]), a markdown reference
// definition, so Paseo's markdown-it draws nothing for it. The band above the
// prompt turns each entry into a button that sends it as your next message.
const BLOCK = /^\[abcs\]:[ \t]*#[ \t]*\((\[.*\])\)[ \t]*$/gm
const MAX = 4

const RULE = `# tech-bought-my-soul (clickable replies)

The reader taps buttons instead of typing. End every reply that leaves a next move open with ONE hidden line, last in the message, after a blank line:

[abcs]: # (["Go", "Do step 2 first", "Show me the diff"])

- Exactly that shape on one line: \`[abcs]: # (\` then a JSON array then \`)\`. It is a markdown reference definition, so it renders as nothing. No parentheses inside the entries.
- 2 to 4 entries, a JSON array of strings, each the exact message the reader would send next, written in their voice, under 60 characters.
- First entry is the most likely reply. When you proposed an action, it is "Go".
- Predict real replies: answers to the question you asked, the obvious next step, a likely correction. Never "Something else" (typing covers that).
- Never put a destructive or outward-facing action (delete, force push, send, pay, publish) as a bare "Go". Name it ("Yes, delete the 3 files") so the click is informed.
- Skip the line when nothing is open, such as a finished answer with no next step.
- Do not mention the line or the buttons in your prose.`

const options = atom({ plugin: 'tech-bought-my-soul', key: 'options' } as const, [] as Options)

export function parseAbcs(text: string): string[] {
  let last: string | undefined
  for (const m of text.matchAll(BLOCK)) last = m[1]
  if (!last) return []
  try {
    const parsed: unknown = JSON.parse(last)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((o): o is string => typeof o === 'string' && o.trim() !== '')
      .map(o => o.trim().slice(0, 120))
      .slice(0, MAX)
  } catch {
    return []
  }
}

export function stripAbcs(text: string): string {
  return text.replace(BLOCK, '').trimEnd()
}

export const register: Register = on => {
  on('prompt.compose', async ($, e, next) => {
    const result = await next(e)
    return {
      ...result,
      sections: [...result.sections, { id: 'tech-bought-my-soul:rule', text: RULE, scope: 'session' }],
    }
  })

  on('turn.complete', async ($, e, next) => {
    if (e.agentId === undefined) {
      const found = e.isAborted ? [] : parseAbcs(e.answer)
      await update($, options, () => found)
    }
    return next(e)
  })

  // Anything typed or sent clears the old buttons.
  on('prompt.submit', ($, e, next) => {
    update($, options, () => []).catch(() => {})
    return next(e)
  })

  on('ui.render', { component: 'AssistantMessage' }, ($, e, next) => {
    const text = stripAbcs(e.props.text)
    return text === e.props.text ? next(e) : next({ ...e, props: { ...e.props, text } })
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const opts = await read($, options)
    if (e.props.hasSurvey || opts.length === 0) return next(e)

    const { Box, Button } = $.ui.resolve(e)
    const send = (text: string) => async () => {
      await update($, options, () => [])
      await $.prompt.submit({ text, asUser: true })
    }

    return (
      <Box flexDirection="row" gap={2}>
        {opts.map((o, i) => (
          <Button
            key={`abc-${i}`}
            hotkey={String(i + 1)}
            variant={i === 0 ? 'primary' : undefined}
            label={o}
            onPress={send(o)}
          />
        ))}
        <Button key="dismiss" dimColor label="Dismiss" onPress={() => update($, options, () => [])} />
      </Box>
    )
  })
}
