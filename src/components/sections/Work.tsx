'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import { featuredProjects, otherProjects } from '@/lib/data'

export default function Work() {
  const [showMore, setShowMore] = useState(false)

  return (
    <section id="work" className="py-14 md:py-16 bg-[#fafaf9]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading number="03" title="Selected Work" />

        {/* Featured: three cards in a row on desktop, a swipeable row
            (next card peeking in) on phones and tablets */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="-mx-6 px-6 scroll-px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 lg:mx-0 lg:px-0 lg:pb-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible"
        >
          {featuredProjects.map(project => (
            <a
              key={project.title}
              href={project.external}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col shrink-0 w-[86%] sm:w-[62%] md:w-[46%] lg:w-auto snap-start rounded-2xl border border-black/[0.08] bg-white/50 p-5 md:p-6 hover:bg-[#f2f1ee] hover:border-black/[0.12] transition-colors duration-200"
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="font-mono text-xs text-teal-dark">{project.number}</span>
                <span className="text-text-muted group-hover:text-teal-dark group-hover:translate-x-1 transition-all duration-200" aria-hidden>→</span>
              </div>

              <h3 className="text-lg font-bold text-[#0a0a10] leading-snug group-hover:text-teal-dark transition-colors mb-3">
                {project.title}
              </h3>

              <span className="self-start font-mono text-[10px] text-teal-dark bg-teal/[0.07] border border-teal/20 px-2.5 py-1 rounded-full mb-4">
                {project.metric}
              </span>

              <p className="text-text-body text-sm leading-relaxed mb-5">
                {project.description}
              </p>

              <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-4 border-t border-black/[0.06]">
                {project.tech.map(t => (
                  <li key={t} className="font-mono text-[10px] text-text-muted">{t}</li>
                ))}
              </ul>
            </a>
          ))}
        </motion.div>

        {/* Other projects */}
        <div className="mt-6 md:mt-8 text-center">
          <button
            onClick={() => setShowMore(v => !v)}
            aria-expanded={showMore}
            aria-controls="more-projects"
            className="font-mono text-xs text-text-muted hover:text-[#0a0a10] border border-black/[0.1] hover:border-black/25 px-6 py-3 rounded-full transition-all duration-200"
          >
            {showMore ? 'Hide projects' : `Show ${otherProjects.length} more projects`}
            <span className={`ml-2 inline-block transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`}>↓</span>
          </button>

          <AnimatePresence initial={false}>
            {showMore && (
              <motion.div
                id="more-projects"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-6 text-left grid sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
                  {otherProjects.map(p => (
                    <a
                      key={p.title}
                      href={p.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col rounded-xl border border-black/[0.07] bg-[#fafaf9] px-5 py-4 hover:bg-[#f2f1ee] transition-colors duration-200"
                    >
                      <span className="flex items-center justify-between gap-3 mb-1">
                        <span className="font-mono text-[10px] text-teal-dark">{p.company}</span>
                        <span className="text-text-muted group-hover:text-teal-dark transition-colors text-sm" aria-hidden>→</span>
                      </span>
                      <span className="text-sm font-semibold text-[#0a0a10] group-hover:text-teal-dark transition-colors mb-1">
                        {p.title}
                      </span>
                      <span className="text-xs text-text-body leading-relaxed">{p.description}</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
