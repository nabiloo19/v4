'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

const steps = [
  { number: '01', title: 'Discover', description: 'Embed with engineering and product. Read the code, attend standups, interview developers. Docs written from a distance show it.' },
  { number: '02', title: 'Architect', description: 'Map the information architecture before writing a word. What does the developer need first? What will they search for at 2am?' },
  { number: '03', title: 'Write', description: 'Precise, scannable, human. Every sentence earns its place. Written for the developer who is frustrated and needs to ship.' },
  { number: '04', title: 'Validate', description: 'Real developers test the docs. If they get stuck, that is a documentation bug. Iterate until zero-to-working is frictionless.' },
  { number: '05', title: 'Measure', description: 'Track support deflection, time-to-first-call, integration rates. Docs are a product and should have metrics.' },
]

export default function Process() {
  return (
    <section id="process" className="py-36 bg-[#f2f1ee]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <SectionHeading number="02" title="How I Work" />
          <p className="text-text-body text-sm leading-relaxed max-w-xs md:text-right md:mb-16 shrink-0">
            Documentation treated as a core product, not an afterthought.
          </p>
        </div>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`group flex gap-8 md:gap-16 py-8 ${i < steps.length - 1 ? 'border-b border-black/[0.07]' : ''} hover:bg-white/60 -mx-6 px-6 transition-colors duration-200`}
            >
              <span className="font-mono text-xs text-teal-dark shrink-0 mt-1 w-6">{step.number}</span>
              <div className="flex-1 flex flex-col md:flex-row md:items-baseline md:gap-12">
                <h3 className="text-lg font-bold text-[#0a0a10] mb-2 md:mb-0 md:w-32 shrink-0 group-hover:text-teal-dark transition-colors">
                  {step.title}
                </h3>
                <p className="text-text-body text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
