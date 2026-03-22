import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import Preloader from './components/Preloader'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Process from './components/Process'
import Portfolio from './components/Portfolio'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MouseGlow from './components/MouseGlow'
import ParticleField from './components/ParticleField'
import WhatsAppButton from './components/WhatsAppButton'
import './App.css'

export default function App() {
  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <CustomCursor />
      <ParticleField />
      <MouseGlow />
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
