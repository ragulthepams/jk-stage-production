import { motion } from 'framer-motion'
import './Process.css'

const steps = [
  {
    num: '01',
    title: 'Consultation',
    desc: 'Understanding your event vision, venue, scale, and technical requirements.',
  },
  {
    num: '02',
    title: 'Design & Planning',
    desc: 'Structural blueprints, 3D layouts, material selection, and safety planning.',
  },
  {
    num: '03',
    title: 'Fabrication',
    desc: 'Custom steel & aluminum fabrication — trusses, frames, panels, rigging hardware.',
  },
  {
    num: '04',
    title: 'Transport & Logistics',
    desc: 'Fleet-managed delivery of all infrastructure to your venue, anywhere in South India.',
  },
  {
    num: '05',
    title: 'Installation',
    desc: 'On-ground crew executes the full build — stage, roofing, truss, LED walls, scaffolding.',
  },
  {
    num: '06',
    title: 'Event Support',
    desc: 'Standby technical team throughout the event for safety monitoring and adjustments.',
  },
]

export default function Process() {
  return (
    <section className="section process">
      <div className="container">
        <motion.div
          className="process-head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <div>
            <span className="eyebrow">How We Work</span>
            <h2 className="process-title">From Blueprint<br />to Breakdown.</h2>
          </div>
          <p>Every project follows a proven six-phase process — ensuring precision, safety, and zero surprises on event day.</p>
        </motion.div>

        <div className="process-grid">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              className="process-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <div className="process-card-line" />
              <span className="process-card-num">{s.num}</span>
              <h3 className="process-card-title">{s.title}</h3>
              <p className="process-card-desc">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
