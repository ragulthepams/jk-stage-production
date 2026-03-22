import { motion } from 'framer-motion'
import useCountUp from '../hooks/useCountUp'
import './About.css'

function AnimStat({ n, label, suffix = '+' }) {
  const { ref, count } = useCountUp(n, 2000)
  return (
    <div ref={ref} className="about-stat">
      <span className="about-stat-n">{count}{suffix}</span>
      <span className="about-stat-l">{label}</span>
    </div>
  )
}

const blocks = [
  { idx: '01', label: 'Vision', text: 'To be the most trusted name in event infrastructure — known for precision, safety & scale.' },
  { idx: '02', label: 'Mission', text: 'Deliver technically sound, visually impactful event setups that bring every vision to life.' },
  { idx: '03', label: 'Approach', text: 'From blueprint to breakdown — we own every phase of the build with zero compromise on quality.' },
]

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-inner">

          <motion.div
            className="about-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-80px' }}
          >
            <span className="eyebrow">About Us</span>
            <h2 className="about-title">
              Two Decades of<br />Delivering the Stage.
            </h2>
            <p>
              JK Stage Production is a full-service event infrastructure and fabrication company
              with 20+ years of experience building stages, truss systems, roofing structures
              & custom setups for concerts, launches, and large-scale corporate events
              across the country.
            </p>
            <p>
              We handle everything from structural design to on-ground execution — with a
              dedicated team that brings engineering precision and creative excellence
              to every project.
            </p>
            <a href="#contact" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
              Work With Us
            </a>
          </motion.div>

          <div className="about-right">
            <div className="about-blocks">
              {blocks.map((b, i) => (
                <motion.div
                  key={b.idx}
                  className="about-block"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, margin: '-50px' }}
                >
                  <span className="about-block-idx">{b.idx}</span>
                  <div>
                    <span className="about-block-label">{b.label}</span>
                    <p>{b.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="about-stats"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <AnimStat n="200" label="Events Delivered" />
              <AnimStat n="10" label="Cities Covered" />
              <AnimStat n="20" label="Years Active" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
