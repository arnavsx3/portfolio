import { contact } from '../data/profiles'
import Icon from './Icon'
const interests = [
  {
    n: '01',
    title: 'Provision with intent',
    body: 'Cloud infrastructure defined in code, with clear workload boundaries and repeatable environments.',
    tags: 'AWS / Terraform / Kubernetes / Linux',
  },
  {
    n: '02',
    title: 'Automate the handoff',
    body: 'Pipelines that verify changes, publish images, and take a tested version into the cluster.',
    tags: 'Jenkins / GitHub Actions / Helm / Argo CD',
  },
  {
    n: '03',
    title: 'Understand the runtime',
    body: 'Metrics, dashboards, and recovery paths that make system behavior easier to explain.',
    tags: 'Prometheus / Grafana / Docker / Go / Python',
  },
]
const tools = [
  'AWS',
  'Terraform',
  'Docker',
  'Kubernetes',
  'Jenkins',
  'GitHub Actions',
  'Helm',
  'Argo CD',
  'Prometheus',
  'Grafana',
  'Linux',
  'Git',
]
export default function About() {
  return (
    <section
      id="about"
      className="about section"
      aria-labelledby="about-heading"
    >
      <div className="wrap">
        <div className="section-topline mono">
          <span>02 / CLOUD IS THE DIRECTION</span>
          <span>DEVOPS IS THE MINDSET.</span>
        </div>
        <div className="about-grid">
          <div className="about-intro">
            <span className="about-asterisk" aria-hidden="true">
              ✳
            </span>
            <h2 id="about-heading">
              The work goes
              <br />
              <span className="muted">beyond git push.</span>
            </h2>
            <p>
              I’m Arnav, a CS + AI student focused on cloud and DevOps. I like
              building cloud-native apps and automating the pipelines that ship
              them.
            </p>
            <p>
              My projects explore the whole path: infrastructure, containers,
              delivery, observability, and what happens when something fails. I
              want to understand the system I’m putting into the world.
            </p>
            <a
              className="text-link"
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow the work on GitHub <Icon />
            </a>
          </div>
          <div className="interest-list">
            {interests.map((interest) => (
              <div className="interest" key={interest.n}>
                <span className="mono interest-number">{interest.n}</span>
                <div>
                  <h3>{interest.title}</h3>
                  <p>{interest.body}</p>
                  <span className="mono interest-tags">{interest.tags}</span>
                </div>
                <Icon name="plus" />
              </div>
            ))}
          </div>
        </div>
        <div className="toolbelt">
          <span className="mono">TOOLS I BUILD WITH</span>
          <ul>
            {tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
