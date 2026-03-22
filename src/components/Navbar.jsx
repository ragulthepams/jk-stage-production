import { useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import './Navbar.css'

const links = [
  { label: 'Services',  href: '#services' },
  { label: 'Work',      href: '#portfolio' },
  { label: 'About',     href: '#about' },
  { label: 'Contact',   href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav-bar">
        <a href="#hero"><img src={logo} alt="JK Stage Production" className="nav-logo" /></a>
        <ul className={`nav-menu ${open ? 'nav-menu--open' : ''}`}>
          {links.map(l => (
            <li key={l.label}><a href={l.href} onClick={() => setOpen(false)}>{l.label}</a></li>
          ))}
          <li>
            <a href="#contact" className="nav-cta btn btn-primary" onClick={() => setOpen(false)}>Get a Quote</a>
          </li>
        </ul>
        <button className={`nav-toggle ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
