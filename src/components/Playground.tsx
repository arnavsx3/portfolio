import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'

const TARGET = 7
export default function Playground() {
  const [state, setState] = useState<'idle' | 'running' | 'done'>('idle')
  const [elapsed, setElapsed] = useState(0)
  const startedAt = useRef(0)
  const frame = useRef(0)
  useEffect(() => {
    if (state !== 'running') return
    const tick = () => {
      setElapsed((performance.now() - startedAt.current) / 1000)
      frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [state])
  function toggle() {
    if (state === 'running') {
      setElapsed((performance.now() - startedAt.current) / 1000)
      setState('done')
    } else {
      startedAt.current = performance.now()
      setElapsed(0)
      setState('running')
    }
  }
  const hidden = state === 'running' && elapsed >= 1.5
  const error = Math.abs(elapsed - TARGET)
  return <section id="playground" className="playground section wrap" aria-labelledby="play-heading">
    <div className="section-topline mono"><span>03 / A SMALL DISTRACTION</span><span>GO ON. TAKE A BREAK.</span></div>
    <div className="playground-grid"><div><p className="eyebrow lime">INSPIRED BY MY PROJECT, DRIFT</p><h2 id="play-heading">How long is<br /><span className="muted">seven seconds?</span></h2><p>Your brain thinks it knows. Let’s find out.<br />Start the clock. It disappears after a moment.<br />Stop when you think seven seconds have passed.</p><a className="text-link" href="https://github.com/arnavsx3/Drift" target="_blank" rel="noopener noreferrer">Explore the multiplayer original <Icon /></a></div>
    <div className={`timing-game ${state === 'running' ? 'is-running' : ''}`}><div className="game-top mono"><span>THE INTERNAL CLOCK TEST</span><span>TARGET: 7.00s</span></div><div className={`game-time ${hidden ? 'time-hidden' : ''}`} aria-hidden="true">{state === 'idle' ? '0.00' : hidden ? '?.??' : elapsed.toFixed(2)}<span>s</span></div><p className="game-message" aria-live="polite">{state === 'idle' ? 'No pressure. Just a little timing.' : state === 'running' ? 'Trust your internal clock…' : `${error < .2 ? 'That’s some serious instinct.' : error < .75 ? 'Pretty good sense of time.' : 'Time has a mind of its own.'} ${error.toFixed(2)}s ${elapsed < TARGET ? 'early' : 'late'}.`}</p><button className="button button-lime game-button" onClick={toggle}>{state === 'running' ? 'Stop the clock' : state === 'done' ? 'Give it another go' : 'Start the clock'}<Icon name={state === 'running' ? 'pause' : 'play'} /></button><span className="game-hint mono">{state === 'done' ? `YOUR TIME: ${elapsed.toFixed(2)}s` : 'ONE BUTTON. YOUR INSTINCT.'}</span></div></div>
  </section>
}
