import { useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import './Preloader.css'

export default function Preloader() {
  const [done, setDone] = useState(false)
  const [hide, setHide] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setDone(true), 2200)
    const timer2 = setTimeout(() => setHide(true), 2800)
    return () => { clearTimeout(timer1); clearTimeout(timer2) }
  }, [])

  if (hide) return null

  return (
    <div className={`preloader${done ? ' preloader-done' : ''}`}>
      <div className="preloader-inner">
        <img src={logo} alt="JK Stage Production" className="preloader-logo" />
        <div className="preloader-bar">
          <div className="preloader-bar-fill" />
        </div>
        <span className="preloader-text">Loading Experience</span>
      </div>
    </div>
  )
}
