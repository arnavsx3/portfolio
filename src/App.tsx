import { useState } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import type { WorkTab } from './components/Projects'
import Socials from './components/Socials'
import Footer from './components/Footer'
import Icon from './components/Icon'

export default function App() {
  const [paused, setPaused] = useState(false)
  const [workTab, setWorkTab] = useState<WorkTab>('featured')
  return (
    <div id="top" data-motion={paused ? 'paused' : 'playing'}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header">
        <div className="wrap nav-wrap">
          <a className="wordmark" href="#top" aria-label="Arnav — home">
            arnav<span>✳</span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#work" onClick={() => setWorkTab('featured')}>
              Work
            </a>
            <a href="#work" onClick={() => setWorkTab('opensource')}>
              Open source
            </a>
            <a className="nav-about" href="#about">
              About
            </a>
            <a href="#certifications">Certs</a>
          </nav>
          <div className="nav-actions">
            <button
              className="motion-toggle"
              onClick={() => setPaused((value) => !value)}
              aria-label={
                paused
                  ? 'Resume decorative animation'
                  : 'Pause decorative animation'
              }
              aria-pressed={paused}
            >
              <Icon name={paused ? 'play' : 'pause'} />
            </button>
            <a className="nav-contact" href="#contact">
              Let’s talk <Icon />
            </a>
          </div>
        </div>
      </header>
      <main id="main">
        <Hero />
        <div className="ticker" aria-hidden="true">
          <div className="wrap ticker-inner">
            <span>CLOUD NATIVE</span>
            <i>✳</i>
            <span>INFRASTRUCTURE AS CODE</span>
            <i>✳</i>
            <span>CI / CD</span>
            <i>✳</i>
            <span>OBSERVABILITY</span>
            <i>✳</i>
          </div>
        </div>
        <Projects activeTab={workTab} onTabChange={setWorkTab} />
        <About />
        <Certifications />
        <Socials />
      </main>
      <Footer />
    </div>
  )
}
