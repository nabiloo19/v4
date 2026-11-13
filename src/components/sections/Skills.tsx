'use client'

import { motion } from 'framer-motion'
import Marquee from '@/components/ui/Marquee'
import SectionHeading from '@/components/ui/SectionHeading'
import { content } from '@/lib/content'

const { categories, marquee } = content.skills

export default function Skills() {
  return (
    <section id="skills" className="py-36 bg-[#f2f1ee]">
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <SectionHeading number="04" title="What I Bring" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <p className="font-mono text-[10px] text-teal-dark tracking-[0.28em] uppercase mb-5">{cat.label}</p>
              <ul className="space-y-2.5">
                {cat.items.map(item => (
                  <li key={item} className="text-sm text-text-body">{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-16 border-t border-black/[0.07]">
        {marquee.map((row, i) => (
          <Marquee key={i} items={row} speed={i % 2 ? 28 : 35} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  )
}
