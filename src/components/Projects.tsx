import { useRef, useState } from 'react'
import { projects, otherProjects } from '../data/projects'
import { openSourceProjects } from '../data/contributions'
import Icon from './Icon'
import ProjectVisual from './ProjectVisual'
import OpenSource from './OpenSource'

export type WorkTab = 'featured' | 'opensource' | 'archive'
const tabs = [
  { id: 'featured', label: 'Featured projects', count: projects.length },
  { id: 'opensource', label: 'Open source', count: openSourceProjects.length },
  { id: 'archive', label: 'More projects', count: otherProjects.length },
] as const
export default function Projects({
  activeTab,
  onTabChange,
}: {
  activeTab: WorkTab
  onTabChange: (tab: WorkTab) => void
}) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [expanded, setExpanded] = useState(false)
  const visibleArchive = expanded ? otherProjects : otherProjects.slice(0, 6)
  return (
    <section
      id="work"
      className="work section wrap"
      aria-labelledby="work-heading"
    >
      <div className="section-topline mono">
        <span>01 / ENGINEERING IN PRACTICE</span>
        <span>FROM APPLICATION TO OPERATIONS.</span>
      </div>
      <div className="section-heading-row">
        <h2 id="work-heading">
          Built. Shipped.
          <br />
          <span className="muted">Understood.</span>
        </h2>
        <p>
          Cloud platforms, practical tools,
          <br />
          and contributions to the projects
          <br />
          other developers depend on.
        </p>
      </div>
      <div className="work-tabs" role="tablist" aria-label="Explore my work">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[i] = el
            }}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => onTabChange(tab.id)}
            onKeyDown={(event) => {
              let next: number | undefined
              if (event.key === 'ArrowRight') next = (i + 1) % tabs.length
              if (event.key === 'ArrowLeft')
                next = (i + tabs.length - 1) % tabs.length
              if (event.key === 'Home') next = 0
              if (event.key === 'End') next = tabs.length - 1
              if (next !== undefined) {
                event.preventDefault()
                onTabChange(tabs[next].id)
                tabRefs.current[next]?.focus()
              }
            }}
          >
            {tab.label}
            <span className="mono">{String(tab.count).padStart(2, '0')}</span>
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          tabIndex={0}
        >
          {activeTab === tab.id &&
            (tab.id === 'featured' ? (
              <>
                <div className="work-panel-note mono">
                  <span>SIX SELECTED BUILDS</span>
                  <span>
                    PRIVATE SOURCE LINKS INCLUDED · REPOSITORY ACCESS IS
                    UNCHANGED
                  </span>
                </div>
                <div className="project-grid">
                  {projects.map((project) => (
                    <article className="project" key={project.title}>
                      <a
                        className="project-link"
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} — ${project.private ? 'private repository' : 'view source'} on GitHub (opens in a new tab)`}
                      >
                        <ProjectVisual kind={project.visual} />
                        {project.private && (
                          <span className="private-badge mono">
                            SOURCE PRIVATE FOR NOW
                          </span>
                        )}
                        <div className="project-title-row">
                          <div>
                            <span className="project-category mono">
                              {project.category}
                            </span>
                            <h3>{project.title}</h3>
                          </div>
                          <span className="project-arrow">
                            <Icon />
                          </span>
                        </div>
                        <p className="project-description">
                          {project.description}
                        </p>
                        <ul className="project-stack" aria-label="Technologies">
                          {project.stack.map((tech) => (
                            <li key={tech}>{tech}</li>
                          ))}
                        </ul>
                        <span className="project-note mono">
                          {project.note}
                        </span>
                      </a>
                    </article>
                  ))}
                </div>
              </>
            ) : tab.id === 'opensource' ? (
              <OpenSource />
            ) : (
              <>
                <div className="archive-heading">
                  <p>
                    The rest of the workshop.
                    <span>
                      Smaller builds, experiments, and the projects I learned
                      along the way.
                    </span>
                  </p>
                  <span className="mono">
                    {otherProjects.length} PROJECTS / MANY RABBIT HOLES
                  </span>
                </div>
                <div id="project-archive" className="archive-list">
                  {visibleArchive.map((project, i) => (
                    <a
                      className="archive-project"
                      key={project.repo}
                      href={`https://github.com/arnavsx3/${project.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="archive-number mono">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <span className="mono archive-stack">
                          {project.stack}
                        </span>
                      </div>
                      <Icon />
                    </a>
                  ))}
                </div>
                <button
                  className="archive-expand"
                  aria-expanded={expanded}
                  aria-controls="project-archive"
                  onClick={() => setExpanded((value) => !value)}
                >
                  {expanded
                    ? 'Show fewer projects'
                    : `Explore all ${otherProjects.length} projects`}
                  <Icon name={expanded ? 'down' : 'plus'} />
                </button>
              </>
            ))}
        </div>
      ))}
      <a
        className="all-repos text-link"
        href="https://github.com/arnavsx3?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
      >
        Keep exploring on GitHub
        <span>
          All repositories <Icon />
        </span>
      </a>
    </section>
  )
}
