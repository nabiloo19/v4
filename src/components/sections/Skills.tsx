'use client'

import { motion } from 'framer-motion'
import Marquee from '@/components/ui/Marquee'
import SectionHeading from '@/components/ui/SectionHeading'

const row1 = ['API Documentation', 'OpenAPI / Swagger', 'Stoplight', 'APIDog', 'GitBook', 'Postman', 'Hoppscotch', 'Markdown / MDX', 'SDK Guides', 'Developer Portals']
const row2 = ['Information Architecture', 'Developer Relations', 'UX Writing', 'Content Strategy', 'VueJS', 'Twig', 'JSON', 'Git & GitHub', 'Release Notes', 'Integration Tutorials']

const categories = [
  { label: 'Writing', items: ['API Documentation', 'SDK Guides', 'OpenAPI Specs', 'Release Notes', 'Integration Tutorials', 'UX Writing'] },
  { label: 'Tools', items: ['Stoplight', 'APIDog', 'GitBook', 'Postman', 'Swagger', 'Hoppscotch'] },
  { label: 'Tech', items: ['Markdown / MDX', 'JSON', 'HTML / CSS', 'Git & GitHub', 'VueJS', 'Twig'] },
  { label: 'Strategy', items: ['Information Architecture', 'Developer Relations', 'Content Strategy', 'Developer Portals', 'Style Guides'] },
]

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
        <Marquee items={row1} speed={35} />
        <Marquee items={row2} speed={28} reverse />
      </div>
    </section>
  )
}
