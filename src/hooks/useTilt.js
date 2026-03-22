import { useCallback } from 'react'

export default function useTilt(intensity = 8) {
  const onMouseMove = useCallback((e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.02,1.02,1.02)`
    // glow follow
    el.style.setProperty('--gx', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--gy', `${(y + 0.5) * 100}%`)
  }, [intensity])

  const onMouseLeave = useCallback((e) => {
    const el = e.currentTarget
    el.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale3d(1,1,1)'
  }, [])

  return { onMouseMove, onMouseLeave }
}
