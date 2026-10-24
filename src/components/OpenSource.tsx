import { useId, useState } from 'react'
import {
  contributionsSyncedAt,
  openSourceProjects,
} from '../data/contributions'
import type { Contribution, OpenSourceProject } from '../data/contributions'
import Icon from './Icon'

const dateFormat = new Intl.DateTimeFormat('en', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

function ContributionCard({ pr }: { pr: Contribution }) {
  return (
    <div className="pr-entry">
      <a
        className="pr-card"
        href={pr.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="pr-card-top mono">
          <span>↳ PR #{pr.number}</span>
          <span className="pr-merged">
            {pr.coauthored ? 'Co-authored · merged' : 'Merged'}
          </span>
          <Icon />
        </div>
        <h4>{pr.title}</h4>
        {pr.detail && <p>{pr.detail}</p>}
        <time className="pr-date mono" dateTime={pr.mergedAt}>
          Merged {dateFormat.format(new Date(pr.mergedAt))}
        </time>
      </a>
      {pr.originalPullRequest && (
        <a
          className="pr-origin"
          href={pr.originalPullRequest.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Original contribution: PR #{pr.originalPullRequest.number} <Icon />
        </a>
      )}
    </div>
  )
}

function ProjectContributions({ project }: { project: OpenSourceProject }) {
  const [expanded, setExpanded] = useState(false)
  const moreId = useId()
  const [latest, ...more] = project.contributions
  return (
    <article className="contribution">
      <div className="contribution-overview">
        <span className="mono project-category">{project.scope}</span>
        <h3>
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            {project.name}
            <Icon />
          </a>
        </h3>
        <p>{project.description}</p>
        <p className="contribution-count mono">
          {String(project.contributions.length).padStart(2, '0')} merged{' '}
          {project.contributions.length === 1
            ? 'contribution'
            : 'contributions'}
        </p>
        {project.fork && (
          <a
            className="text-link"
            href={project.fork}
            target="_blank"
            rel="noopener noreferrer"
          >
            My fork <Icon />
          </a>
        )}
      </div>
      <div className="pr-list">
        <ContributionCard pr={latest} />
        {more.length > 0 && (
          <>
            <button
              className="contribution-expand"
              aria-expanded={expanded}
              aria-controls={moreId}
              onClick={() => setExpanded((value) => !value)}
            >
              {expanded
                ? 'Show fewer contributions'
                : `See all ${project.contributions.length} contributions`}
              <Icon name={expanded ? 'down' : 'plus'} />
            </button>
            <div id={moreId} className="pr-list" hidden={!expanded}>
              {expanded &&
                more.map((pr) => <ContributionCard pr={pr} key={pr.number} />)}
            </div>
          </>
        )}
      </div>
    </article>
  )
}

export default function OpenSource() {
  const merged = openSourceProjects.reduce(
    (count, project) => count + project.contributions.length,
    0,
  )
  return (
    <div className="open-source-work">
      <div className="oss-intro">
        <p>
          Useful changes, upstream.
          <span>
            Bug fixes, API behavior, regression tests, and developer experience.
          </span>
        </p>
        <div className="oss-stat">
          <strong>{String(merged).padStart(2, '0')}</strong>
          <span className="mono">
            MERGED CONTRIBUTIONS
            <br />
            ACROSS {openSourceProjects.length}{' '}
            {openSourceProjects.length === 1 ? 'PROJECT' : 'PROJECTS'}
          </span>
        </div>
      </div>
      <div className="contribution-list">
        {openSourceProjects.map((project) => (
          <ProjectContributions project={project} key={project.repository} />
        ))}
      </div>
      <p className="contribution-note mono">
        UPSTREAM STATUS SYNCED{' '}
        {dateFormat.format(new Date(contributionsSyncedAt)).toUpperCase()} ·
        EACH ENTRY LINKS TO THE ORIGINAL PR.
      </p>
    </div>
  )
}
