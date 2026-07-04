'use client'

import { motion } from 'framer-motion'
import Marquee from '@/components/ui/Marquee'
import SectionHeading from '@/components/ui/SectionHeading'

const row1 = ['API Documentation', 'OpenAPI / Swagger', 'Stoplight', 'APIDog', 'GitBook', 'Postman', 'Hoppscotch', 'Markdown / MDX', 'SDK Guides', 'Developer Portals']
const row2 = ['Information Architecture', 'Developer Relations', 'UX Writing', 'Content Strategy', 'VueJS', 'Twig', 'JSON', 'Git & GitHub', 'Release Notes', 'Integration Tutorials']

const categories = [
  {
    label: 'Writing',
    items: ['API Documentation', 'SDK Guides', 'OpenAPI Specs', 'Release Notes', 'Integration Tutorials', 'UX Writing'],
  },
  {
    label: 'Tools',
    items: ['Stoplight', 'APIDog', 'GitBook', 'Postman', 'Swagger', 'Hoppscotch'],
  },
  {
    label: 'Tech',
    items: ['Markdown / MDX', 'JSON', 'HTML / CSS', 'Git & GitHub', 'VueJS', 'Twig'],
  },
  {
    label: 'Strategy',
    items: ['Information Architecture', 'Developer Relations', 'Content Strategy', 'Developer Portals', 'Style Guides'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-32 bg-navy-light/25 border-y border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-6 mb-14">
        <SectionHeading number="04" title="What I Bring" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <p className="font-mono text-[10px] text-teal/60 tracking-[0.22em] uppercase mb-4">{cat.label}</p>
              <ul className="space-y-2.5">
                {cat.items.map(item => (
                  <li key={item} className="text-sm text-slate-dim leading-snug">{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-14 border-t border-white/5">
        <Marquee items={row1} speed={35} />
        <Marquee items={row2} speed={28} reverse />
      </div>
    </section>
  )
}
