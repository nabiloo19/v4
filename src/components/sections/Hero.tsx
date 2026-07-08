'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-[#fafaf9] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full pt-16">

        <div className="grid md:grid-cols-[1fr_320px] gap-12 lg:gap-20 items-center">

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-teal-dark mb-8">
              Lead Technical Writer · Salla
            </p>

            <h1 className="text-[clamp(2.6rem,6.5vw,6.5rem)] font-bold text-[#0a0a10] leading-[1.04] tracking-tight mb-8">
              The writer<br />
              developers<br />
              <span className="text-gradient">actually thank.</span>
            </h1>

            <p className="max-w-sm text-text-body text-lg leading-relaxed mb-10">
              Seven years turning APIs, SDKs, and developer platforms into documentation
              that ships adoption — and that AI agents now read to build on top.
            </p>

            <div className="flex flex-wrap gap-3 mb-14">
              <a
                href="#work"
                className="inline-flex items-center gap-2 bg-[#0a0a10] text-[#fafaf9] font-mono text-sm px-7 py-3.5 rounded-full hover:bg-[#1a1a24] transition-colors"
              >
                See my work →
              </a>
              <a
                href="mailto:nabil.alanssi19@gmail.com"
                className="inline-flex items-center gap-2 text-[#0a0a10] font-mono text-sm px-7 py-3.5 rounded-full border border-black/[0.12] hover:border-black/25 transition-colors"
              >
                Get in touch
              </a>
            </div>

            <hr className="rule mb-8" />
            <div className="grid grid-cols-4 gap-4">
              {[
                { value: '7+', label: 'Years' },
                { value: '300+', label: 'API docs' },
                { value: '10k+', label: 'Developers' },
                { value: '100%', label: 'OpenAPI' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-[#0a0a10]">{stat.value}</p>
                  <p className="font-mono text-[10px] text-text-muted tracking-wide mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block"
          >
            <div className="relative">
              <img
                src="/me.jpeg"
                alt="Nabil Mohammed"
                className="w-full aspect-[3/4] object-cover object-top rounded-2xl"
              />
              {/* Teal accent strip */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-teal/20 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-teal/30 rounded-xl -z-10" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
