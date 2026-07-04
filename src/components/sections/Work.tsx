'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import { featuredProjects, otherProjects } from '@/lib/data'

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

export default function Work() {
  const [showMore, setShowMore] = useState(false)

  return (
    <section id="work" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading number="05" title="Selected Work" />

        {/* Featured — compact 3-column grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {featuredProjects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.external}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col border border-white/5 rounded-2xl p-6 hover:border-teal/20 bg-navy-light/40 hover:bg-teal/5 transition-all duration-300"
            >
              {/* Number + metric row */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-3xl font-bold text-white/5 group-hover:text-teal/15 transition-colors leading-none select-none">
                  {project.number}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-teal bg-teal/10 border border-teal/15 px-2.5 py-1 rounded-full shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                  {project.metric}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-slate-lightest group-hover:text-teal transition-colors duration-300 mb-3 leading-snug">
                {project.title}
              </h3>

              {/* Description — truncated */}
              <p className="text-slate-dim text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.slice(0, 3).map(t => (
                  <span key={t} className="font-mono text-[10px] text-slate-dim bg-white/5 px-2 py-0.5 rounded-full">
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="font-mono text-[10px] text-slate-dim/50 px-1">+{project.tech.length - 3}</span>
                )}
              </div>

              <span className="flex items-center gap-1.5 text-xs font-mono text-teal/60 group-hover:text-teal group-hover:gap-2.5 transition-all duration-200 mt-auto">
                View project <ExternalIcon />
              </span>
            </motion.a>
          ))}
        </div>

        {/* Other projects — collapsed */}
        <div className="text-center">
          <button
            onClick={() => setShowMore(v => !v)}
            className="inline-flex items-center gap-2 font-mono text-xs text-slate-dim hover:text-teal border border-white/10 hover:border-teal/30 px-6 py-3 rounded-full transition-all duration-200"
          >
            {showMore ? 'Hide projects' : `Show ${otherProjects.length} more projects`}
            <span className={`transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`}>↓</span>
          </button>

          <AnimatePresence>
            {showMore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-6 text-left">
                  {otherProjects.map((p, i) => (
                    <motion.div
                      key={p.title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: (i % 3) * 0.05 }}
                      className="group flex flex-col justify-between p-5 border border-white/5 rounded-xl hover:border-teal/20 bg-navy-light/30 hover:bg-teal/5 transition-all duration-300"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <p className="font-mono text-[10px] text-teal/50 mb-1 tracking-wide">{p.company}</p>
                            <h4 className="text-sm font-semibold text-slate-lightest group-hover:text-teal transition-colors leading-snug">
                              {p.title}
                            </h4>
                          </div>
                          <div className="flex items-center gap-2 text-slate-dim shrink-0 mt-0.5">
                            {'github' in p && p.github && (
                              <a href={p.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="hover:text-teal transition-colors">
                                <GithubIcon />
                              </a>
                            )}
                            <a href={p.external} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="hover:text-teal transition-colors">
                              <ExternalIcon />
                            </a>
                          </div>
                        </div>
                        <p className="text-slate-dim text-xs leading-relaxed">{p.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-x-2 gap-y-1 mt-4 pt-3 border-t border-white/5">
                        {p.tech.map(t => (
                          <span key={t} className="font-mono text-[10px] text-slate-dim/50">{t}</span>
                        ))}
                      </div>
                    </motion.div>
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
