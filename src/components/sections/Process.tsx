'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Embed with engineering and product. Read the code, attend standups, interview developers. Docs written from a distance show it.',
  },
  {
    number: '02',
    title: 'Architect',
    description: 'Map the information architecture before writing a word. What does the developer need first? What will they search for at 2am?',
  },
  {
    number: '03',
    title: 'Write',
    description: 'Precise, scannable, human. Every sentence earns its place. Written for the developer who is frustrated and needs to ship.',
  },
  {
    number: '04',
    title: 'Validate',
    description: 'Real developers test the docs. If they get stuck, that is a documentation bug. Iterate until zero-to-working is frictionless.',
  },
  {
    number: '05',
    title: 'Measure',
    description: 'Track support deflection, time-to-first-call, integration rates. Docs are a product and should have metrics.',
  },
]

export default function Process() {
  return (
    <section id="process" className="py-28 bg-navy-light/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <SectionHeading number="02" title="How I Work" />
          <p className="text-slate-dim text-sm leading-relaxed max-w-xs md:text-right md:mb-14 md:pb-1 shrink-0">
            Documentation treated as a core product, not an afterthought.
          </p>
        </div>

        {/* Horizontal steps */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-0 relative">
          {/* Connector line — horizontal on desktop, vertical on mobile */}
          <div className="absolute top-5 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent hidden sm:block pointer-events-none" />
          <div className="absolute left-9 top-0 bottom-0 w-px bg-gradient-to-b from-teal/20 via-teal/10 to-transparent sm:hidden pointer-events-none" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="relative flex flex-col items-start sm:items-center text-left sm:text-center px-4 py-6 group"
            >
              {/* Step dot */}
              <div className="w-10 h-10 rounded-full border border-teal/20 bg-navy flex items-center justify-center mb-5 group-hover:border-teal/50 group-hover:bg-teal/5 transition-all duration-300 relative z-10">
                <span className="font-mono text-xs text-teal/60 group-hover:text-teal transition-colors">{step.number}</span>
              </div>

              <h3 className="text-sm font-bold text-slate-lightest mb-2 group-hover:text-teal transition-colors duration-200">
                {step.title}
              </h3>
              <p className="text-xs text-slate-dim leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
