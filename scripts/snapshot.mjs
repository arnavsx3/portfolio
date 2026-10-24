import { execFileSync } from 'node:child_process'
import { writeFile, rename, rm } from 'node:fs/promises'

export function githubToken() {
  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN
  if (token) return token
  try {
    return execFileSync('gh', ['auth', 'token'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
  } catch {
    throw new Error(
      'Sign in with gh auth login, or set GH_TOKEN, before syncing.',
    )
  }
}
export async function writeSnapshot(name, snapshot) {
  const target = new URL(`../src/data/${name}.generated.json`, import.meta.url)
  const temporary = new URL(
    `../src/data/${name}.${process.pid}.tmp`,
    import.meta.url,
  )
  try {
    await writeFile(temporary, `${JSON.stringify(snapshot, null, 2)}\n`)
    await rename(temporary, target)
  } finally {
    await rm(temporary, { force: true })
  }
}
