'use client'

import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { content } from '@/lib/content'

const { hero, profile } = content
const { highlights } = content.about

export default function Hero() {
  return (
    <section className="bg-[#fafaf9] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full pt-[120px] pb-12 md:pt-28 md:pb-16">

        <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] lg:grid-cols-[1fr_300px] gap-10 lg:gap-20 items-center">

          {/* Left: who, what, proof */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-teal-dark mb-5 md:mb-6">
              {hero.eyebrow}
            </p>

            <h1 className="text-[clamp(2.5rem,5.4vw,4.75rem)] font-bold text-[#0a0a10] leading-[1.04] tracking-tight mb-5 md:mb-6">
              {hero.headline.map((line, i) => <Fragment key={i}>{line}<br /></Fragment>)}
              <span className="text-gradient">{hero.headlineAccent}</span>
            </h1>

            <p className="max-w-md text-text-body text-base md:text-lg leading-relaxed mb-7">
              {hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-3 mb-8 md:mb-10">
              <a
                href="#work"
                className="inline-flex items-center gap-2 bg-[#0a0a10] text-[#fafaf9] font-mono text-sm px-6 py-3 rounded-full hover:bg-[#1a1a24] transition-colors"
              >
                See my work →
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 text-[#0a0a10] font-mono text-sm px-6 py-3 rounded-full border border-black/[0.12] hover:border-black/25 transition-colors"
              >
                Get in touch
              </a>
            </div>

            <hr className="rule mb-5" />
            <dl className="grid grid-cols-4 gap-3 md:gap-4">
              {hero.stats.map(stat => (
                <div key={stat.label} className="flex flex-col-reverse justify-end">
                  <dt className="font-mono text-[10px] text-text-muted tracking-wide mt-0.5">{stat.label}</dt>
                  <dd className="text-xl md:text-2xl font-bold text-[#0a0a10]">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Right: photo + quick facts */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative hidden md:block mb-6">
              <img
                src="/me.jpeg"
                alt={profile.name}
                className="w-full aspect-[4/5] object-cover object-top rounded-2xl"
              />
              {/* Teal accent strip */}
              <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-teal/20 rounded-2xl -z-10" />
              <div className="absolute -top-3 -left-3 w-14 h-14 border-2 border-teal/30 rounded-xl -z-10" />
            </div>

            <dl className="grid grid-cols-2 md:grid-cols-1 gap-x-6 border-t border-black/[0.07] md:border-t-0">
              {highlights.map(h => (
                <div
                  key={h.label}
                  className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-0.5 md:gap-4 py-2.5 border-b border-black/[0.07]"
                >
                  <dt className="font-mono text-[10px] md:text-[11px] text-text-muted">{h.label}</dt>
                  <dd className="text-[#0a0a10] text-sm font-medium md:text-right">{h.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
