import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { githubClient } from './github.mjs'
import { githubToken, writeSnapshot } from './snapshot.mjs'
import { collectProjects } from './projects.mjs'

export async function syncProjects() {
  const config = JSON.parse(
    await readFile(new URL('../projects.config.json', import.meta.url), 'utf8'),
  )
  const snapshot = await collectProjects(githubClient(githubToken()), config)
  await writeSnapshot('projects', snapshot)
  console.log(
    `Verified ${snapshot.featured.length} featured and ${snapshot.otherProjects.length} more projects.`,
  )
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  syncProjects().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
}
