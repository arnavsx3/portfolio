const sameUser = (a, b) => a?.toLowerCase() === b.toLowerCase()
const repositoryPattern = /^[\w.-]+\/[\w.-]+$/

const creditedAuthors = `authors(first: 100) {
  nodes { user { login } }
  pageInfo { hasNextPage }
}`

const commitCreditQuery = `query($owner: String!, $name: String!, $sha: GitObjectID!) {
  repository(owner: $owner, name: $name) {
    isPrivate
    object(oid: $sha) { ... on Commit {
      ${creditedAuthors}
      associatedPullRequests(first: 100) {
        nodes { number mergedAt repository { nameWithOwner isPrivate } }
        pageInfo { hasNextPage }
      }
    } }
  }
}`

const pullCreditQuery = `query($owner: String!, $name: String!, $number: Int!, $after: String) {
  repository(owner: $owner, name: $name) {
    isPrivate
    pullRequest(number: $number) {
      commits(first: 50, after: $after) {
        nodes { commit { ${creditedAuthors} } }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
}`

function hasCredit(authors, username) {
  if (authors.pageInfo.hasNextPage)
    throw new Error('Commit credit is incomplete. Snapshot not updated.')
  return authors.nodes.some(({ user }) => sameUser(user?.login, username))
}

async function verifyPullCredit(api, repository, number, username) {
  const [owner, name] = repository.split('/')
  let after = null
  do {
    const data = await api.graphql(pullCreditQuery, {
      owner,
      name,
      number,
      after,
    })
    if (!data.repository || data.repository.isPrivate !== false) return false
    const commits = data.repository.pullRequest?.commits
    if (!commits) return false
    if (commits.nodes.some(({ commit }) => hasCredit(commit.authors, username)))
      return true
    if (!commits.pageInfo.hasNextPage) return false
    if (!commits.pageInfo.endCursor || after === commits.pageInfo.endCursor) {
      throw new Error('Commit credit pagination stalled. Snapshot not updated.')
    }
    after = commits.pageInfo.endCursor
  } while (after)
  return false
}

export async function collectContributions(api, config, now = new Date()) {
  const { username } = config
  if (!/^[a-z\d](?:[a-z\d-]*[a-z\d])?$/i.test(username))
    throw new Error('Invalid GitHub username.')
  const publicExternal = `is:public -user:${username}`
  const candidates = new Map()
  const add = (repository, number, credited = false) => {
    if (
      !repositoryPattern.test(repository) ||
      !Number.isSafeInteger(number) ||
      number < 1
    )
      throw new Error('Invalid pull request identifier.')
    if (sameUser(repository.split('/')[0], username)) return
    const key = `${repository.toLowerCase()}#${number}`
    const previous = candidates.get(key)
    candidates.set(key, {
      repository,
      number,
      credited: credited || previous?.credited,
    })
  }

  // Curated entries are discovery hints, never evidence of merge or authorship.
  for (const key of Object.keys(config.pullRequests)) {
    const [repository, number] = key.split('#')
    add(repository, Number(number))
  }
  const pulls = await api.search(
    'issues',
    `is:pr is:merged author:${username} ${publicExternal}`,
  )
  for (const pull of pulls) {
    add(
      new URL(pull.repository_url).pathname.split('/').slice(2).join('/'),
      pull.number,
    )
  }

  const authored = await api.search(
    'commits',
    `author:${username} ${publicExternal}`,
  )
  const identities = new Set([username])
  const commits = new Map()
  const addCommit = (commit) => {
    if (
      commit.repository.private !== false ||
      sameUser(commit.repository.owner.login, username)
    )
      return
    commits.set(
      `${commit.repository.full_name.toLowerCase()}@${commit.sha}`,
      commit,
    )
  }
  for (const commit of authored) {
    addCommit(commit)
    // Public commit metadata supplies previously used credit aliases. Emails
    // stay in memory; they are never written to the public snapshot.
    if (
      commit.repository.private === false &&
      sameUser(commit.author?.login, username) &&
      commit.commit.author.email
    ) {
      identities.add(commit.commit.author.email)
    }
  }
  for (const identity of identities) {
    const safeIdentity = identity.replaceAll('"', '').replaceAll('\\', '')
    for (const commit of await api.search(
      'commits',
      `"Co-authored-by" "${safeIdentity}" ${publicExternal}`,
    ))
      addCommit(commit)
  }

  for (const commit of commits.values()) {
    const [owner, name] = commit.repository.full_name.split('/')
    const data = await api.graphql(commitCreditQuery, {
      owner,
      name,
      sha: commit.sha,
    })
    const source = data.repository
    if (!source || source.isPrivate !== false || !source.object) continue
    if (!hasCredit(source.object.authors, username)) continue
    const associated = source.object.associatedPullRequests
    if (associated.pageInfo.hasNextPage)
      throw new Error(
        'Associated pull requests are incomplete. Snapshot not updated.',
      )
    for (const pull of associated.nodes) {
      if (pull.mergedAt && pull.repository.isPrivate === false)
        add(pull.repository.nameWithOwner, pull.number, true)
    }
  }

  const projects = new Map()
  for (const { repository, number, credited } of candidates.values()) {
    const pull = await api.get(`/repos/${repository}/pulls/${number}`)
    const upstream = pull.base.repo
    if (
      !pull.merged_at ||
      upstream.private !== false ||
      sameUser(upstream.owner.login, username)
    )
      continue
    const authoredPull = sameUser(pull.user.login, username)
    if (
      !authoredPull &&
      !credited &&
      !(await verifyPullCredit(api, repository, number, username))
    ) {
      throw new Error(
        `Unable to verify contribution credit for ${repository}#${number}. Snapshot not updated.`,
      )
    }
    const key = upstream.full_name.toLowerCase()
    if (!projects.has(key)) {
      projects.set(key, {
        repository: upstream.full_name,
        name: upstream.name,
        description: upstream.description || '',
        language: upstream.language || '',
        url: upstream.html_url,
        contributions: [],
      })
    }
    const project = projects.get(key)
    if (
      pull.head.repo &&
      !pull.head.repo.private &&
      sameUser(pull.head.repo.owner.login, username)
    )
      project.fork = pull.head.repo.html_url
    project.contributions.push({
      number,
      title: pull.title,
      url: pull.html_url,
      mergedAt: pull.merged_at,
      coauthored: !authoredPull,
    })
  }
  const result = [...projects.values()]
  for (const project of result)
    project.contributions.sort(
      (a, b) => b.mergedAt.localeCompare(a.mergedAt) || b.number - a.number,
    )
  result.sort((a, b) => a.repository.localeCompare(b.repository))
  return { username, syncedAt: now.toISOString(), projects: result }
}
