import test from 'node:test'
import assert from 'node:assert/strict'
import { collectProjects } from './projects.mjs'
const config = {
  username: 'dev',
  featuredLimit: 1,
  exclude: ['dev', 'portfolio'],
  includeForks: ['learning-fork'],
  featured: [
    {
      repo: 'showcase',
      title: 'Showcase',
      description: 'Explicit private showcase.',
      stack: ['Rust'],
      category: 'Tools',
      visual: 'logs',
      private: true,
    },
  ],
}
const repo = (name, extra = {}) => ({
  name,
  private: false,
  owner: { login: 'dev' },
  html_url: `https://github.com/dev/${name}`,
  description: `${name} description`,
  language: 'Rust',
  pushed_at: '2026-10-01',
  ...extra,
})
function api(repos, pins = [], calls = []) {
  return {
    get: async (path) => {
      calls.push(path)
      if (path.endsWith('/languages')) return { Rust: 100, Shell: 2 }
      const page = Number(
        new URL(`https://api.github.com${path}`).searchParams.get('page'),
      )
      return repos.slice((page - 1) * 100, page * 100)
    },
    graphql: async () => ({
      user: {
        pinnedItems: {
          nodes: pins.map((name) => ({
            nameWithOwner: `dev/${name}`,
            isPrivate: false,
          })),
        },
      },
    }),
  }
}
test('new public repositories increase More Projects without editing config', async () => {
  const before = await collectProjects(
    api([repo('showcase'), repo('first')]),
    config,
  )
  const after = await collectProjects(
    api([repo('showcase'), repo('first'), repo('new-build')]),
    config,
  )
  assert.equal(after.otherProjects.length, before.otherProjects.length + 1)
  assert.equal(
    after.otherProjects.find((p) => p.repo === 'new-build').description,
    'new-build description',
  )
})
test('pins select featured projects and metadata/languages come from GitHub', async () => {
  const result = await collectProjects(
    api([repo('showcase'), repo('pinned')], ['pinned']),
    config,
  )
  assert.equal(result.featured[0].title, 'pinned')
  assert.deepEqual(result.featured[0].stack, ['Rust', 'Shell'])
  assert.equal(result.otherProjects[0].repo, 'showcase')
})
test('private, foreign, profile, portfolio and unrelated forks are excluded', async () => {
  const result = await collectProjects(
    api([
      repo('showcase'),
      repo('private', { private: true }),
      repo('foreign', { owner: { login: 'other' } }),
      repo('dev'),
      repo('portfolio'),
      repo('fork', { fork: true }),
      repo('learning-fork', { fork: true }),
    ]),
    config,
  )
  assert.deepEqual(
    result.otherProjects.map((p) => p.repo),
    ['learning-fork'],
  )
})
test('public visibility replaces a previously private showcase label and copy', async () => {
  const result = await collectProjects(api([repo('showcase')]), config)
  assert.equal(result.featured[0].private, false)
  assert.equal(result.featured[0].description, 'showcase description')
})
test('only explicit prepublished private showcases retain fallback; deleted public projects disappear', async () => {
  const result = await collectProjects(api([repo('remaining')]), config)
  assert.equal(result.featured[0].private, true)
  assert.equal(result.otherProjects[0].repo, 'remaining')
})
test('repository discovery paginates beyond 100 entries', async () => {
  const calls = []
  const result = await collectProjects(
    api(
      Array.from({ length: 101 }, (_, i) => repo(`repo-${i}`)),
      [],
      calls,
    ),
    { ...config, featured: [] },
  )
  assert.equal(result.featured.length + result.otherProjects.length, 101)
  assert.ok(calls.some((path) => path.endsWith('page=2')))
})
test('incomplete or failed responses abort instead of publishing an empty list', async () => {
  await assert.rejects(collectProjects(api([]), config), /No public projects/)
  await assert.rejects(
    collectProjects(
      {
        get: async () => {
          throw new Error('API unavailable')
        },
      },
      config,
    ),
    /API unavailable/,
  )
  await assert.rejects(
    collectProjects(
      { ...api([repo('first')]), graphql: async () => ({}) },
      config,
    ),
    /verify pinned/,
  )
})

test('deleted or newly private public showcases disappear instead of leaving stale cards', async () => {
  const result = await collectProjects(
    api([repo('replacement'), repo('showcase', { private: true })]),
    { ...config, featured: [{ repo: 'showcase', visual: 'logs' }] },
  )
  assert.equal(result.featured[0].title, 'replacement')
  assert.equal(result.otherProjects.length, 0)
})
