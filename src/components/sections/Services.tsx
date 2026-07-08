'use client'

import { motion } from 'framer-motion'

const services = [
  {
    title: 'API Documentation',
    description: 'End-to-end API reference documentation: endpoints, parameters, auth flows, error codes, and code samples across multiple languages.',
  },
  {
    title: 'OpenAPI Specs',
    description: 'Fully-compliant OpenAPI / Swagger specifications that work as the single source of truth for both your team and any tool that reads them.',
  },
  {
    title: 'SDK Guides',
    description: 'Getting started guides, integration tutorials, and SDK documentation that take a developer from zero to working in under an hour.',
  },
  {
    title: 'Developer Portals',
    description: 'Full documentation systems: information architecture, content strategy, tooling selection, style guides, and ongoing maintenance.',
  },
  {
    title: 'Documentation Audits',
    description: 'A structured review of your existing docs — identifying gaps, inconsistencies, and friction points, with a clear plan to fix them.',
  },
  {
    title: 'Content Strategy',
    description: 'Long-term documentation strategy for growing developer platforms: what to write, how to structure it, and how to measure success.',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-36 bg-[#0a0a10]">
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex items-center gap-4 mb-5">
          <span className="font-mono text-[10px] text-teal tracking-[0.32em] uppercase">What I do</span>
          <span className="flex-1 h-px bg-white/[0.08]" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.08] tracking-tight mb-20">
          Services
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bg-[#0a0a10] p-8 hover:bg-white/[0.03] transition-colors duration-200 group"
            >
              <p className="font-mono text-[10px] text-teal tracking-[0.28em] uppercase mb-4">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="text-base font-bold text-white mb-3 group-hover:text-teal transition-colors">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 pt-14 border-t border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-white/60 text-sm max-w-md leading-relaxed">
            Available for contract and freelance engagements. Specialising in developer-facing products with complex APIs.
          </p>
          <a
            href="mailto:nabil.alanssi19@gmail.com"
            className="font-mono text-sm text-teal border border-teal/30 px-7 py-3.5 rounded-full hover:bg-teal/10 transition-colors shrink-0"
          >
            Let&apos;s talk →
          </a>
        </div>

      </div>
    </section>
  )
}
