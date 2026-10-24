const visuals = ['cassian', 'synapse', 'snapshots', 'kessel', 'logs', 'tables']

export async function collectProjects(api, config, now = new Date()) {
  if (!/^[a-z\d](?:[a-z\d-]{0,38})$/i.test(config.username))
    throw new Error('Invalid GitHub username.')
  const username = config.username.toLowerCase()
  const excluded = new Set(config.exclude.map((name) => name.toLowerCase()))
  const includedForks = new Set(
    config.includeForks.map((name) => name.toLowerCase()),
  )
  const repositories = new Map()
  // Public endpoint, even with a locally privileged token: never enumerate private repos.
  for (let page = 1; ; page++) {
    const batch = await api.get(
      `/users/${config.username}/repos?type=owner&sort=full_name&per_page=100&page=${page}`,
    )
    if (!Array.isArray(batch)) throw new Error('Invalid repository response.')
    for (const repo of batch) {
      if (
        repo.private !== false ||
        repo.owner?.login?.toLowerCase() !== username ||
        excluded.has(repo.name.toLowerCase())
      )
        continue
      if (repo.fork && !includedForks.has(repo.name.toLowerCase())) continue
      repositories.set(repo.name.toLowerCase(), repo)
    }
    if (batch.length < 100) break
    if (page >= 100)
      throw new Error('Repository pagination exceeded its limit.')
  }
  const data = await api.graphql(
    `query($login:String!) { user(login:$login) { pinnedItems(first:6,types:REPOSITORY) { nodes { ... on Repository { nameWithOwner isPrivate } } } } }`,
    { login: config.username },
  )
  if (!data?.user?.pinnedItems?.nodes)
    throw new Error('Could not verify pinned projects.')
  const pinned = data.user.pinnedItems.nodes
    .filter(
      (repo) =>
        repo.isPrivate === false &&
        repo.nameWithOwner.split('/')[0].toLowerCase() === username,
    )
    .map((repo) => repo.nameWithOwner.split('/')[1].toLowerCase())
    .filter((name) => repositories.has(name))
  const copy = new Map(
    config.featured.map((project) => [project.repo.toLowerCase(), project]),
  )
  const recent = [...repositories.values()].sort(
    (a, b) =>
      (b.pushed_at || '').localeCompare(a.pushed_at || '') ||
      a.name.localeCompare(b.name),
  )
  // Pins lead; existing showcases fill available slots, then recently active repositories.
  const selections = [
    ...new Set([
      ...pinned,
      ...copy.keys(),
      ...recent.map((repo) => repo.name.toLowerCase()),
    ]),
  ]
    .filter(
      (name) => repositories.has(name) || copy.get(name)?.private === true,
    )
    .slice(0, config.featuredLimit)
  const featured = []
  for (const [index, name] of selections.entries()) {
    const repo = repositories.get(name)
    const prose = copy.get(name)
    if (!repo) {
      // Only already-published, explicitly selected private showcases have a fallback.
      featured.push({
        ...prose,
        github: `https://github.com/${config.username}/${prose.repo}`,
        private: true,
      })
      continue
    }
    const languages = await api.get(
      `/repos/${config.username}/${encodeURIComponent(repo.name)}/languages`,
    )
    const stack = Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([name]) => name)
    featured.push({
      title: repo.name,
      category: prose?.category || 'GitHub project',
      description:
        repo.description || 'Explore the source and README on GitHub.',
      stack: stack.length ? stack : ['Source on GitHub'],
      github: repo.html_url,
      visual: prose?.visual || visuals[index % visuals.length],
      note: repo.archived
        ? 'Archived on GitHub.'
        : 'Project details synced from GitHub.',
      private: false,
    })
  }
  const selected = new Set(selections)
  const otherProjects = recent
    .filter((repo) => !selected.has(repo.name.toLowerCase()))
    .map((repo) => ({
      title: repo.name,
      description:
        repo.description || 'Explore the source and README on GitHub.',
      stack:
        [
          repo.language,
          repo.fork ? 'Fork' : null,
          repo.archived ? 'Archived' : null,
        ]
          .filter(Boolean)
          .join(' / ') || 'Source on GitHub',
      repo: repo.name,
      github: repo.html_url,
    }))
  if (!repositories.size)
    throw new Error('No public projects found. Existing snapshot preserved.')
  return {
    username: config.username,
    syncedAt: now.toISOString(),
    featured,
    otherProjects,
  }
}
