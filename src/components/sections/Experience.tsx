'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import { jobs } from '@/lib/data'

export default function Experience() {
  return (
    <section id="experience" className="py-36 bg-[#f2f1ee]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading number="06" title="Experience" />

        <div className="space-y-0">
          {jobs.map((job, i) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`group flex flex-col md:flex-row gap-4 md:gap-12 py-8 ${i < jobs.length - 1 ? 'border-b border-black/[0.07]' : ''} hover:bg-white/50 -mx-6 px-6 transition-colors duration-200`}
            >
              {/* Left col */}
              <div className="md:w-52 shrink-0">
                <p className="font-mono text-[10px] text-teal-dark tracking-widest mb-1">{job.range}</p>
                <p className="font-bold text-[#0a0a10] text-sm">{job.company}</p>
              </div>

              {/* Right col */}
              <div className="flex-1">
                <p className="text-sm font-medium text-text-body mb-3">{job.title}</p>
                <ul className="space-y-1.5">
                  {job.bullets.slice(0, 2).map((bullet, j) => (
                    <li key={j} className="flex gap-2 text-xs text-text-body leading-relaxed">
                      <span className="text-teal-dark shrink-0 mt-[3px]">▹</span>
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
