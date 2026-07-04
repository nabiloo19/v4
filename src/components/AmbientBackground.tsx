'use client'

import { useScroll, useTransform, motion } from 'framer-motion'

export default function AmbientBackground() {
  const { scrollYProgress } = useScroll()

  const blob1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const blob2Y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const blob2X = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
  const blob3Y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const blob3X = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const blob4Y = useTransform(scrollYProgress, [0, 1], ['20%', '-10%'])

  const blobBase: React.CSSProperties = {
    position: 'absolute',
    borderRadius: '50%',
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Teal — top left */}
      <motion.div
        style={{
          ...blobBase,
          top: '-20%', left: '-10%',
          width: '70vw', height: '70vw',
          background: 'radial-gradient(circle, rgba(0,255,209,0.18) 0%, transparent 65%)',
          filter: 'blur(70px)',
          y: blob1Y,
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Indigo — top right */}
      <motion.div
        style={{
          ...blobBase,
          top: '-5%', right: '-15%',
          width: '55vw', height: '55vw',
          background: 'radial-gradient(circle, rgba(99,102,241,0.16) 0%, transparent 65%)',
          filter: 'blur(80px)',
          y: blob2Y, x: blob2X,
        }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Teal mid */}
      <motion.div
        style={{
          ...blobBase,
          top: '50%', left: '-5%',
          width: '45vw', height: '45vw',
          background: 'radial-gradient(circle, rgba(0,255,209,0.12) 0%, transparent 65%)',
          filter: 'blur(90px)',
          y: blob3Y, x: blob3X,
        }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
      />

      {/* Sky blue — bottom */}
      <motion.div
        style={{
          ...blobBase,
          bottom: '0', right: '10%',
          width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(56,189,248,0.13) 0%, transparent 65%)',
          filter: 'blur(80px)',
          y: blob4Y,
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 12 }}
      />
    </div>
  )
}
