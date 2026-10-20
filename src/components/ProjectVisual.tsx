import type { ProjectVisual as VisualKind } from '../data/projects'

export default function ProjectVisual({ kind }: { kind: VisualKind }) {
  if (kind === 'kessel')
    return (
      <div className="project-visual visual-kessel" aria-hidden="true">
        <div className="visual-label mono">COUNTERFACTUAL RACING / KESSEL</div>
        <svg viewBox="0 0 560 280" fill="none">
          <g transform="rotate(-12 280 140)">
            <path
              d="M159 80h229c65 0 71 98 5 104H165c-79 0-73-104-6-104Z"
              stroke="#ff966c"
              strokeWidth="30"
              opacity=".12"
            />
            <path
              d="M159 80h229c65 0 71 98 5 104H165c-79 0-73-104-6-104Z"
              stroke="#ff966c"
              strokeWidth="1.5"
            />
            <path
              d="M159 80h229c65 0 71 98 5 104H165c-79 0-73-104-6-104Z"
              stroke="#ffd3b2"
              strokeWidth="4"
              className="race-line"
            />
            <path
              d="M230 80h100M230 184h100"
              stroke="#ff966c"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
            <path d="M331 60v41m-6-41v41" stroke="#ffd9bc" strokeWidth="2" />
          </g>
          <text
            x="280"
            y="139"
            textAnchor="middle"
            fill="#ffbb8e"
            className="visual-large-text"
          >
            WHAT IF?
          </text>
          <text
            x="280"
            y="159"
            textAnchor="middle"
            fill="#b27d60"
            className="diagram-label"
          >
            SAME RACE. ANOTHER POSSIBILITY.
          </text>
        </svg>
        <div className="visual-footer mono">
          <span>01 → N WORKERS</span>
          <span>DETERMINISTIC BY DESIGN ↗</span>
        </div>
      </div>
    )
  if (kind === 'network')
    return (
      <div className="project-visual visual-network" aria-hidden="true">
        <div className="visual-label mono">
          NETWORK OBSERVABILITY / NETSENTRY
        </div>
        <svg viewBox="0 0 560 280" fill="none">
          <path
            d="M60 60h440M60 110h440M60 160h440M60 210h440M110 40v190M195 40v190M280 40v190M365 40v190M450 40v190"
            stroke="#b7db83"
            opacity=".1"
          />
          <path
            d="m60 168 55-7 34-52 30 79 31-52 35 6 31-64 28 92 34-35 29 7 28-48 40 25 35-7"
            stroke="#c8f67d"
            strokeWidth="2"
          />
          <path
            d="m60 168 55-7 34-52 30 79 31-52 35 6 31-64 28 92 34-35 29 7 28-48 40 25 35-7"
            stroke="#f3ffe4"
            strokeWidth="4"
            className="network-pulse"
          />
          <circle cx="276" cy="78" r="6" fill="#c8f67d" />
          <circle cx="276" cy="78" r="15" stroke="#c8f67d" opacity=".3" />
          <rect x="299" y="49" width="118" height="28" rx="3" fill="#26351e" />
          <text
            x="358"
            y="67"
            textAnchor="middle"
            fill="#c8f67d"
            className="diagram-label"
          >
            FIND THE SIGNAL
          </text>
        </svg>
        <div className="visual-footer mono">
          <span>INGEST → STORE → OBSERVE</span>
          <span>WEBSOCKET STREAM ↗</span>
        </div>
      </div>
    )
  if (kind === 'fence')
    return (
      <div className="project-visual visual-fence" aria-hidden="true">
        <div className="visual-label mono">RUNTIME POLICY / ORIGINFENCE</div>
        <div className="fence-flow mono">
          <span>AGENT</span>
          <i>→</i>
          <span>PROCESS</span>
          <i>→</i>
          <span className="fence-block">POLICY</span>
        </div>
        <div className="fence-verdict mono">
          <i className="status-dot" /> TRACE. EVALUATE. EXPLAIN.
        </div>
        <div className="fence-lines">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    )
  if (kind === 'drift')
    return (
      <div className="project-visual visual-drift" aria-hidden="true">
        <div className="visual-label mono">A FEELING FOR TIME / DRIFT</div>
        <div className="drift-clock">
          <span>
            7<span className="clock-decimal">.00</span>
            <small>s</small>
          </span>
        </div>
        <span className="drift-orbit one" />
        <span className="drift-orbit two" />
        <div className="visual-footer mono">
          <span>NO CLOCK. JUST INSTINCT.</span>
          <span>TRUST YOUR TIMING ↗</span>
        </div>
      </div>
    )
  if (kind === 'sand')
    return (
      <div className="project-visual visual-sand" aria-hidden="true">
        <div className="visual-label mono">A TINY WORLD / DUNEFALL</div>
        <svg viewBox="0 0 560 280">
          <defs>
            <pattern
              id="sand-dots"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <rect width="5" height="5" fill="#f3c27d" />
            </pattern>
            <pattern
              id="water-dots"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <rect width="5" height="5" fill="#6998a9" />
            </pattern>
          </defs>
          <path
            d="M0 230 72 230 72 210 104 210 104 183 128 183 128 155 152 155 152 133 176 133 176 109 192 109 192 133 216 133 216 157 240 157 240 179 264 179 264 203 296 203 296 230H560v50H0Z"
            fill="url(#sand-dots)"
          />
          <path d="M296 202h264v78H296Z" fill="url(#water-dots)" />
          <path d="M179 40h7v12h-7zm0 24h7v7h-7zm8 24h7v7h-7z" fill="#f3c27d" />
        </svg>
        <div className="visual-footer mono">
          <span>SAND + WATER + A LITTLE CHAOS</span>
          <span>C++20 ↗</span>
        </div>
      </div>
    )
  return (
    <div className="project-visual visual-logs" aria-hidden="true">
      <div className="visual-label mono">NOISE → SIGNAL / LOGFOLD</div>
      <div className="log-terminal mono">
        <p>
          <span>$</span> logfold app.log
        </p>
        <p className="log-muted">Reading between the lines…</p>
        <p>
          <b>3×</b> user &lt;NUM&gt; logged in from &lt;IP&gt;
        </p>
        <p>
          <b>2×</b> timeout after &lt;NUM&gt;s on db-&lt;NUM&gt;
        </p>
        <p>
          <b>1×</b> request &lt;UUID&gt; finished
        </p>
        <span className="terminal-cursor" />
      </div>
    </div>
  )
}
