'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import { jobs } from '@/lib/data'

export default function Experience() {
  return (
    <section id="experience" className="py-32 max-w-6xl mx-auto px-6">
      <SectionHeading number="06" title="Experience" />

      <div className="relative">
        <div className="absolute left-0 md:left-[10rem] top-0 bottom-0 w-px bg-gradient-to-b from-teal/40 via-white/5 to-transparent" />

        <div className="space-y-0">
          {jobs.map((job, i) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative flex flex-col md:flex-row gap-4 md:gap-10 pb-8 last:pb-0"
            >
              {/* Date + company left column */}
              <div className="md:w-40 shrink-0 md:text-right relative">
                <div className="absolute left-[-5px] md:left-auto md:right-[-15px] top-1 w-2.5 h-2.5 rounded-full border-2 border-teal/30 bg-navy group-hover:border-teal group-hover:bg-teal/20 transition-all duration-300 z-10" />
                <p className="font-mono text-[11px] text-teal/50 tracking-widest mb-0.5 pl-5 md:pl-0">
                  {job.range}
                </p>
                <p className="font-semibold text-slate-lightest text-sm pl-5 md:pl-0 leading-snug">
                  {job.company}
                </p>
              </div>

              {/* Content right column */}
              <div className="flex-1 pl-5 md:pl-0 group-hover:bg-teal/[0.025] rounded-xl px-5 py-4 -mx-5 transition-all duration-300">
                <p className="text-sm font-medium text-slate-light mb-3 mt-0.5">{job.title}</p>
                <ul className="space-y-1.5">
                  {job.bullets.slice(0, 2).map((bullet, j) => (
                    <li key={j} className="flex gap-2 text-xs text-slate-dim leading-relaxed">
                      <span className="text-teal mt-[3px] shrink-0 text-[10px]">▹</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
