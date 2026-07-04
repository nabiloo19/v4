'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

const pillars = [
  {
    tag: 'OpenAPI',
    title: '100% OpenAPI Compliant',
    body: 'Every Salla API endpoint I document is fully OpenAPI-compliant. Any LLM can import the spec and instantly understand auth, request shapes, response structures, and error codes. No human in the loop required. Structured docs are the interface.',
    detail: '300+ endpoints · Machine-readable by design',
  },
  {
    tag: 'MCP',
    title: 'Powering a Public MCP Server',
    body: 'I helped create the public Model Context Protocol (MCP) server for the Salla Partners Portal. When a developer asks Claude, Cursor, or any MCP-enabled agent to build on Salla, the agent reaches for this server. Around 95% of what it reads and acts on is content I wrote.',
    detail: '~95% content coverage · Claude · Cursor · VS Code',
  },
]

const terminalLines = [
  { prefix: '→', text: 'Fetching tool: salla_create_app', color: 'text-teal' },
  { prefix: '·', text: 'Reading: docs.salla.dev/openapi.json', color: 'text-slate-dim' },
  { prefix: '✓', text: 'Schema loaded: 300 endpoints resolved', color: 'text-teal' },
  { prefix: '→', text: 'Generating OAuth2 integration...', color: 'text-slate-dim' },
  { prefix: '✓', text: 'Code generated from documented spec', color: 'text-teal' },
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
    // All lines shown — wait 5s then fade and restart
    const t = setTimeout(() => {
      setFading(true)
      setTimeout(() => {
        setFading(false)
        setVisibleCount(0)
      }, 500)
    }, 5000)
    return () => clearTimeout(t)
  }, [visibleCount, fading])

  return (
    <section id="ai" className="py-32 bg-[#070a18]/80 border-y border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading number="03" title="Writing for AI" />

        <div className="max-w-2xl mb-16">
          <p className="text-slate-dim text-lg leading-relaxed">
            Documentation used to have one audience: developers. Not anymore. Today, AI agents, LLMs,
            and automated tools read docs to reason, generate code, and take action. I write for both.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {pillars.map((p, i) => (
            <motion.div
              key={p.tag}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative border border-white/5 rounded-2xl p-8 hover:border-teal/20 bg-navy/60 hover:bg-teal/5 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <span className="inline-block font-mono text-xs text-teal bg-teal/10 border border-teal/20 px-3 py-1 rounded-full mb-5">
                {p.tag}
              </span>
              <h3 className="text-xl font-bold text-slate-lightest mb-4 group-hover:text-teal transition-colors duration-300">
                {p.title}
              </h3>
              <p className="text-slate-dim leading-relaxed text-sm mb-6">{p.body}</p>
              <p className="font-mono text-xs text-teal/50 border-t border-white/5 pt-4">{p.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Looping terminal */}
        <div className="border border-white/5 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3 bg-navy-light/80 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
            <span className="font-mono text-xs text-slate-dim ml-3">mcp · salla-partners-portal</span>
            <span className="ml-auto font-mono text-[10px] text-teal/60 bg-teal/5 px-2 py-0.5 rounded flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
              live
            </span>
          </div>

          {/* Fixed-height body — content fades in/out inside, size never changes */}
          <div className="relative h-[176px] font-mono text-xs bg-navy/80 overflow-hidden">
            <div
              className="absolute inset-0 px-6 py-6 overflow-x-auto"
              style={{ transition: 'opacity 0.45s ease', opacity: fading ? 0 : 1 }}
            >
              <div className="space-y-2">
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 transition-opacity duration-300"
                    style={{ opacity: i < visibleCount ? 1 : 0 }}
                  >
                    <span className={`${line.color} w-3 shrink-0`}>{line.prefix}</span>
                    <span className={line.color}>{line.text}</span>
                  </div>
                ))}
              </div>

              <div
                className="flex items-center gap-1 mt-3 transition-opacity duration-200"
                style={{ opacity: (visibleCount === terminalLines.length || visibleCount === 0) && !fading ? 1 : 0 }}
              >
                <span className="text-teal/30">$</span>
                <span className="w-2 h-4 bg-teal/40 animate-pulse ml-1 inline-block" />
              </div>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center font-mono text-xs text-slate-dim/60 max-w-lg mx-auto leading-relaxed">
          The future of developer docs is not just human-readable.
          It is agent-ready, spec-compliant, and built to be consumed by whatever reads it.
        </p>
      </div>
    </section>
  )
}
