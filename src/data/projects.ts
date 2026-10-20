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

// Curated from repository READMEs. Private source links are included deliberately;
// publishing a portfolio entry never changes the repository's access settings.
export const projects: Project[] = [
  {
    title: 'Cassian',
    category: 'Cloud infrastructure',
    description:
      'A self-healing batch platform on AWS Spot. Checkpointed jobs recover on EKS, with On-Demand fallback when interruption limits are reached.',
    stack: ['EKS', 'Terraform', 'Jenkins', 'Argo CD', 'Prometheus'],
    github: 'https://github.com/arnavsx3/cassian',
    visual: 'cassian',
    private: true,
    note: 'Spot capacity. Durable progress. Observable recovery.',
  },
  {
    title: 'Synapse',
    category: 'Cloud-native delivery',
    description:
      'A document-grounded chat workspace, shipped through GitHub Actions, ECR, and Helm to EKS with asynchronous workers and autoscaling.',
    stack: ['EKS', 'Helm', 'GitHub Actions', 'Redis', 'Next.js'],
    github: 'https://github.com/arnavsx3/synapse',
    visual: 'synapse',
    private: true,
    note: 'From a commit to a running workload.',
  },
  {
    title: 'Morlana',
    category: 'Systems tooling',
    description:
      'Recoverable folder history in C++. Content-addressed snapshots, bounded parallel capture, and integrity-checked restores for local files.',
    stack: ['C++17', 'Linux', 'SHA-256', 'CMake'],
    github: 'https://github.com/arnavsx3/morlana',
    visual: 'snapshots',
    private: true,
    note: 'Capture. Verify. Restore with confidence.',
  },
  {
    title: 'Kessel',
    category: 'Distributed workloads',
    description:
      'F1 counterfactuals as a Kubernetes workload. A FastAPI control plane dispatches reproducible parallel simulations and aggregates the results.',
    stack: ['Python', 'Kubernetes Jobs', 'MinIO', 'PostgreSQL'],
    github: 'https://github.com/arnavsx3/kessel',
    visual: 'kessel',
    note: 'Parallel workers. Reproducible outcomes.',
  },
  {
    title: 'logfold',
    category: 'Developer tooling',
    description:
      'Less log noise, more signal. A Rust CLI that normalizes changing values and folds repetitive lines into counted patterns.',
    stack: ['Rust', 'CLI', 'Pattern matching'],
    github: 'https://github.com/arnavsx3/logfold',
    visual: 'logs',
    note: 'Find the pattern in the noise.',
  },
  {
    title: 'table-lyft',
    category: 'Local-first tooling',
    description:
      'A browser extension that turns loaded HTML tables into reusable data: pick, preview, filter, and export to CSV, Markdown, or the clipboard.',
    stack: ['TypeScript', 'React', 'WXT', 'Manifest V3'],
    github: 'https://github.com/arnavsx3/table-lyft',
    visual: 'tables',
    note: 'From web table to something useful.',
  },
]

export interface OtherProject {
  title: string
  description: string
  stack: string
  repo: string
}
export const otherProjects: OtherProject[] = [
  {
    title: 'Backsoon',
    description:
      'Keep track of what you lend, who has it, and when it is coming back.',
    stack: 'Ruby on Rails',
    repo: 'backsoon',
  },
  {
    title: 'Drift',
    description:
      'A multiplayer timing game built around supervised rooms and live updates.',
    stack: 'Elixir / Phoenix LiveView',
    repo: 'Drift',
  },
  {
    title: 'NetSentry',
    description:
      'Telemetry ingestion, threshold-based alerts, and a real-time network dashboard.',
    stack: 'Go / PostgreSQL / Next.js',
    repo: 'net-sentry',
  },
  {
    title: 'Next Up',
    description:
      'Queue management as a playground for Kubernetes, Helm, autoscaling, and monitoring.',
    stack: 'Python / Kubernetes / Helm',
    repo: 'next-up',
  },
  {
    title: 'Dunefall',
    description:
      'A deterministic terminal sandbox of sand, water, and small rules.',
    stack: 'C++20 / POSIX',
    repo: 'Dunefall',
  },
  {
    title: 'OriginFence',
    description:
      'A team-built Linux prototype for tracing AI-agent process chains and applying runtime policies.',
    stack: 'Python / strace / SQLite',
    repo: 'origin-fence',
  },
  {
    title: 'Patchbook',
    description:
      'A notebook for programming errors, fixes, and lessons worth keeping.',
    stack: 'C#',
    repo: 'Patchbook',
  },
  {
    title: 'Anonymous Feedback',
    description:
      'A feedback app used to explore DevSecOps tooling and Jenkins delivery.',
    stack: 'TypeScript / FastAPI / Jenkins',
    repo: 'anon-feedback',
  },
  {
    title: 'Jenkins Shared Library',
    description: 'Reusable Groovy pipeline code for Jenkins.',
    stack: 'Groovy / Jenkins',
    repo: 'jenkins-shared-repository',
  },
  {
    title: 'ChatSocket',
    description: 'A real-time chat application using WebSockets and Socket.IO.',
    stack: 'TypeScript / Socket.IO',
    repo: 'chatsocket',
  },
  {
    title: 'Student Manager API',
    description: 'A backend project built while learning Spring Boot.',
    stack: 'Java / Spring Boot',
    repo: 'student-manager-api',
  },
  {
    title: 'Webhook Todo',
    description: 'An application exploring custom authentication in Next.js.',
    stack: 'TypeScript / Next.js / Clerk',
    repo: 'eda-webhook-todo',
  },
  {
    title: 'Clerk Auth Starter',
    description:
      'Webhook-driven authentication with data synchronized to Neon.',
    stack: 'TypeScript / Clerk / Neon',
    repo: 'clerk-auth-starter',
  },
  {
    title: 'Snapshare',
    description: 'A Next.js project with TypeScript and Cloudinary.',
    stack: 'TypeScript / Next.js / Cloudinary',
    repo: 'snapshare',
  },
  {
    title: 'Resume Analyzer',
    description: 'Structured Gemini output for personalized interview reports.',
    stack: 'JavaScript / Gemini API',
    repo: 'resume-analyzer',
  },
  {
    title: 'World Atlas',
    description:
      'A frontend project exploring React fundamentals and component structure.',
    stack: 'JavaScript / React',
    repo: 'world-atlas',
  },
  {
    title: 'Task Manager API',
    description:
      'Project and task management with authentication, roles, and file uploads.',
    stack: 'Node.js / Express / MongoDB',
    repo: 'task-manager-api',
  },
  {
    title: 'Classic Node Server',
    description: 'An HTTP backend built without a framework.',
    stack: 'JavaScript / Node.js',
    repo: 'classic-node-server',
  },
  {
    title: 'Weather App',
    description:
      'An early project exploring interfaces and weather API integration.',
    stack: 'JavaScript',
    repo: 'weather-app',
  },
]
