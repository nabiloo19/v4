'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import { featuredProjects, otherProjects } from '@/lib/data'

export default function Work() {
  const [showMore, setShowMore] = useState(false)

  return (
    <section id="work" className="py-36 bg-[#fafaf9]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading number="05" title="Selected Work" />

        {/* Featured — editorial rows */}
        <div className="space-y-0 mb-14">
          {featuredProjects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.external}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`group flex flex-col md:flex-row md:items-center gap-4 md:gap-10 py-8 ${i < featuredProjects.length - 1 ? 'border-b border-black/[0.07]' : ''} hover:bg-[#f2f1ee] -mx-6 px-6 transition-colors duration-200`}
            >
              <span className="font-mono text-xs text-teal-dark w-6 shrink-0">{project.number}</span>

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-[#0a0a10] group-hover:text-teal-dark transition-colors mb-1">
                  {project.title}
                </h3>
                <p className="text-text-body text-sm leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                <span className="font-mono text-[10px] text-teal-dark bg-teal/[0.07] border border-teal/20 px-2.5 py-1 rounded-full whitespace-nowrap">
                  {project.metric}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 2).map(t => (
                    <span key={t} className="font-mono text-[10px] text-text-muted">{t}</span>
                  ))}
                </div>
              </div>

              <span className="text-text-muted group-hover:text-teal-dark group-hover:translate-x-1 transition-all duration-200 shrink-0">
                →
              </span>
            </motion.a>
          ))}
        </div>

        {/* Other projects */}
        <div className="text-center">
          <button
            onClick={() => setShowMore(v => !v)}
            className="font-mono text-xs text-text-muted hover:text-[#0a0a10] border border-black/[0.1] hover:border-black/25 px-6 py-3 rounded-full transition-all duration-200"
          >
            {showMore ? 'Hide projects' : `Show ${otherProjects.length} more projects`}
            <span className={`ml-2 inline-block transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`}>↓</span>
          </button>

          <AnimatePresence>
            {showMore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-8 text-left border border-black/[0.07] rounded-2xl overflow-hidden">
                  {otherProjects.map((p, i) => (
                    <motion.a
                      key={p.title}
                      href={p.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25, delay: i * 0.03 }}
                      className={`group flex items-center gap-6 px-6 py-5 hover:bg-[#f2f1ee] transition-colors duration-200 ${i < otherProjects.length - 1 ? 'border-b border-black/[0.07]' : ''}`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-[10px] text-teal-dark mb-1">{p.company}</p>
                        <h4 className="text-sm font-semibold text-[#0a0a10] group-hover:text-teal-dark transition-colors">
                          {p.title}
                        </h4>
                      </div>
                      <p className="hidden md:block text-xs text-text-body flex-1 line-clamp-1">{p.description}</p>
                      <span className="text-text-muted group-hover:text-teal-dark group-hover:translate-x-1 transition-all duration-200 shrink-0">→</span>
                    </motion.a>
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
