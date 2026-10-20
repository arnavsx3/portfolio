import type { ProjectVisual as VisualKind } from '../data/projects'

export default function ProjectVisual({ kind }: { kind: VisualKind }) {
  return (
    <div className={`project-visual visual-${kind}`} aria-hidden="true">
      {kind === 'cassian' && (
        <>
          <div className="visual-label mono">CASSIAN / RECOVERY BY DESIGN</div>
          <svg viewBox="0 0 560 280" fill="none">
            <path
              d="M90 140h115m150 0h115M280 80v120"
              stroke="#c7eaa8"
              strokeOpacity=".3"
              strokeDasharray="4 5"
            />
            <rect
              x="38"
              y="111"
              width="110"
              height="58"
              rx="4"
              fill="#253a28"
              stroke="#92bba0"
              strokeOpacity=".4"
            />
            <text
              x="93"
              y="138"
              textAnchor="middle"
              fill="#d6e9c6"
              className="visual-node"
            >
              SPOT
            </text>
            <text
              x="93"
              y="154"
              textAnchor="middle"
              fill="#8fab8d"
              className="diagram-label"
            >
              WORKER / GEN 1
            </text>
            <rect
              x="412"
              y="111"
              width="110"
              height="58"
              rx="4"
              fill="#c5f98d"
            />
            <text
              x="467"
              y="138"
              textAnchor="middle"
              fill="#21311c"
              className="visual-node"
            >
              ON-DEMAND
            </text>
            <text
              x="467"
              y="154"
              textAnchor="middle"
              fill="#3d582a"
              className="diagram-label"
            >
              RESUME / GEN 2
            </text>
            <path
              d="m280 77 53 30v61l-53 30-53-30v-61Z"
              fill="#3b5332"
              stroke="#c5f98d"
              strokeWidth="1.5"
            />
            <path
              d="m227 107 53 30 53-30m-53 30v61"
              stroke="#c5f98d"
              strokeOpacity=".5"
            />
            <text
              x="280"
              y="121"
              textAnchor="middle"
              fill="#e3f9c5"
              className="visual-node"
            >
              EKS
            </text>
            <rect
              x="231"
              y="217"
              width="98"
              height="23"
              rx="3"
              stroke="#7f9b6a"
            />
            <text
              x="280"
              y="232"
              textAnchor="middle"
              fill="#c7e3a6"
              className="diagram-label"
            >
              S3 CHECKPOINT
            </text>
            <path
              d="M148 140h77m110 0h77"
              stroke="#d4fb64"
              strokeWidth="2"
              className="signal-travel"
            />
          </svg>
          <div className="visual-footer mono">
            <span>SPOT → CHECKPOINT → RECOVER</span>
            <span>ILLUSTRATED ARCHITECTURE</span>
          </div>
        </>
      )}
      {kind === 'synapse' && (
        <>
          <div className="visual-label mono">SYNAPSE / COMMIT TO CLUSTER</div>
          <div className="delivery-steps mono">
            <span>
              GIT<small>commit</small>
            </span>
            <i>→</i>
            <span>
              CI<small>verify</small>
            </span>
            <i>→</i>
            <span>
              ECR<small>publish</small>
            </span>
            <i>→</i>
            <span>
              EKS<small>deploy</small>
            </span>
          </div>
          <div className="deploy-bars">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="visual-footer mono">
            <span>IMMUTABLE IMAGE / HELM DELIVERY</span>
            <span>ILLUSTRATED PIPELINE</span>
          </div>
        </>
      )}
      {kind === 'snapshots' && (
        <>
          <div className="visual-label mono">MORLANA / RECOVERABLE HISTORY</div>
          <svg viewBox="0 0 560 280" fill="none">
            <path
              d="M135 140h290M210 140v-45m140 45v45"
              stroke="#d5b8f1"
              strokeOpacity=".4"
            />
            <rect
              x="92"
              y="111"
              width="86"
              height="58"
              rx="4"
              fill="#302737"
              stroke="#d5b8f1"
              strokeOpacity=".6"
            />
            <rect
              x="237"
              y="111"
              width="86"
              height="58"
              rx="4"
              fill="#382b43"
              stroke="#d5b8f1"
              strokeOpacity=".6"
            />
            <rect
              x="382"
              y="111"
              width="86"
              height="58"
              rx="4"
              fill="#d5b8f1"
            />
            <text
              x="135"
              y="146"
              textAnchor="middle"
              fill="#d5b8f1"
              className="visual-node"
            >
              SNAP 01
            </text>
            <text
              x="280"
              y="146"
              textAnchor="middle"
              fill="#d5b8f1"
              className="visual-node"
            >
              SNAP 02
            </text>
            <text
              x="425"
              y="146"
              textAnchor="middle"
              fill="#292030"
              className="visual-node"
            >
              RESTORE
            </text>
            <circle cx="210" cy="95" r="5" fill="#d5b8f1" />
            <circle cx="350" cy="185" r="5" fill="#d5b8f1" />
            <text
              x="210"
              y="78"
              textAnchor="middle"
              fill="#a18eb4"
              className="diagram-label"
            >
              SHA-256 OBJECTS
            </text>
            <text
              x="350"
              y="211"
              textAnchor="middle"
              fill="#a18eb4"
              className="diagram-label"
            >
              VERIFY BEFORE PUBLISH
            </text>
          </svg>
          <div className="visual-footer mono">
            <span>CONTENT-ADDRESSED / INTEGRITY-CHECKED</span>
            <span>LOCAL FIRST ↗</span>
          </div>
        </>
      )}
      {kind === 'kessel' && (
        <>
          <div className="visual-label mono">
            COUNTERFACTUAL RACING / KESSEL
          </div>
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
        </>
      )}
      {kind === 'logs' && (
        <>
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
        </>
      )}
      {kind === 'tables' && (
        <>
          <div className="visual-label mono">TABLE-LYFT / WEB TO WORKSPACE</div>
          <div className="table-illustration">
            <div className="table-toolbar mono">
              <span>▦ CAPTURED TABLE</span>
              <span>CSV ↗</span>
            </div>
            <div className="table-sample">
              <span>service</span>
              <span>region</span>
              <span>status</span>
              <span>api</span>
              <span>us-east-1</span>
              <span>ready</span>
              <span>worker</span>
              <span>eu-west-1</span>
              <span>ready</span>
              <span>queue</span>
              <span>ap-south-1</span>
              <span>ready</span>
            </div>
          </div>
          <div className="visual-footer mono">
            <span>PICK → PREVIEW → EXPORT</span>
            <span>ILLUSTRATIVE SAMPLE DATA</span>
          </div>
        </>
      )}
    </div>
  )
}
