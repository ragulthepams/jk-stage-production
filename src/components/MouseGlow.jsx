import { useEffect, useRef } from 'react'

export default function MouseGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    let raf
    let mx = 0, my = 0, cx = 0, cy = 0

    const move = (e) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', move)

    const loop = () => {
      cx += (mx - cx) * 0.08
      cy += (my - cy) * 0.08
      if (el) {
        el.style.left = cx + 'px'
        el.style.top = cy + 'px'
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="mouse-glow" />
}
