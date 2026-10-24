import { useState } from 'react'
import { openSourceProjects } from '../data/contributions'
import { ContributionCard, ContributionSyncNote } from './OpenSource'
import Icon from './Icon'

export default function ContributionPage({
  repository,
  onBack,
}: {
  repository: string
  onBack: () => void
}) {
  const project = openSourceProjects.find(
    (item) => item.repository.toLowerCase() === repository.toLowerCase(),
  )
  const [query, setQuery] = useState('')
  const [credit, setCredit] = useState('all')
  if (!project)
    return (
      <section
        className="section wrap contribution-page"
        aria-labelledby="contribution-heading"
      >
        <a
          className="text-link contribution-back"
          href="#work"
          onClick={onBack}
        >
          Back to open source <Icon />
        </a>
        <h1 id="contribution-heading" tabIndex={-1}>
          Project not found.
        </h1>
        <p>This project is not in the latest verified contribution list.</p>
      </section>
    )
  const contributions = project.contributions.filter(
    (pr) =>
      `${pr.title} ${pr.detail || ''} #${pr.number}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()) &&
      (credit === 'all' ||
        (credit === 'coauthored' ? pr.coauthored : !pr.coauthored)),
  )
  return (
    <section
      className="section wrap contribution-page"
      aria-labelledby="contribution-heading"
    >
      <a className="text-link contribution-back" href="#work" onClick={onBack}>
        Back to open source <Icon />
      </a>
      <div className="contribution-page-heading">
        <div>
          <p className="mono project-category">{project.scope}</p>
          <h1 id="contribution-heading" tabIndex={-1}>
            {project.name}
            <span className="muted"> / Contributions</span>
          </h1>
          <p className="contribution-page-description">{project.description}</p>
          <a
            className="text-link"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Upstream repository <Icon />
          </a>
        </div>
        <div className="oss-stat">
          <strong>
            {String(project.contributions.length).padStart(2, '0')}
          </strong>
          <span className="mono">
            MERGED
            <br />
            {project.contributions.length === 1
              ? 'CONTRIBUTION'
              : 'CONTRIBUTIONS'}
          </span>
        </div>
      </div>
      <div className="contribution-filters">
        <label className="mono">
          Search contributions
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Title or PR number"
          />
        </label>
        <label className="mono">
          Contribution credit
          <select
            value={credit}
            onChange={(event) => setCredit(event.target.value)}
          >
            <option value="all">All contributions</option>
            <option value="authored">Authored</option>
            <option value="coauthored">Co-authored</option>
          </select>
        </label>
      </div>
      <p className="contribution-results mono" role="status">
        Showing {contributions.length} of {project.contributions.length}{' '}
        contributions · newest merged first
      </p>
      <div className="contribution-page-grid">
        {contributions.map((pr) => (
          <ContributionCard key={pr.number} pr={pr} />
        ))}
      </div>
      {contributions.length === 0 && (
        <p className="contribution-empty">
          No contributions match these filters.
        </p>
      )}
      <ContributionSyncNote />
    </section>
  )
}
