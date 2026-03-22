import logo from '../assets/logo.png'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#hero" className="footer-logo-row">
              <img src={logo} alt="JK Stage Production" className="footer-logo" />
              <div>
                <span className="footer-name">JK Stage Production</span>
                <p>Engineered for the stage. Built for the crowd.</p>
              </div>
            </a>
          </div>
          <div className="footer-nav">
            {['Services', 'Portfolio', 'About', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>
            ))}
          </div>
        </div>
        <div className="footer-divider" />
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} JK Stage Production. All rights reserved.</span>
          <span>jkstageproduction@yahoo.com</span>
        </div>
      </div>
    </footer>
  )
}
