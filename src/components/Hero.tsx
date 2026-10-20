import Icon from './Icon'
import Signal from './Signal'

export default function Hero() {
  return <section className="hero wrap" aria-labelledby="hero-heading">
    <div className="hero-copy">
      <p className="eyebrow"><span className="tiny-star">✳</span> CS + AI STUDENT. PERPETUAL BUILDER.</p>
      <h1 id="hero-heading">Built from<br /><span className="hero-curiosity">curiosity<span className="hero-star" aria-hidden="true">✳</span></span><span className="lime">.</span></h1>
      <p className="hero-intro">Hey, I’m Arnav. I build cloud-native systems,<br className="desktop-break" /> useful tools, and the occasional beautiful distraction.</p>
      <div className="hero-actions"><a href="#work" className="button button-lime">Explore my work <Icon name="down" /></a><a className="text-link" href="#about">A little about me <span>↗</span></a></div>
      <div className="hero-foot mono"><span className="status-dot" /> ALWAYS BUILDING SOMETHING <span className="hero-foot-line" /></div>
    </div>
    <Signal />
    <div className="hero-bottom mono"><span>BACKENDS / CLOUD / CREATIVE CODE</span><a href="#work">SCROLL TO EXPLORE <Icon name="down" /></a></div>
  </section>
}
