export type ProjectCategory = 'Systems' | 'Tools' | 'Experiments'
export type ProjectVisual = 'kessel' | 'network' | 'fence' | 'drift' | 'sand' | 'logs'

export interface Project {
  title: string
  category: ProjectCategory
  description: string
  stack: string[]
  github: string
  visual: ProjectVisual
  note: string
}

// Keep the portfolio static and curated: no client-side API quota or access token.
export const projects: Project[] = [
  {
    title: 'Kessel',
    category: 'Systems',
    description: 'What if the pit stop happened a lap earlier? A distributed F1 simulator that puts Kubernetes to work on the counterfactuals.',
    stack: ['Python', 'FastAPI', 'Kubernetes', 'MinIO'],
    github: 'https://github.com/arnavsx3/kessel',
    visual: 'kessel',
    note: 'Parallel workers. Reproducible outcomes.',
  },
  {
    title: 'NetSentry',
    category: 'Systems',
    description: 'Making network health visible. A Go telemetry API, threshold-based alerts, and a dashboard that updates over WebSockets.',
    stack: ['Go', 'PostgreSQL', 'Next.js', 'Docker'],
    github: 'https://github.com/arnavsx3/net-sentry',
    visual: 'network',
    note: 'From telemetry to a clearer picture.',
  },
  {
    title: 'OriginFence',
    category: 'Tools',
    description: 'A team-built Linux prototype for tracing AI-agent process chains, applying runtime policies, and explaining the verdict.',
    stack: ['Python', 'strace', 'SQLite'],
    github: 'https://github.com/arnavsx3/origin-fence',
    visual: 'fence',
    note: 'Guard the chain. Understand the action.',
  },
  {
    title: 'Drift',
    category: 'Experiments',
    description: 'One button. A hidden clock. A multiplayer timing game where your internal sense of seven seconds is the whole challenge.',
    stack: ['Elixir', 'OTP', 'Phoenix LiveView'],
    github: 'https://github.com/arnavsx3/Drift',
    visual: 'drift',
    note: 'Trust your timing. Lose track of time.',
  },
  {
    title: 'Dunefall',
    category: 'Experiments',
    description: 'A tiny terminal world of sand, water, and beautiful chaos. A C++ sandbox with deterministic physics and no game framework.',
    stack: ['C++20', 'CMake', 'POSIX'],
    github: 'https://github.com/arnavsx3/Dunefall',
    visual: 'sand',
    note: 'Small rules. Unexpected worlds.',
  },
  {
    title: 'logfold',
    category: 'Tools',
    description: 'Less log noise, more signal. A Rust CLI that normalizes changing values and folds repetitive lines into counted patterns.',
    stack: ['Rust', 'CLI', 'Pattern matching'],
    github: 'https://github.com/arnavsx3/logfold',
    visual: 'logs',
    note: 'Find the pattern in the noise.',
  },
]
