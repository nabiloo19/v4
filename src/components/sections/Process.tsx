'use client'

import { motion } from 'framer-motion'
import { content } from '@/lib/content'

const steps = content.process.steps.map((s, i) => ({ ...s, number: String(i + 1).padStart(2, '0') }))

// "How I Work": shown inside the Services section as one row of steps.
export default function Process() {
  return (
    <div id="process" className="mt-12 md:mt-14">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-10 mb-6 md:mb-8">
        <h3 id="process-title" className="text-2xl md:text-3xl font-bold text-white leading-[1.1] tracking-tight">How I Work</h3>
        <p className="text-white/60 text-sm leading-relaxed md:max-w-xs md:text-right">
          {content.process.intro}
        </p>
      </div>

      {/* Phones: a swipeable row of step cards. Wider screens: a grid. */}
      <motion.ol
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        tabIndex={0}
        aria-labelledby="process-title"
        className="-mx-6 px-6 scroll-px-6 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 focus-visible:outline focus-visible:outline-1 focus-visible:outline-teal/40 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-px sm:bg-white/[0.06] sm:border-y sm:border-white/[0.06]"
      >
        {steps.map(step => (
          <li
            key={step.number}
            className="group shrink-0 w-[74%] snap-start rounded-xl border border-white/[0.08] p-4 bg-[#0a0a10] sm:w-auto sm:rounded-none sm:border-0 sm:p-5 sm:last:col-span-2 lg:last:col-span-1 hover:bg-white/[0.03] transition-colors duration-200"
          >
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-mono text-[10px] text-teal tracking-[0.2em]">{step.number}</span>
              <h4 className="text-base font-bold text-white group-hover:text-teal transition-colors">{step.title}</h4>
            </div>
            <p className="text-white/55 text-sm leading-relaxed">{step.description}</p>
          </li>
        ))}
      </motion.ol>
    </div>
  )
}
