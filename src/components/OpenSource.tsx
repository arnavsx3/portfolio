import { openSourceProjects } from '../data/contributions'
import Icon from './Icon'

export default function OpenSource() {
  const merged = openSourceProjects
    .flatMap((project) => project.contributions)
    .filter((pr) => pr.status === 'Merged').length
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
            MERGED PULL REQUESTS
            <br />
            ACROSS 3 PROJECTS
          </span>
        </div>
      </div>
      <div className="contribution-list">
        {openSourceProjects.map((project) => (
          <article className="contribution" key={project.name}>
            <div className="contribution-overview">
              <span className="mono project-category">{project.scope}</span>
              <h3>
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  {project.name}
                  <Icon />
                </a>
              </h3>
              <p>{project.description}</p>
              <a
                className="text-link"
                href={project.fork}
                target="_blank"
                rel="noopener noreferrer"
              >
                My fork <Icon />
              </a>
            </div>
            <div className="pr-list">
              {project.contributions.map((pr) => (
                <a
                  className="pr-card"
                  key={pr.number}
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="pr-card-top mono">
                    <span>↳ PR #{pr.number}</span>
                    <span
                      className={
                        pr.status === 'Merged' ? 'pr-merged' : 'pr-closed'
                      }
                    >
                      {pr.status}
                    </span>
                    <Icon />
                  </div>
                  <h4>{pr.title}</h4>
                  <p>{pr.detail}</p>
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
      <p className="contribution-note mono">
        UPSTREAM STATUS CHECKED OCTOBER 20, 2026 · EACH ENTRY LINKS TO THE
        ORIGINAL PR.
      </p>
    </div>
  )
}
