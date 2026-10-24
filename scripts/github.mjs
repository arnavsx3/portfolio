import { setTimeout as delay } from 'node:timers/promises'

export function githubClient(token, fetchImpl = fetch) {
  if (!token)
    throw new Error(
      'GitHub authentication is required to verify contribution credit.',
    )

  async function request(path, body) {
    for (let attempt = 0; attempt < 3; attempt++) {
      const response = await fetchImpl(`https://api.github.com${path}`, {
        method: body ? 'POST' : 'GET',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`,
          'X-GitHub-Api-Version': '2026-03-10',
          ...(body ? { 'Content-Type': 'application/json' } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(30_000),
      })
      if ((response.status >= 500 || response.status === 429) && attempt < 2) {
        await delay(1000 * (attempt + 1))
        continue
      }
      if (!response.ok)
        throw new Error(
          `GitHub returned ${response.status} for ${path.split('?')[0]}. Snapshot not updated.`,
        )
      const result = await response.json()
      if (result.errors)
        throw new Error(
          'GitHub could not verify contribution credit. Snapshot not updated.',
        )
      return result
    }
  }

  return {
    get: request,
    async graphql(query, variables) {
      return (await request('/graphql', { query, variables })).data
    },
    async search(kind, query) {
      const items = []
      for (let page = 1; page <= 10; page++) {
        const params = new URLSearchParams({
          q: query,
          per_page: '100',
          page: String(page),
        })
        const result = await request(`/search/${kind}?${params}`)
        if (result.incomplete_results || result.total_count > 1000) {
          throw new Error(
            'GitHub search was incomplete. Snapshot not updated; narrow discovery before retrying.',
          )
        }
        items.push(...result.items)
        if (items.length >= result.total_count) return items
        if (!result.items.length)
          throw new Error(
            'GitHub search pagination ended early. Snapshot not updated.',
          )
      }
      throw new Error(
        'GitHub search pagination exceeded its limit. Snapshot not updated.',
      )
    },
  }
}
