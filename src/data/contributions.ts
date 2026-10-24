import config from '../../contributions.config.json'
import snapshot from './contributions.generated.json'

export interface Contribution {
  number: number
  title: string
  detail?: string
  status: 'Merged'
  url: string
  mergedAt: string
  coauthored: boolean
  originalPullRequest?: { number: number; url: string }
}

export interface OpenSourceProject {
  repository: string
  name: string
  scope: string
  description: string
  url: string
  fork?: string
  contributions: Contribution[]
}

interface Editorial {
  projects: Record<
    string,
    { name: string; scope: string; description: string; fork?: string }
  >
  pullRequests: Record<
    string,
    {
      title: string
      detail: string
      originalPullRequest?: { number: number; url: string }
    }
  >
}

interface ContributionSnapshot {
  syncedAt: string
  projects: {
    repository: string
    name: string
    description: string
    language: string
    url: string
    fork?: string
    contributions: Omit<
      Contribution,
      'status' | 'detail' | 'originalPullRequest'
    >[]
  }[]
}

const editorial = config as Editorial
const projectOrder = Object.keys(editorial.projects).map((name) =>
  name.toLowerCase(),
)
const projectCopy = new Map(
  Object.entries(editorial.projects).map(([key, value]) => [
    key.toLowerCase(),
    value,
  ]),
)
const pullCopy = new Map(
  Object.entries(editorial.pullRequests).map(([key, value]) => [
    key.toLowerCase(),
    value,
  ]),
)

// GitHub supplies status and credit; optional editorial copy only supplies prose.
// The browser reads this bundled snapshot, never a GitHub token or live API.
const verified = snapshot as ContributionSnapshot
export const contributionsSyncedAt = verified.syncedAt
export const openSourceProjects: OpenSourceProject[] = verified.projects
  .map((project) => {
    const copy = projectCopy.get(project.repository.toLowerCase())
    return {
      ...project,
      name: copy?.name ?? project.name,
      description: copy?.description ?? project.description,
      fork: copy?.fork ?? project.fork,
      scope:
        copy?.scope ??
        (project.language
          ? `${project.language} / Open source`
          : 'Open source'),
      contributions: project.contributions.map((pr) => {
        const prose = pullCopy.get(
          `${project.repository}#${pr.number}`.toLowerCase(),
        )
        return {
          ...pr,
          title: prose?.title ?? pr.title,
          detail: prose?.detail,
          originalPullRequest: prose?.originalPullRequest,
          status: 'Merged' as const,
        }
      }),
    }
  })
  .sort((a, b) => {
    const rank = (name: string) => {
      const index = projectOrder.indexOf(name.toLowerCase())
      return index < 0 ? projectOrder.length : index
    }
    return (
      rank(a.repository) - rank(b.repository) ||
      a.repository.localeCompare(b.repository)
    )
  })
