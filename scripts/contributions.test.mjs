import assert from 'node:assert/strict'
import test from 'node:test'
import { collectContributions } from './contributions.mjs'
import { githubClient } from './github.mjs'

const username = 'contributor'
const config = { username, pullRequests: {} }
const pageInfo = { hasNextPage: false }
const authors = (login) => ({ nodes: [{ user: { login } }], pageInfo })
const repo = (name = 'upstream/tool') => ({
  full_name: name,
  name: name.split('/')[1],
  owner: { login: name.split('/')[0] },
  private: false,
  html_url: `https://github.com/${name}`,
  description: 'A public tool.',
  language: 'Go',
})
const pull = (number, options = {}) => ({
  number,
  title: `Fix ${number}`,
  html_url: `https://github.com/upstream/tool/pull/${number}`,
  merged_at: '2026-10-24T05:48:21Z',
  user: { login: username },
  base: { repo: repo() },
  head: { repo: repo(`${username}/tool`) },
  ...options,
})
const commit = (sha = 'abc') => ({
  sha,
  repository: repo(),
  author: { login: username },
  commit: { author: { email: 'verified@example.com' } },
})
const issue = (number) => ({
  number,
  repository_url: 'https://api.github.com/repos/upstream/tool',
})

function fakeApi({
  pulls = [],
  authoredCommits = [],
  coauthoredCommits = [],
  records = {},
  credit = username,
} = {}) {
  return {
    async search(kind, query) {
      if (kind === 'issues') return pulls
      return query.startsWith('author:') ? authoredCommits : coauthoredCommits
    },
    async get(path) {
      assert.ok(records[path], `Unexpected API request: ${path}`)
      return records[path]
    },
    async graphql(_query, variables) {
      assert.ok(variables.sha, 'Unexpected pull-credit request')
      return {
        repository: {
          isPrivate: false,
          object: {
            authors: authors(credit),
            associatedPullRequests: {
              nodes: [
                {
                  number: 1,
                  mergedAt: '2026-10-24T05:48:21Z',
                  repository: {
                    nameWithOwner: 'upstream/tool',
                    isPrivate: false,
                  },
                },
              ],
              pageInfo,
            },
          },
        },
      }
    },
  }
}

test('discovers a new upstream project and orders verified merged cards newest first', async () => {
  const api = fakeApi({
    pulls: [issue(1), issue(2)],
    records: {
      '/repos/upstream/tool/pulls/1': pull(1, {
        merged_at: '2026-10-20T00:00:00Z',
      }),
      '/repos/upstream/tool/pulls/2': pull(2),
    },
  })
  const result = await collectContributions(
    api,
    config,
    new Date('2026-10-24T12:00:00Z'),
  )
  assert.equal(result.projects[0].repository, 'upstream/tool')
  assert.equal(result.projects[0].fork, `https://github.com/${username}/tool`)
  assert.deepEqual(
    result.projects[0].contributions.map((p) => p.number),
    [2, 1],
  )
  assert.equal(result.projects[0].contributions[0].coauthored, false)
  assert.equal(result.syncedAt, '2026-10-24T12:00:00.000Z')
})

test('deduplicates curated, authored, and commit-linked discoveries', async () => {
  const api = fakeApi({
    pulls: [issue(1)],
    authoredCommits: [commit()],
    coauthoredCommits: [commit()],
    records: { '/repos/upstream/tool/pulls/1': pull(1) },
  })
  const result = await collectContributions(api, {
    username,
    pullRequests: { 'upstream/tool#1': { title: 'A curated title' } },
  })
  assert.equal(result.projects[0].contributions.length, 1)
  assert.equal(result.projects[0].contributions[0].title, 'Fix 1')
  assert.equal(result.projects[0].contributions[0].coauthored, false)
})

test('counts co-authored work only after GitHub links the commit credit to the account', async () => {
  const options = {
    coauthoredCommits: [commit()],
    records: {
      '/repos/upstream/tool/pulls/1': pull(1, {
        user: { login: 'maintainer' },
      }),
    },
  }
  const credited = await collectContributions(fakeApi(options), config)
  assert.equal(credited.projects[0].contributions[0].coauthored, true)
  const mentionOnly = await collectContributions(
    fakeApi({ ...options, credit: 'someone-else' }),
    config,
  )
  assert.equal(mentionOnly.projects.length, 0)
})

test('uses verified public author aliases for discovery without publishing their emails', async () => {
  const api = fakeApi({
    authoredCommits: [commit()],
    records: { '/repos/upstream/tool/pulls/1': pull(1) },
  })
  const queries = []
  const search = api.search
  api.search = async (kind, query) => {
    queries.push(query)
    return search(kind, query)
  }
  const result = await collectContributions(api, config)
  assert.ok(queries.some((q) => q.includes('"verified@example.com"')))
  assert.ok(!JSON.stringify(result).includes('verified@example.com'))
})

test('never displays private, self-owned, or closed-but-unmerged PRs', async () => {
  const api = fakeApi({
    pulls: [issue(1), issue(2), issue(3)],
    records: {
      '/repos/upstream/tool/pulls/1': pull(1, { merged_at: null }),
      '/repos/upstream/tool/pulls/2': pull(2, {
        base: { repo: { ...repo(), private: true } },
      }),
      '/repos/upstream/tool/pulls/3': pull(3, {
        base: { repo: repo(`${username}/tool`) },
      }),
    },
  })
  assert.equal((await collectContributions(api, config)).projects.length, 0)
})

test('curated credit hints are verified across all commit pages', async () => {
  const api = fakeApi({
    records: {
      '/repos/upstream/tool/pulls/1': pull(1, {
        user: { login: 'maintainer' },
      }),
    },
  })
  const cursors = []
  api.graphql = async (_query, { after }) => {
    cursors.push(after)
    return {
      repository: {
        isPrivate: false,
        pullRequest: {
          commits: {
            nodes: [
              { commit: { authors: authors(after ? username : 'maintainer') } },
            ],
            pageInfo: { hasNextPage: !after, endCursor: 'second-page' },
          },
        },
      },
    }
  }
  const result = await collectContributions(api, {
    username,
    pullRequests: { 'upstream/tool#1': {} },
  })
  assert.deepEqual(cursors, [null, 'second-page'])
  assert.equal(result.projects[0].contributions[0].coauthored, true)
})

test('unverified editorial attribution aborts instead of producing a misleading card', async () => {
  const api = fakeApi({
    records: {
      '/repos/upstream/tool/pulls/1': pull(1, {
        user: { login: 'maintainer' },
      }),
    },
  })
  api.graphql = async () => ({
    repository: {
      isPrivate: false,
      pullRequest: {
        commits: {
          nodes: [{ commit: { authors: authors('maintainer') } }],
          pageInfo,
        },
      },
    },
  })
  await assert.rejects(
    collectContributions(api, {
      username,
      pullRequests: { 'upstream/tool#1': {} },
    }),
    /Unable to verify contribution credit/,
  )
})

test('the API client follows search pagination', async () => {
  const pages = []
  const client = githubClient('test-token', async (url) => {
    const page = Number(new URL(url).searchParams.get('page'))
    pages.push(page)
    return Response.json({
      total_count: 101,
      incomplete_results: false,
      items: Array.from({ length: page === 1 ? 100 : 1 }, (_, n) => ({ n })),
    })
  })
  assert.equal((await client.search('issues', 'query')).length, 101)
  assert.deepEqual(pages, [1, 2])
})

test('incomplete search and API failures abort the sync', async () => {
  const incomplete = githubClient('test-token', async () =>
    Response.json({ total_count: 1001, incomplete_results: false, items: [] }),
  )
  await assert.rejects(incomplete.search('issues', 'query'), /incomplete/)
  const failed = githubClient('test-token', async () =>
    Response.json({}, { status: 403 }),
  )
  await assert.rejects(failed.search('issues', 'query'), /Snapshot not updated/)
  const graphql = githubClient('test-token', async () =>
    Response.json({ errors: [{ message: 'denied' }] }),
  )
  await assert.rejects(graphql.graphql('query', {}), /could not verify/)
})
