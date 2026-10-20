import { expect, test } from 'claude-code/testing'

import { parseAbcs, stripAbcs } from './register'

const reply = 'Fixed the login bug.\n\n[abcs]: # (["Go", "Run the tests first", "Show me the diff"])'

test('parses the last abcs block', () => {
  expect(parseAbcs(reply)).toEqual(['Go', 'Run the tests first', 'Show me the diff'])
  expect(parseAbcs('[abcs]: # (["old"])\ntext\n[abcs]: # (["new"])')).toEqual(['new'])
})

test('ignores bad or missing blocks and caps at four', () => {
  expect(parseAbcs('no block here')).toEqual([])
  expect(parseAbcs('[abcs]: # ([not json])')).toEqual([])
  expect(parseAbcs('[abcs]: # (["a","b","c","d","e", 3, ""])')).toEqual(['a', 'b', 'c', 'd'])
})

test('strips the block from what is drawn', () => {
  expect(stripAbcs(reply)).toBe('Fixed the login bug.')
})

test('ignores the line mid-sentence', () => {
  expect(parseAbcs('see [abcs]: # (["x"]) here')).toEqual([])
})
