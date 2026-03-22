import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import './Contact.css'

const FB_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const INSTA_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', type:'', message:'' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const change = e => setForm({ ...form, [e.target.name]: e.target.value })
  const ref = useReveal()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          eventType: form.type,
          message: form.message,
        }),
      })
      setSent(true)
    } catch {
      setSent(true)
    }
    setSending(false)
  }

  return (
    <section id="contact" className="section contact">
      <div ref={ref} className="container contact-inner reveal">

        <div className="contact-left">
          <span className="eyebrow">Get In Touch</span>
          <h2 className="contact-title">Let's Build<br />Something Great.</h2>
          <p>Tell us about your event and we'll get back to you within 24 hours.</p>

          <div className="contact-items">
            <div className="contact-item">
              <span className="contact-label">Email</span>
              <a href="mailto:jkstageproduction@yahoo.com" className="contact-value contact-link">jkstageproduction@yahoo.com</a>
              <a href="mailto:jksetworks@yahoo.co.in" className="contact-value contact-link">jksetworks@yahoo.co.in</a>
            </div>
          </div>

          <div className="contact-socials">
            <a href="#" target="_blank" rel="noopener noreferrer" className="contact-social" aria-label="Facebook">
              {FB_ICON}
              <span>Facebook</span>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="contact-social" aria-label="Instagram">
              {INSTA_ICON}
              <span>Instagram</span>
            </a>
          </div>
        </div>

        <div className="contact-right">
          {sent ? (
            <div className="contact-ok">
              <div className="ok-check">&#10003;</div>
              <h3>Enquiry Received</h3>
              <p>We'll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="f-row">
                <div className="f-group">
                  <label>Name</label>
                  <input name="name" placeholder="Your name" value={form.name} onChange={change} required />
                </div>
                <div className="f-group">
                  <label>Email</label>
                  <input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={change} required />
                </div>
              </div>
              <div className="f-row">
                <div className="f-group">
                  <label>Phone</label>
                  <input name="phone" placeholder="+91 00000 00000" value={form.phone} onChange={change} />
                </div>
                <div className="f-group">
                  <label>Event Type</label>
                  <select name="type" value={form.type} onChange={change} required>
                    <option value="">Select</option>
                    <option>Concert / Show</option>
                    <option>Audio Launch</option>
                    <option>Festival</option>
                    <option>Corporate Event</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="f-group">
                <label>Requirements</label>
                <textarea name="message" rows={4} placeholder="Describe your event..." value={form.message} onChange={change} required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={sending}>
                {sending ? 'Sending...' : 'Send Enquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
