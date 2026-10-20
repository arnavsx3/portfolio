import { useState } from 'react'

const modes = [
  {
    name: 'Build',
    label: 'An idea becomes a system.',
    core: 'CREATE',
    nodes: ['IDEA', 'CODE', 'TEST', 'ITERATE'],
    description: 'Start with a question. Make something that answers it.',
  },
  {
    name: 'Ship',
    label: 'The path from local to live.',
    core: 'DEPLOY',
    nodes: ['GIT', 'CI / CD', 'CONTAINER', 'CLOUD'],
    description: 'Automate the pipeline. Keep the feedback loop short.',
  },
  {
    name: 'Observe',
    label: 'Find the signal in the noise.',
    core: 'LISTEN',
    nodes: ['METRICS', 'LOGS', 'TRACES', 'INSIGHT'],
    description: 'Understand what the system is doing, then make it better.',
  },
]
const positions = [
  [250, 63],
  [433, 230],
  [250, 397],
  [67, 230],
]

export default function Signal() {
  const [selected, setSelected] = useState(0)
  const mode = modes[selected]
  return (
    <div className="signal-lab">
      <div className="signal-topline mono">
        <span>
          <i className="status-dot" /> THE CURIOSITY ENGINE
        </span>
        <span>FIG. 01</span>
      </div>
      <svg
        className={`signal-art signal-mode-${selected}`}
        viewBox="0 0 500 460"
        role="img"
        aria-label={mode.label}
      >
        <defs>
          <pattern
            id="signal-grid"
            width="25"
            height="25"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r=".8" fill="currentColor" opacity=".2" />
          </pattern>
          <linearGradient id="core-fill" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#d4fb64" />
            <stop offset="1" stopColor="#a4cf3b" />
          </linearGradient>
        </defs>
        <rect width="500" height="460" fill="url(#signal-grid)" />
        <g className="signal-orbits" fill="none" stroke="currentColor">
          <circle cx="250" cy="230" r="165" opacity=".22" />
          <circle cx="250" cy="230" r="118" opacity=".1" />
          <ellipse
            cx="250"
            cy="230"
            rx="213"
            ry="77"
            transform="rotate(-38 250 230)"
            opacity=".5"
          />
          <ellipse
            cx="250"
            cy="230"
            rx="213"
            ry="77"
            transform="rotate(38 250 230)"
            opacity=".3"
          />
        </g>
        <g
          className="signal-paths"
          stroke="currentColor"
          fill="none"
          opacity=".65"
        >
          <path d="M250 63V230H433M250 397V230H67" />
          <path
            className="signal-travel"
            d="M250 63V230H433M250 397V230H67"
            strokeWidth="3"
          />
        </g>
        {positions.map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <rect
              x="-43"
              y="-16"
              width="86"
              height="32"
              rx="3"
              fill="#161914"
              stroke="currentColor"
              strokeOpacity=".5"
            />
            <text textAnchor="middle" y="4" className="signal-node">
              {mode.nodes[i]}
            </text>
          </g>
        ))}
        <g className="signal-core">
          <path
            d="m250 158 67 36v74l-67 37-67-37v-74Z"
            fill="url(#core-fill)"
          />
          <path
            d="m183 194 67 37 67-37M250 231v74"
            stroke="#172010"
            strokeOpacity=".45"
            fill="none"
          />
          <path d="m250 158 67 36-67 37-67-37Z" fill="#e4ff9f" />
          <text
            x="250"
            y="200"
            textAnchor="middle"
            fill="#1b2710"
            className="core-text"
          >
            {mode.core}
          </text>
          <path d="m215 249 14 8m-14-1 14 8" stroke="#34471b" strokeWidth="2" />
        </g>
        <g fill="currentColor">
          <circle className="orbit-dot" cx="368" cy="116" r="5" />
          <circle cx="104" cy="310" r="3" />
          <path
            d="M407 76v12m-6-6h12M104 132v10m-5-5h10"
            stroke="currentColor"
          />
        </g>
        <text x="18" y="440" className="diagram-label">
          INPUT: CURIOSITY
        </text>
        <text x="482" y="440" textAnchor="end" className="diagram-label">
          OUTPUT: SOMETHING REAL
        </text>
      </svg>
      <div
        className="signal-controls"
        role="group"
        aria-label="Explore the curiosity engine"
      >
        {modes.map((item, i) => (
          <button
            key={item.name}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            <span className="mono">0{i + 1}</span>
            {item.name}
          </button>
        ))}
      </div>
      <p className="signal-caption" aria-live="polite">
        {mode.description}
      </p>
    </div>
  )
}
