import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [ringPosition, setRingPosition] = useState({ x: -100, y: -100 })

  useEffect(() => {
    let mx = -100
    let my = -100
    let rx = -100
    let ry = -100

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const animate = () => {
      setPosition({ x: mx, y: my })
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      setRingPosition({ x: rx, y: ry })
      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(animationId)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const handleMouseEnter = () => {
      const cursor = document.getElementById('cursor')
      if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(2.5)'
    }

    const handleMouseLeave = () => {
      const cursor = document.getElementById('cursor')
      if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        id="cursor"
        className="fixed w-[10px] h-[10px] bg-[#f0c040] rounded-full pointer-events-none z-[9999] transition-transform duration-[100ms]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%) scale(1)',
          boxShadow: '0 0 8px rgba(240,192,64,0.8)'
        }}
      />
      <div
        id="cursor-ring"
        className="fixed w-[38px] h-[38px] border border-[rgba(201,168,76,0.6)] rounded-full pointer-events-none z-[9998] transition-transform duration-[180ms]"
        style={{
          left: `${ringPosition.x}px`,
          top: `${ringPosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  )
}
