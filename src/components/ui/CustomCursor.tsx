'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ringX = 0, ringY = 0
    let dotX = 0, dotY = 0
    let animFrame: number

    const move = (e: MouseEvent) => {
      dotX = e.clientX
      dotY = e.clientY
    }

    const animate = () => {
      ringX += (dotX - ringX) * 0.12
      ringY += (dotY - ringY) * 0.12

      if (dot.current) {
        dot.current.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`
      }
      if (ring.current) {
        ring.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`
      }
      animFrame = requestAnimationFrame(animate)
    }

    const onEnterLink = () => ring.current?.classList.add('scale-150', 'border-teal')
    const onLeaveLink = () => ring.current?.classList.remove('scale-150', 'border-teal')

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    animFrame = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(animFrame)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="fixed top-0 left-0 w-2 h-2 bg-teal rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block" />
      <div ref={ring} className="fixed top-0 left-0 w-9 h-9 border border-teal/40 rounded-full pointer-events-none z-[9998] transition-transform duration-200 hidden md:block" />
    </>
  )
}
