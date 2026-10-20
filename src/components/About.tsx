import { contact } from '../data/profiles'
import Icon from './Icon'

const interests = [
  { n: '01', title: 'Under the hood', body: 'Backends, distributed systems, and the decisions that make them tick.', tags: 'Go / Python / PostgreSQL' },
  { n: '02', title: 'From code to cloud', body: 'Containers, pipelines, and infrastructure that make shipping repeatable.', tags: 'Docker / Kubernetes / AWS / Terraform' },
  { n: '03', title: 'Room to experiment', body: 'A different language. A strange idea. A small tool that scratches an itch.', tags: 'Rust / Elixir / C++ / TypeScript' },
]
export default function About() {
  return <section id="about" className="about section" aria-labelledby="about-heading"><div className="wrap">
    <div className="section-topline mono"><span>02 / THE PERSON BEHIND THE COMMITS</span><span>STILL CURIOUS.</span></div>
    <div className="about-grid"><div className="about-intro"><span className="about-asterisk" aria-hidden="true">✳</span><h2 id="about-heading">The fun is in<br /><span className="muted">figuring it out.</span></h2><p>I’m Arnav, a CS + AI student drawn to cloud-native apps and the pipelines that ship them.</p><p>I like following an idea all the way down: from the interface to the backend, the container, and the infrastructure underneath. Sometimes that becomes a network observability tool. Sometimes, a tiny world of falling sand.</p><a className="text-link" href={contact.github} target="_blank" rel="noopener noreferrer">Follow the rabbit hole <Icon /></a></div>
    <div className="interest-list">{interests.map(interest => <div className="interest" key={interest.n}><span className="mono interest-number">{interest.n}</span><div><h3>{interest.title}</h3><p>{interest.body}</p><span className="mono interest-tags">{interest.tags}</span></div><Icon name="plus" /></div>)}<a href={contact.leetcode} className="practice-link mono" target="_blank" rel="noopener noreferrer">A LITTLE PROBLEM-SOLVING ON LEETCODE <Icon /></a></div></div>
  </div></section>
}
