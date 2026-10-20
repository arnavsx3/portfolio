import { certifications } from '../data/certifications'
import Icon from './Icon'

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="certifications section wrap"
      aria-labelledby="certifications-heading"
    >
      <div className="section-topline mono">
        <span>03 / CERTIFICATIONS</span>
        <span>LEARNING, WITH RECEIPTS.</span>
      </div>
      <div className="certifications-grid">
        <div>
          <h2 id="certifications-heading">
            Keep learning.
            <br />
            <span className="muted">Go deeper.</span>
          </h2>
          <p>
            Cloud and infrastructure credentials,
            <br />
            with links to the original verification.
          </p>
        </div>
        <div className="certification-list">
          {certifications.length ? (
            certifications.map((cert) => (
              <a
                className="certification-card"
                href={cert.url}
                key={cert.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="mono">
                  {cert.issuer}
                  {cert.issued ? ` / ${cert.issued}` : ''}
                </span>
                <h3>{cert.name}</h3>
                <span className="text-link">
                  Verify credential <Icon />
                </span>
              </a>
            ))
          ) : (
            <div className="certification-pending">
              <span className="credential-seal" aria-hidden="true">
                ✳
              </span>
              <div>
                <span className="mono">CREDENTIAL GALLERY</span>
                <h3>Details on the way.</h3>
                <p>Verified credential links will be added here soon.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
