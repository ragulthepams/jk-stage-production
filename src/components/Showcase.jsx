import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Showcase.css'

const images = [
  '/showcase/slide-1.jpg?v=ai_enhance',
  '/showcase/slide-2.jpg?v=ai_enhance',
  '/showcase/slide-3.jpg?v=ai_enhance',
  '/showcase/slide-4.jpg?v=ai_enhance',
  '/showcase/slide-5.jpg?v=ai_enhance',
]

const sliderVariants = {
  enter: { opacity: 0, scale: 1.05 },
  center: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
}

export default function Showcase() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="showcase-section">
      <div className="showcase-bg-slider">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={index}
            src={images[index]}
            alt="Hiphop Tamizha Stage Setup"
            className="showcase-img"
            variants={sliderVariants}
            initial="enter"
            animate="center"
            exit="exit"
          />
        </AnimatePresence>
        <div className="showcase-overlay" />
      </div>

      <div className="showcase-content container">
        <motion.div
          className="showcase-tag"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="accent-line" />
          <span>Recent Mega Showcase</span>
        </motion.div>

        <motion.h2
          className="showcase-title"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Hiphop Tamizha:<br />
          <span className="sc-highlight">Return of the Dragon</span><br />
          Machi Homecoming Final.
        </motion.h2>

        <motion.div
          className="showcase-info"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="sc-date">07 . 03 . 2026</div>
          <p className="sc-desc">
            We are incredibly proud to have partnered with <strong>Torque Entertainment</strong> to engineer and construct the massive stage infrastructure required for this historic homecoming final. A benchmark event reflecting our commitment to scale, safety, and iconic design.
          </p>
        </motion.div>

        <div className="sc-controls">
          {images.map((_, i) => (
            <button
              key={i}
              className={`sc-dot ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
