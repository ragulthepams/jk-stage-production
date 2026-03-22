import useReveal from '../hooks/useReveal'
import './Services.css'

const services = [
  { title: 'Truss Systems',          sub: 'Aluminum & steel truss for lighting, audio & stage support' },
  { title: 'Roofing Structures',     sub: 'Weather-resistant covering systems for outdoor events' },
  { title: 'Stage Construction',     sub: 'Custom & modular stages for concerts, launches & corporate' },
  { title: 'Scaffolding Solutions',  sub: 'Industrial-grade scaffolding with safety compliance' },
  { title: 'Event Fabrication',      sub: 'Custom builds — frames, panels, branded structures' },
  { title: 'Launch & Unveil Setups', sub: 'Precision setups for product reveals & activations' },
]

export default function Services() {
  const ref = useReveal()

  return (
    <section id="services" className="section svc">
      <div className="container">
        <div className="svc-head">
          <div>
            <span className="eyebrow">Services</span>
            <h2>What We<br />Build.</h2>
          </div>
          <p>End-to-end event infrastructure — from structural design to on-ground execution.</p>
        </div>

        <div ref={ref} className="svc-list stagger">
          {services.map((s, i) => (
            <a key={i} className="svc-row" href="#contact">
              <span className="svc-idx">0{i + 1}</span>
              <h3 className="svc-name">{s.title}</h3>
              <p className="svc-desc">{s.sub}</p>
              <span className="svc-arrow">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
