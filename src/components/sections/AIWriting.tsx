'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import { content } from '@/lib/content'

const pillars = content.aiWriting.pillars

// Read after mount (not during render) so the server HTML and the first
// client render match; follows the OS setting if it changes.
function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduce(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduce
}

const terminalLines = [
  { prefix: '→', text: 'Fetching tool: salla_create_app', dim: false },
  { prefix: '·', text: 'Reading: docs.salla.dev/openapi.json', dim: true },
  { prefix: '✓', text: 'Schema loaded: 300 endpoints resolved', dim: false },
  { prefix: '→', text: 'Generating OAuth2 integration...', dim: true },
  { prefix: '✓', text: 'Code generated from documented spec', dim: false },
]

export default function AIWriting() {
  const reduceMotion = usePrefersReducedMotion()
  const [visibleCount, setVisibleCount] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (reduceMotion) return
    if (fading) {
      const t = setTimeout(() => { setFading(false); setVisibleCount(0) }, 500)
      return () => clearTimeout(t)
    }
    if (visibleCount < terminalLines.length) {
      const t = setTimeout(() => setVisibleCount(c => c + 1), 520)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setFading(true), 5000)
    return () => clearTimeout(t)
  }, [visibleCount, fading, reduceMotion])

  // Reduced motion: the whole log, no typing loop.
  const shown = reduceMotion ? terminalLines.length : visibleCount
  const isFading = reduceMotion ? false : fading

  return (
    <section id="ai" className="py-14 md:py-16 bg-[#f2f1ee]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading number="04" title="Writing for AI" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left: intro + terminal */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <p className="text-text-body text-base md:text-lg leading-relaxed">
              {content.aiWriting.intro}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="border border-black/[0.08] rounded-2xl overflow-hidden"
            >
              <div className="flex items-center gap-2 px-5 py-3 bg-[#fafaf9] border-b border-black/[0.07]">
                <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
                <span className="min-w-0 font-mono text-[11px] text-text-muted ml-3 truncate">mcp · salla-partners-portal</span>
                <span className="ml-auto shrink-0 font-mono text-[10px] text-teal-dark bg-teal/[0.08] border border-teal/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse motion-reduce:animate-none" />
                  live
                </span>
              </div>

              <div className="font-mono text-[11px] sm:text-xs bg-[#0a0a10] px-5 py-5">
                <div style={{ transition: 'opacity 0.45s ease', opacity: isFading ? 0 : 1 }}>
                  <div className="space-y-2.5">
                    {terminalLines.map((line, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 transition-opacity duration-300"
                        style={{ opacity: i < shown ? 1 : 0 }}
                      >
                        <span className={`w-3 shrink-0 ${line.dim ? 'text-white/30' : 'text-teal'}`}>{line.prefix}</span>
                        <span className={line.dim ? 'text-white/40' : 'text-teal'}>{line.text}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    className="flex items-center gap-1 mt-3 transition-opacity duration-200"
                    style={{ opacity: (shown === terminalLines.length || shown === 0) && !isFading ? 1 : 0 }}
                  >
                    <span className="text-white/20">$</span>
                    <span className="w-2 h-4 bg-teal/40 animate-pulse motion-reduce:animate-none ml-1 inline-block" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: the two pillars + closing line */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="grid sm:grid-cols-2 gap-px bg-black/[0.07] rounded-2xl overflow-hidden border border-black/[0.07]">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.tag}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group flex flex-col bg-[#fafaf9] p-6 hover:bg-white transition-colors duration-200"
                >
                  <span className="self-start font-mono text-xs text-teal-dark border border-teal/30 bg-teal/[0.06] px-3 py-1 rounded-full mb-4">
                    {p.tag}
                  </span>
                  <h3 className="text-lg font-bold text-[#0a0a10] leading-snug mb-3 group-hover:text-teal-dark transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-text-body text-sm leading-relaxed mb-5">{p.body}</p>
                  <p className="mt-auto font-mono text-[11px] text-text-muted border-t border-black/[0.07] pt-4">{p.detail}</p>
                </motion.div>
              ))}
            </div>

            <p className="mt-6 font-mono text-xs text-text-muted leading-relaxed">
              {content.aiWriting.closing}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
