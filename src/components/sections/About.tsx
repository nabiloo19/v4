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
    <section id="about" className="py-32 max-w-6xl mx-auto px-6 relative">
      <SectionHeading number="01" title="About Me" />

      <div className="grid md:grid-cols-12 gap-16">
        {/* Main text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:col-span-7 space-y-6 text-slate-dim leading-relaxed text-[1.05rem]"
        >
          <p>
            I&apos;m Nabil Mohammed, Lead Technical Writer and the person developers thank when the
            docs actually made sense. I go by{' '}
            <span className="text-teal font-medium">&ldquo;Dev Docs Wizard&rdquo;</span> because I
            believe that writing clear documentation is less about English and more about{' '}
            <span className="text-slate-lightest">empathy for the developer experience</span>.
          </p>
          <p>
            Over 7+ years I&apos;ve worked across Google Developer Groups, governmental research
            bodies, fintech startups, and one of the Middle East&apos;s largest e-commerce platforms.
            Every role taught me the same thing: the gap between a good product and a successful
            product is often just documentation.
          </p>
          <p>
            At Salla I manage documentation for 7+ products, 300+ fully OpenAPI-compliant API
            endpoints, and a developer community of 10,000+ builders. My docs have driven a{' '}
            <span className="text-slate-lightest font-medium">75% improvement</span> in developer
            integrations. Every endpoint is fully OpenAPI-compliant and readable by both the developers building on Salla and the AI agents doing the same.
          </p>
          <p>
            When I&apos;m not in the docs, I&apos;m probably playing video games, rewatching Friends for
            the 12th time, or finding more elegant ways to explain complex things.
          </p>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="md:col-span-5 space-y-6"
        >
          {/* Quick facts — above photo */}
          <div className="border border-white/5 rounded-2xl p-6 bg-navy-light/40 space-y-4">
            {highlights.map(h => (
              <div key={h.label} className="flex justify-between items-center text-sm">
                <span className="font-mono text-slate-dim text-xs">{h.label}</span>
                <span className="text-slate-lightest font-medium">{h.value}</span>
              </div>
            ))}
          </div>

          {/* Photo */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
            <img
              src="/me.jpeg"
              alt="Nabil Mohammed"
              className="w-full aspect-square object-cover object-top transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
