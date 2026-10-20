import Icon from './Icon'
import Signal from './Signal'

export default function Hero() {
  return (
    <section className="hero wrap" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="tiny-star">✳</span> CLOUD & DEVOPS / ENGINEERING
          PORTFOLIO
        </p>
        <h1 id="hero-heading">
          Code. Ship.
          <br />
          <span className="hero-curiosity">
            Repeat<span className="lime">.</span>
            <span className="hero-star" aria-hidden="true">
              ✳
            </span>
          </span>
        </h1>
        <p className="hero-intro">
          I’m Arnav. I build cloud-native applications
          <br className="desktop-break" /> and automate the infrastructure and
          pipelines
          <br className="desktop-break" /> that take them from a commit to the
          cloud.
        </p>
        <div className="hero-actions">
          <a href="#work" className="button button-lime">
            Explore my work <Icon name="down" />
          </a>
          <a className="text-link" href="#about">
            Behind the pipelines <span>↗</span>
          </a>
        </div>
        <div className="hero-foot mono">
          <span className="status-dot" /> BUILD / AUTOMATE / OBSERVE{' '}
          <span className="hero-foot-line" />
        </div>
      </div>
      <Signal />
      <div className="hero-bottom mono">
        <span>AWS / KUBERNETES / TERRAFORM / CI/CD</span>
        <a href="#work">
          EXPLORE THE BUILDS <Icon name="down" />
        </a>
      </div>
    </section>
  )
}
