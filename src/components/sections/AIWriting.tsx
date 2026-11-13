'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import { content } from '@/lib/content'

const pillars = content.aiWriting.pillars

const terminalLines = [
  { prefix: '→', text: 'Fetching tool: salla_create_app', dim: false },
  { prefix: '·', text: 'Reading: docs.salla.dev/openapi.json', dim: true },
  { prefix: '✓', text: 'Schema loaded: 300 endpoints resolved', dim: false },
  { prefix: '→', text: 'Generating OAuth2 integration...', dim: true },
  { prefix: '✓', text: 'Code generated from documented spec', dim: false },
]

export default function AIWriting() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (fading) return
    if (visibleCount < terminalLines.length) {
      const t = setTimeout(() => setVisibleCount(c => c + 1), 520)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setFading(true)
      setTimeout(() => { setFading(false); setVisibleCount(0) }, 500)
    }, 5000)
    return () => clearTimeout(t)
  }, [visibleCount, fading])

  return (
    <section id="ai" className="py-36 bg-[#fafaf9]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading number="03" title="Writing for AI" />

        <div className="max-w-2xl mb-16">
          <p className="text-text-body text-xl leading-relaxed">
            {content.aiWriting.intro}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-black/[0.07] rounded-2xl overflow-hidden mb-12">
          {pillars.map((p, i) => (
            <motion.div
              key={p.tag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-[#fafaf9] p-10 hover:bg-[#f2f1ee] transition-colors duration-200"
            >
              <span className="inline-block font-mono text-xs text-teal-dark border border-teal/30 bg-teal/[0.06] px-3 py-1 rounded-full mb-6">
                {p.tag}
              </span>
              <h3 className="text-xl font-bold text-[#0a0a10] mb-4 group-hover:text-teal-dark transition-colors">
                {p.title}
              </h3>
              <p className="text-text-body text-sm leading-relaxed mb-8">{p.body}</p>
              <p className="font-mono text-xs text-text-muted border-t border-black/[0.07] pt-5">{p.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border border-black/[0.08] rounded-2xl overflow-hidden"
        >
          <div className="flex items-center gap-2 px-6 py-4 bg-[#f2f1ee] border-b border-black/[0.07]">
            <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
            <span className="font-mono text-xs text-text-muted ml-4">mcp · salla-partners-portal</span>
            <span className="ml-auto font-mono text-[10px] text-teal-dark bg-teal/[0.08] border border-teal/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
              live
            </span>
          </div>

          <div className="relative h-[176px] font-mono text-xs bg-[#0a0a10] overflow-hidden">
            <div
              className="absolute inset-0 px-6 py-6"
              style={{ transition: 'opacity 0.45s ease', opacity: fading ? 0 : 1 }}
            >
              <div className="space-y-2.5">
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 transition-opacity duration-300"
                    style={{ opacity: i < visibleCount ? 1 : 0 }}
                  >
                    <span className={`w-3 shrink-0 ${line.dim ? 'text-white/30' : 'text-teal'}`}>{line.prefix}</span>
                    <span className={line.dim ? 'text-white/40' : 'text-teal'}>{line.text}</span>
                  </div>
                ))}
              </div>
              <div
                className="flex items-center gap-1 mt-3 transition-opacity duration-200"
                style={{ opacity: (visibleCount === terminalLines.length || visibleCount === 0) && !fading ? 1 : 0 }}
              >
                <span className="text-white/20">$</span>
                <span className="w-2 h-4 bg-teal/40 animate-pulse ml-1 inline-block" />
              </div>
            </div>
          </div>
        </motion.div>

        <p className="mt-10 text-center font-mono text-xs text-text-muted max-w-lg mx-auto leading-relaxed">
          {content.aiWriting.closing}
        </p>
      </div>
    </section>
  )
}
