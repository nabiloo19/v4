'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import { jobs } from '@/lib/data'
import { clsx as cn } from 'clsx'

// One job at a time: company tabs (a column on desktop, wrapped pills on
// phones) and a detail panel with every bullet of the selected job.
export default function Experience() {
  const [selected, setSelected] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const focusTab = (i: number) => {
    const next = (i + jobs.length) % jobs.length
    setSelected(next)
    tabRefs.current[next]?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); focusTab(selected + 1) }
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); focusTab(selected - 1) }
    else if (e.key === 'Home') { e.preventDefault(); focusTab(0) }
    else if (e.key === 'End') { e.preventDefault(); focusTab(jobs.length - 1) }
  }

  return (
    <section id="experience" className="py-14 md:py-16 bg-[#f2f1ee]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading number="02" title="Experience" />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-[260px_1fr] gap-6 md:gap-12"
        >
          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Experience"
            className="flex flex-wrap gap-2 md:flex-col md:flex-nowrap md:gap-0 md:border-l md:border-black/[0.08]"
          >
            {jobs.map((job, i) => {
              const active = i === selected
              return (
                <button
                  key={job.company}
                  ref={el => { tabRefs.current[i] = el }}
                  role="tab"
                  id={`job-tab-${i}`}
                  aria-selected={active}
                  aria-controls={`job-panel-${i}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setSelected(i)}
                  onKeyDown={onKeyDown}
                  className={cn(
                    'text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-dark',
                    // phones: pills
                    'rounded-full border px-3.5 py-1.5 text-xs font-medium',
                    // desktop: list rows with an accent bar
                    'md:rounded-none md:border-0 md:border-l-2 md:-ml-px md:px-5 md:py-2.5',
                    active
                      ? 'border-teal-dark bg-white text-[#0a0a10] md:bg-white/70'
                      : 'border-black/[0.1] text-text-body hover:text-[#0a0a10] md:border-transparent md:hover:bg-white/40',
                  )}
                >
                  <span className="block md:text-sm md:font-semibold">{job.company}</span>
                  <span className="hidden md:block font-mono text-[10px] text-text-muted tracking-wide mt-0.5">{job.range}</span>
                </button>
              )
            })}
          </div>

          {/* Panels: all rendered, only the selected one shown */}
          <div className="min-w-0">
            {jobs.map((job, i) => (
              <div
                key={job.company}
                role="tabpanel"
                id={`job-panel-${i}`}
                aria-labelledby={`job-tab-${i}`}
                hidden={i !== selected}
                tabIndex={0}
                className="motion-safe:animate-fade-in focus-visible:outline-none"
              >
                <h3 className="text-lg md:text-xl font-bold text-[#0a0a10] leading-snug">
                  {job.title}{' '}
                  <span className="text-teal-dark">
                    @{' '}
                    {job.url ? (
                      <a href={job.url} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
                        {job.company}
                      </a>
                    ) : job.company}
                  </span>
                </h3>
                <p className="font-mono text-[11px] text-text-muted tracking-wide mt-1.5 mb-5">{job.range}</p>
                <ul className="space-y-3">
                  {job.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-3 text-sm md:text-[15px] text-text-body leading-relaxed">
                      <span className="text-teal-dark shrink-0 mt-[2px]" aria-hidden>▹</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
