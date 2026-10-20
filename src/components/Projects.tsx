import { useState } from 'react'
import { projects } from '../data/projects'
import type { ProjectCategory } from '../data/projects'
import Icon from './Icon'
import ProjectVisual from './ProjectVisual'

const filters: ('All work' | ProjectCategory)[] = ['All work', 'Systems', 'Tools', 'Experiments']
export default function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All work')
  const visible = projects.filter(p => filter === 'All work' || p.category === filter)
  return <section id="work" className="work section wrap" aria-labelledby="work-heading">
    <div className="section-topline mono"><span>01 / SELECTED WORK</span><span>IDEAS, MADE TANGIBLE.</span></div>
    <div className="section-heading-row"><h2 id="work-heading">Less talk.<br /><span className="muted">More making.</span></h2><p>A few things I’ve put into the world.<br />From the infrastructure underneath<br />to the little details on top.</p></div>
    <div className="project-filters" role="group" aria-label="Filter projects">{filters.map(item => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}<span className="mono">{item === 'All work' ? projects.length : projects.filter(p => p.category === item).length}</span></button>)}</div>
    <p className="sr-only" role="status">Showing {visible.length} {filter === 'All work' ? '' : filter.toLowerCase()} projects</p>
    <div className="project-grid">{visible.map(project => <article className="project" key={project.title}>
      <a className="project-link" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} — view source on GitHub (opens in a new tab)`}>
        <ProjectVisual kind={project.visual} />
        <div className="project-title-row"><div><span className="project-category mono">{project.category}</span><h3>{project.title}</h3></div><span className="project-arrow"><Icon /></span></div>
        <p className="project-description">{project.description}</p>
        <ul className="project-stack" aria-label="Technologies">{project.stack.map(tech => <li key={tech}>{tech}</li>)}</ul>
        <span className="project-note mono">{project.note}</span>
      </a>
    </article>)}</div>
    <a className="all-repos text-link" href="https://github.com/arnavsx3?tab=repositories" target="_blank" rel="noopener noreferrer">There’s more in the workshop <span>All repositories <Icon /></span></a>
  </section>
}
