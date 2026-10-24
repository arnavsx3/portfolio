import { useEffect, useState, useSyncExternalStore } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import type { WorkTab } from './components/Projects'
import Socials from './components/Socials'
import Footer from './components/Footer'
import Icon from './components/Icon'
import ContributionPage from './components/ContributionPage'
import { contributionRepository } from './routes'

const subscribe = (callback: () => void) => {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}
const currentHash = () => window.location.hash

export default function App() {
  const hash = useSyncExternalStore(subscribe, currentHash, () => '')
  const repository = contributionRepository(hash)
  useEffect(() => {
    document.title =
      repository !== null
        ? `${repository || 'Unknown project'} contributions — Arnav`
        : 'Arnav — Cloud & DevOps'
    if (repository !== null) {
      window.scrollTo(0, 0)
      document
        .getElementById('contribution-heading')
        ?.focus({ preventScroll: true })
    } else {
      const id = hash.slice(1) || 'top'
      document.getElementById(id)?.scrollIntoView()
    }
  }, [repository, hash])
  const [paused, setPaused] = useState(false)
  const [workTab, setWorkTab] = useState<WorkTab>('featured')
  return (
    <div id="top" data-motion={paused ? 'paused' : 'playing'}>
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main')?.focus()
          document.getElementById('main')?.scrollIntoView()
        }}
      >
        Skip to content
      </a>
      <header className="header">
        <div className="wrap nav-wrap">
          <a
            className="wordmark"
            href={repository !== null ? '#' : '#top'}
            aria-label="Arnav — home"
          >
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
      <main id="main" tabIndex={-1}>
        {repository !== null ? (
          <ContributionPage
            key={repository}
            repository={repository}
            onBack={() => setWorkTab('opensource')}
          />
        ) : (
          <>
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
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
