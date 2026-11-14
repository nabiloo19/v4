'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import Process from '@/components/sections/Process'
import { content } from '@/lib/content'

const services = content.services.items

// Services and "How I Work" share one dark section.
export default function Services() {
  return (
    <section id="services" className="py-14 md:py-16 bg-[#0a0a10]">
      <div className="max-w-6xl mx-auto px-6">

        <SectionHeading number="What I do" title="Services" dark>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 md:justify-end">
            <p className="text-white/60 text-sm leading-relaxed max-w-md md:text-right">
              {content.services.availability}
            </p>
            <a
              href={`mailto:${content.profile.email}`}
              className="self-start sm:self-auto font-mono text-sm text-teal border border-teal/30 px-6 py-3 rounded-full hover:bg-teal/10 transition-colors shrink-0"
            >
              Let&apos;s talk →
            </a>
          </div>
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border-y border-white/[0.06]">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bg-[#0a0a10] py-5 md:p-6 hover:bg-white/[0.03] transition-colors duration-200 group"
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-[10px] text-teal tracking-[0.2em]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-base font-bold text-white group-hover:text-teal transition-colors">{s.title}</h3>
              </div>
              <p className="text-white/55 text-sm leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>

        <Process />
      </div>
    </section>
  )
}
