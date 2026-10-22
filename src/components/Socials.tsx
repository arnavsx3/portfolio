import { useEffect, useRef, useState } from 'react'
import { contact } from '../data/profiles'
import Icon from './Icon'

export default function Socials() {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>(
    'idle',
  )
  const reset = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(reset.current), [])
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
    clearTimeout(reset.current)
    reset.current = setTimeout(() => setCopyState('idle'), 4000)
  }
  return (
    <section id="contact" className="contact" aria-labelledby="contact-heading">
      <div className="wrap">
        <div className="section-topline mono">
          <span>04 / LET’S BUILD</span>
          <span>LET’S MAKE SOMETHING.</span>
        </div>
        <div className="contact-heading-row">
          <h2 id="contact-heading">
            Let’s ship
            <br />
            something.
          </h2>
          <a
            className="contact-arrow"
            href={`mailto:${contact.email}`}
            aria-label={`Email Arnav at ${contact.email}`}
          >
            <Icon />
          </a>
        </div>
        <div className="contact-bottom">
          <div>
            <p>
              Cloud, DevOps, open source, or an interesting engineering problem.{' '}
              <br />
              My inbox is a good place to start.
            </p>
            <div className="email-row">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <button onClick={copyEmail} aria-label="Copy email address">
                <Icon name={copyState === 'copied' ? 'check' : 'copy'} />
              </button>
            </div>
            <span className="copy-status" role="status">
              {copyState === 'copied'
                ? 'Email copied.'
                : copyState === 'failed'
                  ? 'Select the address above to copy it, or click to open your email app.'
                  : ''}
            </span>
          </div>
          <div className="contact-socials">
            <a href={contact.github} target="_blank" rel="noopener noreferrer">
              GitHub <Icon />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <Icon />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
