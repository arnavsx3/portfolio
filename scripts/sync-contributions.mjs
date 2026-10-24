import { execFileSync } from 'node:child_process'
import { readFile, writeFile, rename, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { githubClient } from './github.mjs'
import { collectContributions } from './contributions.mjs'

export async function syncContributions() {
  let token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN
  if (!token) {
    try {
      token = execFileSync('gh', ['auth', 'token'], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim()
    } catch {
      throw new Error(
        'Sign in with gh auth login, or set GH_TOKEN, before syncing.',
      )
    }
  }
  const config = JSON.parse(
    await readFile(
      new URL('../contributions.config.json', import.meta.url),
      'utf8',
    ),
  )
  const snapshot = await collectContributions(githubClient(token), config)
  if (!snapshot.projects.length)
    throw new Error(
      'No verified contributions found. Existing snapshot preserved.',
    )
  const target = new URL(
    '../src/data/contributions.generated.json',
    import.meta.url,
  )
  const temporary = new URL(
    `../src/data/contributions.${process.pid}.tmp`,
    import.meta.url,
  )
  try {
    await writeFile(temporary, `${JSON.stringify(snapshot, null, 2)}\n`)
    await rename(temporary, target)
  } finally {
    await rm(temporary, { force: true })
  }
  console.log(
    `Verified ${snapshot.projects.reduce((n, p) => n + p.contributions.length, 0)} merged contributions across ${snapshot.projects.length} projects.`,
  )
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  syncContributions().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
}
