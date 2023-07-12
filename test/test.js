import assParser from '../index.js'
import test from 'tape'
import fs from 'fs'

const sample = encoding => fs.readFileSync(new URL('sample.ass', import.meta.url), { encoding })
const subtitleWithComments = JSON.parse(fs.readFileSync(new URL('sample.json', import.meta.url), { encoding: 'utf-8' }))

const subtitleWithoutComments = subtitleWithComments.map(section => {
  const clone = structuredClone(section)
  clone.body = clone.body.filter(({ type }) => type !== 'comment')
  return clone
})

test('ass-parser', t => {
  t.deepEqual(assParser(sample('utf8')),
    subtitleWithoutComments,
    'without comments')
  t.deepEqual(assParser(sample('utf8'), { comments: true }),
    subtitleWithComments,
    'with comments')
  t.deepEqual(assParser(sample(null)),
    subtitleWithoutComments,
    'without comments (buffer)')
  t.end()
})
