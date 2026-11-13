'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import RichText from '@/components/ui/RichText'
import { content } from '@/lib/content'

const { quote, paragraphs, highlights } = content.about

export default function About() {
  return (
    <section id="about" className="py-36 bg-[#fafaf9]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading number="01" title="About Me" />

        {/* Pull quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-l-2 border-teal pl-8 mb-16"
        >
          <p className="text-2xl md:text-3xl font-bold text-[#0a0a10] leading-[1.3] tracking-tight">
            &ldquo;{quote}&rdquo;
          </p>
        </motion.blockquote>

        <div className="grid md:grid-cols-12 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 space-y-6 text-text-body leading-relaxed text-[1.05rem]"
          >
            {paragraphs.map((text, i) => (
              <p key={i}><RichText text={text} /></p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-5"
          >
            <div className="space-y-0">
              {highlights.map((h, i) => (
                <div key={h.label} className={`flex justify-between items-center py-4 ${i < highlights.length - 1 ? 'border-b border-black/[0.07]' : ''}`}>
                  <span className="font-mono text-xs text-text-muted">{h.label}</span>
                  <span className="text-[#0a0a10] text-sm font-medium">{h.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
