import { motion } from 'framer-motion'
import useCountUp from '../hooks/useCountUp'
import Hero3DScene from './Hero3DScene'
import './Hero.css'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  },
})

function AnimStat({ n, label, suffix = '+', delay }) {
  const { ref, count } = useCountUp(n, 2200)
  return (
    <motion.div ref={ref} className="hero-num" variants={fadeUp(delay)}>
      <span className="hero-num-val">{count}{suffix}</span>
      <span className="hero-num-lab">{label}</span>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="hero">
      {/* Ambient glow blobs */}
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />

      {/* 3D R3F Background */}
      <Hero3DScene />

      <motion.div
        className="hero-inner container"
        initial="hidden"
        animate="visible"
      >
        <div className="hero-left">
          <motion.div className="hero-tag" variants={fadeUp(0.2)}>
            <div className="accent-line" />
            <span>Event Infrastructure</span>
          </motion.div>

          <motion.h1 variants={fadeUp(0.35)}>
            We Engineer<br />
            <span className="hero-highlight">Iconic</span> Stages.
          </motion.h1>

          <motion.p variants={fadeUp(0.5)}>
            Full-scale event infrastructure spanning premium roofing truss systems, layer stages, 
            advanced scaffolding, and hydraulic mechanical setups. Built with strict safety and precision.
          </motion.p>

          <motion.div className="hero-btns" variants={fadeUp(0.65)}>
            <a href="#contact" className="btn btn-primary">Get a Quote</a>
            <a href="#portfolio" className="btn btn-outline">Our Work →</a>
          </motion.div>
        </div>

        <div className="hero-right">
          <motion.div className="hero-numbers" initial="hidden" animate="visible">
            <AnimStat n="200" label="Events Delivered" delay={0.6} />
            <AnimStat n="20" label="Years of Excellence" delay={0.75} />
            <AnimStat n="10" label="Cities Covered" delay={0.9} />
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom ticker */}
      <div className="hero-ticker">
        <div className="ticker-track">
          {Array(4).fill(null).map((_, i) => (
            <div key={i} className="ticker-set">
              <span>Roofing Truss & Stage</span>
              <span className="ticker-dot" />
              <span>Layer Stage</span>
              <span className="ticker-dot" />
              <span>Layer Scaffolding</span>
              <span className="ticker-dot" />
              <span>Hydraulic Lifts</span>
              <span className="ticker-dot" />
              <span>Scaffolding Systems</span>
              <span className="ticker-dot" />
              <span>Custom Fabrication</span>
              <span className="ticker-dot" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
