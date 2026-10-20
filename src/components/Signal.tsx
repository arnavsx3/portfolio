import { useState } from 'react'
const modes = [
  {
    name: 'Delivery',
    label:
      'Illustrated delivery pipeline: Git, continuous integration, image publishing, and Helm deployment to EKS.',
    core: 'EKS',
    nodes: ['GIT PUSH', 'ECR', 'HELM', 'CI CHECKS'],
    sub: 'DELIVERY TARGET',
    detail: ['TEST', 'BUILD', 'DEPLOY'],
    description:
      'Verify the code. Publish the image. Deploy the exact version.',
  },
  {
    name: 'Platform',
    label:
      'Illustrated cloud platform: Terraform provisions AWS infrastructure for Kubernetes workloads.',
    core: 'AWS',
    nodes: ['TERRAFORM', 'IAM', 'NETWORK', 'COMPUTE'],
    sub: 'INFRASTRUCTURE AS CODE',
    detail: ['PLAN', 'APPLY', 'REPEAT'],
    description:
      'Define the infrastructure. Make the environment reproducible.',
  },
  {
    name: 'Signals',
    label:
      'Illustrated observability loop connecting metrics, logs, Prometheus, and Grafana.',
    core: 'OBSERVE',
    nodes: ['METRICS', 'GRAFANA', 'LOGS', 'PROMETHEUS'],
    sub: 'RUNTIME FEEDBACK',
    detail: ['COLLECT', 'QUERY', 'LEARN'],
    description: 'Collect the signals that explain what the system is doing.',
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
    <div className="signal-lab platform-lab">
      <div className="signal-topline mono">
        <span>
          <i className="status-dot" /> THE DELIVERY CONTROL PLANE
        </span>
        <span>ARCH. / 01</span>
      </div>
      <svg
        className="signal-art"
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
          <linearGradient id="platform-fill" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#273a24" />
            <stop offset="1" stopColor="#1a251b" />
          </linearGradient>
        </defs>
        <rect width="500" height="460" fill="url(#signal-grid)" />
        <rect
          x="112"
          y="92"
          width="276"
          height="276"
          rx="24"
          stroke="currentColor"
          strokeOpacity=".25"
          strokeDasharray="3 6"
          fill="none"
        />
        <g
          className="signal-paths"
          stroke="currentColor"
          fill="none"
          opacity=".65"
        >
          <path d="M250 79v72m0 158v72M110 230h52m176 0h52" />
          <path
            className="signal-travel"
            d="M250 79v72m0 158v72M110 230h52m176 0h52"
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
              fill="#161e16"
              stroke="currentColor"
              strokeOpacity=".5"
            />
            <text textAnchor="middle" y="4" className="signal-node">
              {mode.nodes[i]}
            </text>
          </g>
        ))}
        <g>
          <rect
            x="168"
            y="156"
            width="176"
            height="158"
            rx="9"
            fill="#000"
            opacity=".18"
          />
          <rect
            x="162"
            y="150"
            width="176"
            height="158"
            rx="9"
            fill="url(#platform-fill)"
            stroke="#bbdf88"
            strokeOpacity=".5"
          />
          <path d="M162 182h176" stroke="#bbdf88" strokeOpacity=".2" />
          <circle cx="178" cy="166" r="3" fill="#d4fb64" />
          <circle cx="190" cy="166" r="3" fill="#d4fb64" opacity=".4" />
          <circle cx="202" cy="166" r="3" fill="#d4fb64" opacity=".2" />
          <text
            x="250"
            y="219"
            textAnchor="middle"
            className="platform-core-text"
          >
            {mode.core}
          </text>
          <text
            x="250"
            y="240"
            textAnchor="middle"
            className="diagram-label"
            fill="#c3d6ae"
          >
            {mode.sub}
          </text>
          {mode.detail.map((step, i) => (
            <g key={step} transform={`translate(${180 + i * 49},260)`}>
              <rect
                width="42"
                height="28"
                rx="3"
                fill="#d4fb6410"
                stroke="#c7e3a6"
                strokeOpacity=".25"
              />
              <text
                x="21"
                y="17"
                textAnchor="middle"
                fill="#c7e3a6"
                className="platform-pod-text"
              >
                {step}
              </text>
            </g>
          ))}
        </g>
        <g stroke="currentColor" strokeOpacity=".5">
          <path d="M126 108h12m-6-6v12M362 352h12m-6-6v12M35 337h12m-6-6v12M455 120h12m-6-6v12" />
        </g>
        <text x="18" y="440" className="diagram-label">
          FROM COMMIT
        </text>
        <text x="482" y="440" textAnchor="end" className="diagram-label">
          TO CLOUD
        </text>
      </svg>
      <div
        className="signal-controls"
        role="group"
        aria-label="Explore delivery, platform, and observability"
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
      <span className="architecture-caption mono">
        AN ARCHITECTURE SKETCH / EXPLORE THE LAYERS ABOVE
      </span>
    </div>
  )
}
