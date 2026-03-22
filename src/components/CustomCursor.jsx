import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    let mx = 0, my = 0, dx = 0, dy = 0, rx = 0, ry = 0
    let raf

    const move = (e) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', move)

    const loop = () => {
      dx += (mx - dx) * 0.2
      dy += (my - dy) * 0.2
      rx += (mx - rx) * 0.08
      ry += (my - ry) * 0.08
      if (dotRef.current) {
        dotRef.current.style.left = dx + 'px'
        dotRef.current.style.top = dy + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px'
        ringRef.current.style.top = ry + 'px'
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Detect hoverable elements
    const onOver = () => setHovering(true)
    const onOut = () => setHovering(false)

    const attach = () => {
      document.querySelectorAll('a, button, .port-card-slider, .svc-row, .port-filter').forEach(el => {
        el.addEventListener('mouseenter', onOver)
        el.addEventListener('mouseleave', onOut)
      })
    }

    attach()
    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: 'fixed',
          width: hovering ? '6px' : '4px',
          height: hovering ? '6px' : '4px',
          borderRadius: '50%',
          background: '#fff',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s',
          boxShadow: '0 0 6px rgba(255,255,255,0.5)',
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: 'fixed',
          width: hovering ? '50px' : '30px',
          height: hovering ? '50px' : '30px',
          borderRadius: '50%',
          border: `1.5px solid ${hovering ? 'var(--orange)' : 'rgba(255,255,255,0.3)'}`,
          pointerEvents: 'none',
          zIndex: 9997,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s',
          mixBlendMode: 'difference',
        }}
      />
    </>
  )
}
