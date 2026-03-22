import useReveal from '../hooks/useReveal'
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

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-inner">

          <div className="about-left">
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
            <a href="#contact" className="btn btn-primary btn-magnetic" style={{ marginTop: '1.5rem' }}>
              Work With Us
            </a>
          </div>

          <div className="about-right">
            <div ref={ref} className="about-blocks stagger">
              <div className="about-block">
                <span className="about-block-idx">01</span>
                <div>
                  <span className="about-block-label">Vision</span>
                  <p>To be the most trusted name in event infrastructure — known for precision, safety & scale.</p>
                </div>
              </div>
              <div className="about-block">
                <span className="about-block-idx">02</span>
                <div>
                  <span className="about-block-label">Mission</span>
                  <p>Deliver technically sound, visually impactful event setups that bring every vision to life.</p>
                </div>
              </div>
              <div className="about-block">
                <span className="about-block-idx">03</span>
                <div>
                  <span className="about-block-label">Approach</span>
                  <p>From blueprint to breakdown — we own every phase of the build with zero compromise on quality.</p>
                </div>
              </div>
            </div>

            <div className="about-stats">
              <AnimStat n="200" label="Events Delivered" />
              <AnimStat n="10" label="Cities Covered" />
              <AnimStat n="20" label="Years Active" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
