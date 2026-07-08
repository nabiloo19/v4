'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

const highlights = [
  { label: 'Based in', value: 'Addis Ababa' },
  { label: 'Currently at', value: 'Salla' },
  { label: 'Specialising in', value: 'API Documentation' },
  { label: 'Open to', value: 'Freelance & Full-time' },
]

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
            &ldquo;The gap between a good product and a successful product is often just documentation.&rdquo;
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
            <p>
              I&apos;m Nabil Mohammed, Lead Technical Writer and the person developers thank when the
              docs actually made sense. I go by{' '}
              <span className="text-teal-dark font-medium">&ldquo;Dev Docs Wizard&rdquo;</span> because I
              believe that writing clear documentation is less about English and more about empathy for the developer experience.
            </p>
            <p>
              Over 7+ years I&apos;ve worked across Google Developer Groups, governmental research
              bodies, fintech startups, and one of the Middle East&apos;s largest e-commerce platforms.
              At Salla I manage documentation for 7+ products, 300+ fully OpenAPI-compliant API
              endpoints, and a developer community of 10,000+ builders. My docs have driven a{' '}
              <span className="text-[#0a0a10] font-medium">75% improvement</span> in developer integrations.
            </p>
            <p>
              When I&apos;m not in the docs, I&apos;m probably playing video games, rewatching Friends for
              the 12th time, or finding more elegant ways to explain complex things.
            </p>
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
