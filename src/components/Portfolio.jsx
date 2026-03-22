import { useState, useEffect, useRef, useCallback } from 'react'
import useCountUp from '../hooks/useCountUp'
import useTilt from '../hooks/useTilt'
import './Portfolio.css'

// ── Dynamic import of all portfolio images ──
const allPhotos = import.meta.glob('../assets/portfolio/*.jpg', { eager: true })

function getPhotos(...patterns) {
  return Object.entries(allPhotos)
    .filter(([path]) => {
      const name = path.split('/').pop().toLowerCase()
      return patterns.some(p => name.includes(p))
    })
    .map(([, mod]) => mod.default)
}

const events = [
  // ── Concerts ──
  { id: 'rock-raaja',     name: 'Rock With Raaja',         sub: 'Ilaiyaraaja Live Concert',   cat: 'Concert',
    photos: getPhotos('rock_raaja') },
  { id: 'yuvan',          name: 'U1niverse Tour',          sub: 'Yuvan Shankar Raja',         cat: 'Concert',
    photos: getPhotos('yuvan_') },
  { id: 'hiphop-tamizha', name: 'Return Of The Dragon',    sub: 'Hip Hop Tamizha',            cat: 'Concert',
    photos: getPhotos('hiphop_tamizha', 'hiphip tamizha', 'hiphop tamizha') },
  { id: 'sid-sriram',     name: 'All Love No Hate',        sub: 'Sid Sriram Concert',         cat: 'Concert',
    photos: getPhotos('sid_sriram') },
  { id: 'deva-the-deva',  name: 'Deva The Deva',           sub: 'Deva Concert',               cat: 'Concert',
    photos: getPhotos('deva_the_deva') },
  { id: 'deva-thenisai',  name: 'Thenisai Thendral Deva',  sub: 'Deva Live in Concert',       cat: 'Concert',
    photos: getPhotos('deva_thenisai') },
  { id: 'deva-more',      name: 'More Deva Concerts',      sub: 'Deva Live Series',           cat: 'Concert',
    photos: getPhotos('deva_more') },

  // ── Audio Launches ──
  { id: 'vikram',         name: 'Vikram',                  sub: 'Audio Launch',               cat: 'Audio Launch',
    photos: getPhotos('vikram_') },
  { id: 'coolie',         name: 'Coolie',                  sub: 'Audio Launch',               cat: 'Audio Launch',
    photos: getPhotos('coolie') },
  { id: 'ps1',            name: 'Ponniyin Selvan',         sub: 'Audio Launch',               cat: 'Audio Launch',
    photos: getPhotos('ps1_', 'ponniyin_selvan') },
  { id: 'varisu',         name: 'Varisu',                  sub: 'Audio Launch',               cat: 'Audio Launch',
    photos: getPhotos('varisu') },
  { id: 'pathu-thala',    name: 'Pathu Thala',             sub: 'Audio Launch',               cat: 'Audio Launch',
    photos: getPhotos('pathu_thala') },
  { id: 'leo',            name: 'Leo',                     sub: 'Success Meet',               cat: 'Audio Launch',
    photos: getPhotos('leo_') },
  { id: 'indian2',        name: 'Indian 2',                sub: 'Audio Launch',               cat: 'Audio Launch',
    photos: getPhotos('indian2') },
  { id: 'jailer',         name: 'Jailer',                  sub: 'Audio Launch',               cat: 'Audio Launch',
    photos: getPhotos('jailer') },
  { id: 'pushpa2',        name: 'Pushpa 2',                sub: 'Audio Launch',               cat: 'Audio Launch',
    photos: getPhotos('pushpa') },
  { id: 'kuberaa',        name: 'Kuberaa',                 sub: 'Audio Launch',               cat: 'Audio Launch',
    photos: getPhotos('kuberaa') },
  { id: 'kanguva',        name: 'Kanguva',                 sub: 'Audio Launch',               cat: 'Audio Launch',
    photos: getPhotos('kanguva') },
  { id: 'vettaiyan',      name: 'Vettaiyan',               sub: 'Audio Launch',               cat: 'Audio Launch',
    photos: getPhotos('vettaiyan', 'vettayan') },

  // ── Corporate ──
  { id: 'kalaignar',      name: 'Kalaignar 100',           sub: 'Centenary Celebration',      cat: 'Corporate',
    photos: getPhotos('kalaignar') },
  { id: 'daimler',        name: 'Daimler',                 sub: 'Corporate Event',            cat: 'Corporate',
    photos: getPhotos('daimler') },
  { id: 'mahindra',       name: 'Mahindra',                sub: 'Corporate Event',            cat: 'Corporate',
    photos: getPhotos('mahindra') },
  { id: 'platinum-guild', name: 'Season of Love',          sub: 'Platinum Guild International', cat: 'Corporate',
    photos: getPhotos('platinum_guild') },
  { id: 'born-mettle',    name: 'Born of Mettle',          sub: 'DAIMLER Product Launch',     cat: 'Corporate',
    photos: getPhotos('born_mettle', 'born on metel') },
  { id: 'mirchi-awards',  name: 'Mirchi Music Awards',     sub: 'South',                      cat: 'Corporate',
    photos: getPhotos('mirchi_awards') },
  { id: 'corporate',      name: 'Corporate Events',        sub: 'Stage & Truss Infrastructure', cat: 'Corporate',
    photos: getPhotos('corporate') },
].filter(e => e.photos.length > 0)

const cats = ['All', 'Concert', 'Audio Launch', 'Corporate']

function AnimStat({ n, label, suffix = '+' }) {
  const { ref, count } = useCountUp(n, 2000)
  return (
    <div ref={ref} className="port-stat">
      <span className="port-stat-n">{count}{suffix}</span>
      <span className="port-stat-l">{label}</span>
    </div>
  )
}

function EventCard({ ev, index, onOpenLightbox }) {
  const [cur, setCur] = useState(0)
  const [visible, setVisible] = useState(false)
  const timerRef = useRef(null)
  const progressRef = useRef(null)
  const cardRef = useRef(null)
  const len = ev.photos.length
  const tilt = useTilt(6)

  // Individual card reveal
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), Math.min(index, 6) * 80)
          obs.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    // restart progress animation
    if (progressRef.current) {
      progressRef.current.style.transition = 'none'
      progressRef.current.style.width = '0%'
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (progressRef.current) {
            progressRef.current.style.transition = 'width 3s linear'
            progressRef.current.style.width = '100%'
          }
        })
      })
    }
    timerRef.current = setInterval(() => {
      setCur(p => (p + 1) % len)
    }, 3000)
  }, [len])

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  useEffect(() => {
    // reset progress on slide change
    if (progressRef.current) {
      progressRef.current.style.transition = 'none'
      progressRef.current.style.width = '0%'
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (progressRef.current) {
            progressRef.current.style.transition = 'width 3s linear'
            progressRef.current.style.width = '100%'
          }
        })
      })
    }
  }, [cur])

  const go = (dir) => {
    setCur(p => (p + dir + len) % len)
    startTimer()
  }

  return (
    <div ref={cardRef} className={`port-card${visible ? ' port-card-visible' : ''}`} {...tilt} style={{ transition: 'transform 0.15s ease-out' }}>
      <div className="port-card-glow" />
      <div
        className="port-card-slider"
        onClick={() => onOpenLightbox(ev.photos, cur)}
      >
        {ev.photos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${ev.name} ${i + 1}`}
            className={`port-card-img${i === cur ? ' active' : ''}`}
            loading="lazy"
          />
        ))}
        {len > 1 && (
          <>
            <button className="port-card-arr port-card-arr-l" onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label="Previous">&#8249;</button>
            <button className="port-card-arr port-card-arr-r" onClick={(e) => { e.stopPropagation(); go(1) }} aria-label="Next">&#8250;</button>
          </>
        )}
        {/* Progress bar */}
        {len > 1 && (
          <div className="port-card-progress">
            <div ref={progressRef} className="port-card-progress-bar" />
          </div>
        )}
        {/* Photo count badge */}
        <span className="port-card-count">{cur + 1} / {len}</span>
      </div>
      <div className="port-card-info">
        <span className="port-card-name">{ev.name}</span>
        <span className="port-card-sub">{ev.sub}</span>
      </div>
      <span className="port-card-cat">{ev.cat}</span>
    </div>
  )
}

function Lightbox({ photos, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx)
  const len = photos.length

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIdx(p => (p + 1) % len)
      if (e.key === 'ArrowLeft') setIdx(p => (p - 1 + len) % len)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [len, onClose])

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <img src={photos[idx]} alt="" className="lightbox-img" />
        {len > 1 && (
          <>
            <button className="lightbox-arr lightbox-arr-l" onClick={() => setIdx(p => (p - 1 + len) % len)}>&#8249;</button>
            <button className="lightbox-arr lightbox-arr-r" onClick={() => setIdx(p => (p + 1) % len)}>&#8250;</button>
          </>
        )}
        <span className="lightbox-counter">{idx + 1} / {len}</span>
      </div>
      <button className="lightbox-close" onClick={onClose}>&#10005;</button>
    </div>
  )
}

export default function Portfolio() {
  const [activeCat, setActiveCat] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = activeCat === 'All' ? events : events.filter(e => e.cat === activeCat)

  return (
    <section id="portfolio" className="section port">
      <div className="container">

        {/* ── Heading ── */}
        <div className="port-head">
          <div>
            <span className="eyebrow">Our Work</span>
            <h2 className="port-title">Built on Every Stage.</h2>
          </div>
        </div>

        {/* ── Company intro + stats ── */}
        <div className="port-intro">
          <div className="port-intro-text">
            <p>
              JK Stage Production specialises in full-scale event infrastructure — from ground up.
              We design, fabricate, and install truss systems, roofing structures, stage platforms,
              scaffolding, LED wall rigging, and custom fabrication for concerts, audio launches,
              film success meets, corporate events, and large-scale public productions.
            </p>
            <p>
              Every project is executed with engineering precision, safety compliance, and a
              crew that has seen it all — from intimate indoor setups to massive open-air arenas
              across South India.
            </p>
          </div>
          <div className="port-stats">
            <AnimStat n="20" label="Years of Experience" />
            <AnimStat n="200" label="Events Delivered" />
            <AnimStat n="100" label="Satisfied Clients" />
            <AnimStat n="10" label="Cities Across South India" />
          </div>
        </div>

        {/* ── Gallery filter tabs ── */}
        <div className="port-gallery-head">
          <span className="eyebrow">Gallery</span>
          <div className="port-filters">
            {cats.map(c => (
              <button
                key={c}
                className={`port-filter${activeCat === c ? ' active' : ''}`}
                onClick={() => setActiveCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* ── Event cards grid ── */}
        <div className="port-grid">
          {filtered.map((ev, i) => (
            <EventCard
              key={ev.id}
              ev={ev}
              index={i}
              onOpenLightbox={(photos, idx) => setLightbox({ photos, idx })}
            />
          ))}
        </div>

      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <Lightbox
          photos={lightbox.photos}
          startIdx={lightbox.idx}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  )
}
