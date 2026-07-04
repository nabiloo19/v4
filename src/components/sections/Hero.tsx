'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const cyclingWords = ['API docs', 'OpenAPI specs', 'SDK guides', 'dev portals', 'release notes']

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => setWordIndex(i => (i + 1) % cyclingWords.length), 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,209,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,209,0.025)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,255,209,0.06),transparent)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="flex items-center gap-3 mb-12">
          <span className="w-6 h-px bg-teal/60" />
          <span className="font-mono text-teal/70 text-xs tracking-[0.3em] uppercase">Lead Technical Writer · Salla</span>
        </div>

        <div className="mb-10">
          <h1 className="text-[clamp(2rem,7.5vw,7rem)] font-bold text-slate-lightest leading-[1.06] tracking-tight mb-1">
            I write
          </h1>

          <div className="overflow-hidden" style={{ fontSize: 'clamp(2rem, 7.5vw, 7rem)', lineHeight: '1.06', height: '1.1em' }}>
            {mounted ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={wordIndex}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="font-bold text-gradient leading-[1.02] tracking-tight"
                >
                  {cyclingWords[wordIndex]}
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="font-bold text-gradient leading-[1.02] tracking-tight">{cyclingWords[0]}</div>
            )}
          </div>

          <h1 className="text-[clamp(2rem,7.5vw,7rem)] font-bold leading-[1.06] tracking-tight">
            <span className="text-slate-lightest">built for humans,</span>
          </h1>
          <h1 className="text-[clamp(2rem,7.5vw,7rem)] font-bold leading-[1.06] tracking-tight">
            <span className="text-slate-dim">ready for agents.</span>
          </h1>
        </div>

        <p className="max-w-lg text-slate-dim text-lg leading-relaxed mb-10">
          I&apos;m <span className="text-slate-lightest font-medium">Nabil Mohammed</span>, Lead Technical Writer
          at{' '}
          <a href="https://salla.dev/" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline underline-offset-4 decoration-teal/40">
            Salla
          </a>
          . I write API docs, SDK guides, and OpenAPI specs that ship developer adoption and power the AI
          agents building on top.
        </p>

        <div className="flex flex-wrap gap-4 mb-20">
          <a href="#work" className="inline-flex items-center gap-2 bg-teal text-navy font-mono font-bold text-sm px-7 py-3.5 rounded-full hover:scale-105 transition-transform duration-200">
            See my work <span>→</span>
          </a>
          <a href="mailto:nabil.alanssi19@gmail.com" className="inline-flex items-center gap-2 text-teal font-mono text-sm px-7 py-3.5 rounded-full border border-teal/30 hover:bg-teal/10 transition-all duration-200">
            Get in touch
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {[
            { value: '7+', label: 'Years experience' },
            { value: '300+', label: 'API docs shipped' },
            { value: '10k+', label: 'Developers served' },
            { value: '100%', label: 'OpenAPI compliant' },
          ].map(stat => (
            <div key={stat.label} className="bg-navy/80 px-4 md:px-6 py-6 hover:bg-teal/5 transition-colors duration-300">
              <p className="text-2xl md:text-4xl font-bold text-teal mb-1">{stat.value}</p>
              <p className="font-mono text-xs text-slate-dim tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-teal rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}
