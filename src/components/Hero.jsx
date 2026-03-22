import { useState, useEffect, useRef } from 'react'
import useCountUp from '../hooks/useCountUp'
import './Hero.css'

function AnimStat({ n, label, suffix = '+' }) {
  const { ref, count } = useCountUp(n, 2200)
  return (
    <div ref={ref} className="hero-num">
      <span className="hero-num-val">{count}{suffix}</span>
      <span className="hero-num-lab">{label}</span>
    </div>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMouse({ x, y })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <section id="hero" className="hero" ref={heroRef}>
      {/* Animated grid background */}
      <div className="hero-grid" />

      {/* Floating 3D shapes */}
      <div className="hero-shapes">
        <div
          className="hero-shape hero-shape-1"
          style={{ transform: `translate(${mouse.x * 20}px, ${mouse.y * 15}px)` }}
        />
        <div
          className="hero-shape hero-shape-2"
          style={{ transform: `translate(${mouse.x * -15}px, ${mouse.y * -10}px)` }}
        />
        <div
          className="hero-shape hero-shape-3"
          style={{ transform: `translate(${mouse.x * 10}px, ${mouse.y * -20}px) rotate(${mouse.x * 15}deg)` }}
        />
      </div>

      <div className="hero-inner container">
        <div className="hero-left">
          <div className="hero-tag">
            <div className="accent-line" />
            <span>Event Infrastructure</span>
          </div>
          <h1>
            We Engineer<br />
            <span className="hero-highlight">Iconic</span> Stages.
          </h1>
          <p>
            Full-scale stage construction, truss systems, roofing & custom fabrication.
            Concept to completion.
          </p>
          <div className="hero-btns">
            <a href="#contact" className="btn btn-primary btn-magnetic">Get a Quote</a>
            <a href="#portfolio" className="btn btn-outline btn-magnetic">Our Work →</a>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-numbers">
            <AnimStat n="200" label="Events" />
            <AnimStat n="20" label="Years" />
            <AnimStat n="10" label="Cities" />
          </div>
        </div>
      </div>

      {/* Bottom ticker */}
      <div className="hero-ticker">
        <div className="ticker-track">
          {Array(3).fill(null).map((_, i) => (
            <div key={i} className="ticker-set">
              <span>Stage Construction</span>
              <span className="ticker-dot" />
              <span>Truss Systems</span>
              <span className="ticker-dot" />
              <span>Roofing Structures</span>
              <span className="ticker-dot" />
              <span>Scaffolding</span>
              <span className="ticker-dot" />
              <span>Custom Fabrication</span>
              <span className="ticker-dot" />
              <span>Launch Setups</span>
              <span className="ticker-dot" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
