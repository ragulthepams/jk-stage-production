import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MouseGlow from './components/MouseGlow'
import ParticleField from './components/ParticleField'
import './App.css'

export default function App() {
  return (
    <>
      <ParticleField />
      <MouseGlow />
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </>
  )
}
