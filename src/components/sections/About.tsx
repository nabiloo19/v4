'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import RichText from '@/components/ui/RichText'
import { content } from '@/lib/content'

const { quote, paragraphs } = content.about
const { categories } = content.skills

export default function About() {
  return (
    <section id="about" className="py-14 md:py-16 bg-[#fafaf9]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading number="01" title="About Me" />

        <div className="grid md:grid-cols-12 gap-10 md:gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7"
          >
            {/* Pull quote */}
            <blockquote className="border-l-2 border-teal pl-5 md:pl-6 mb-6">
              <p className="text-xl md:text-2xl font-bold text-[#0a0a10] leading-[1.3] tracking-tight">
                &ldquo;{quote}&rdquo;
              </p>
            </blockquote>

            <div className="space-y-4 text-text-body leading-relaxed text-[15px] md:text-base">
              {paragraphs.map((text, i) => (
                <p key={i}><RichText text={text} /></p>
              ))}
            </div>
          </motion.div>

          {/* What I Bring: grouped skills */}
          <motion.div
            id="skills"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5"
          >
            <h3 className="text-lg font-bold text-[#0a0a10] mb-5">What I Bring</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-6">
              {categories.map(cat => (
                <div key={cat.label}>
                  <p className="font-mono text-[10px] text-teal-dark tracking-[0.28em] uppercase mb-2.5">{cat.label}</p>
                  <ul className="space-y-1">
                    {cat.items.map(item => (
                      <li key={item} className="text-sm text-text-body leading-snug">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
