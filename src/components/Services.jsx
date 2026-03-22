import { motion } from 'framer-motion'
import './Services.css'

const services = [
  { title: 'Roofing Truss & Stage',  sub: 'Engineered heavy-duty roofing and custom staging systems' },
  { title: 'Layer Stage',            sub: 'Premium modular layer stages built for scale and stability' },
  { title: 'Layer Scaffolding',      sub: 'Multi-level layer scaffolding for complex structural setups' },
  { title: 'Scaffolding Systems',    sub: 'Industrial-grade scaffolding with strict safety compliance' },
  { title: 'Hydraulic Lifts',        sub: 'Precision mechanical lifts for dynamic reveals and staging' },
  { title: 'Custom Fabrication',     sub: 'Bespoke event infrastructure, framing, and branded build-outs' },
]

export default function Services() {
  return (
    <section id="services" className="section svc">
      <div className="container">
        <motion.div
          className="svc-head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <div>
            <span className="eyebrow">Services</span>
            <h2>What We<br />Build.</h2>
          </div>
          <p>End-to-end event infrastructure — from structural design to on-ground execution.</p>
        </motion.div>

        <div className="svc-list">
          {services.map((s, i) => (
            <motion.a
              key={i}
              className="svc-row"
              href="#contact"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <span className="svc-idx">0{i + 1}</span>
              <h3 className="svc-name">{s.title}</h3>
              <p className="svc-desc">{s.sub}</p>
              <span className="svc-arrow">→</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
