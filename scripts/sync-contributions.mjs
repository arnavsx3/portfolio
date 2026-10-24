import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { githubClient } from './github.mjs'
import { collectContributions } from './contributions.mjs'
import { githubToken, writeSnapshot } from './snapshot.mjs'

export async function syncContributions() {
  const token = githubToken()
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
  await writeSnapshot('contributions', snapshot)
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
