export interface Contribution {
  number: number
  title: string
  detail: string
  status: 'Merged' | 'Closed · not merged'
  url: string
}
export interface OpenSourceProject {
  name: string
  scope: string
  description: string
  url: string
  fork: string
  contributions: Contribution[]
}

// Public upstream PRs checked on 2026-10-20. Refresh deliberately so status and
// attribution remain accurate, without unauthenticated runtime GitHub API calls.
export const openSourceProjects: OpenSourceProject[] = [
  {
    name: 'Repowise',
    scope: 'Codebase intelligence',
    description:
      'Making workspace updates and security history scans more reliable.',
    url: 'https://github.com/repowise-dev/repowise',
    fork: 'https://github.com/arnavsx3/repowise',
    contributions: [
      {
        number: 4107,
        title: 'Workspace failures & cancellation',
        detail:
          'Preserved repository aliases in errors, propagated cancellation, and covered cleanup and callback failures with regression tests.',
        status: 'Merged',
        url: 'https://github.com/repowise-dev/repowise/pull/4107',
      },
      {
        number: 3631,
        title: 'Deduplicate historical secret findings',
        detail:
          'Stopped unchanged secrets being reported again across file versions while retaining their earliest known introduction.',
        status: 'Merged',
        url: 'https://github.com/repowise-dev/repowise/pull/3631',
      },
    ],
  },
  {
    name: 'Backlot',
    scope: 'API emulation / AWS S3',
    description:
      'Bringing S3 request validation closer to measured AWS behavior.',
    url: 'https://github.com/brekkylab/backlot',
    fork: 'https://github.com/arnavsx3/backlot',
    contributions: [
      {
        number: 733,
        title: 'Signature requirements for annotation writes',
        detail:
          'Rejected unsigned and Signature V2 annotation writes, preserving selector and credential error precedence.',
        status: 'Merged',
        url: 'https://github.com/brekkylab/backlot/pull/733',
      },
      {
        number: 685,
        title: 'Query validation before CORS preflight',
        detail:
          'Aligned OPTIONS selector refusals with S3 behavior and added regression cases for bucket and object request paths.',
        status: 'Merged',
        url: 'https://github.com/brekkylab/backlot/pull/685',
      },
    ],
  },
  {
    name: 'Hatoba',
    scope: 'Desktop SSH / developer experience',
    description:
      'Contributing to the desktop experience and terminal input tooling.',
    url: 'https://github.com/scarletkc/Hatoba',
    fork: 'https://github.com/arnavsx3/Hatoba',
    contributions: [
      {
        number: 178,
        title: 'Update progress layout',
        detail:
          'Removed the progress-track width cap so it fills the available text column; checked responsive layouts, themes, and locales.',
        status: 'Merged',
        url: 'https://github.com/scarletkc/Hatoba/pull/178',
      },
      {
        number: 234,
        title: 'Ordered terminal-key input',
        detail:
          'Proposed ordered key sequences, key-chip editing, and control-byte visibility with regression coverage. Closed without merging.',
        status: 'Closed · not merged',
        url: 'https://github.com/scarletkc/Hatoba/pull/234',
      },
    ],
  },
]
