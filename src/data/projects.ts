import snapshot from './projects.generated.json'

export type ProjectVisual =
  'cassian' | 'synapse' | 'snapshots' | 'kessel' | 'logs' | 'tables'
export interface Project {
  title: string
  category: string
  description: string
  stack: string[]
  github: string
  visual: ProjectVisual
  note: string
  private?: boolean
}
export interface OtherProject {
  title: string
  description: string
  stack: string
  repo: string
  github: string
}

// GitHub supplies project membership and metadata at each successful sync.
export const projects: Project[] = snapshot.featured as Project[]
export const otherProjects: OtherProject[] = snapshot.otherProjects
export const projectsSyncedAt = snapshot.syncedAt
