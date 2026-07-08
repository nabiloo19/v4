'use client'

import { motion } from 'framer-motion'
import { socialLinks } from '@/lib/data'

const iconMap: Record<string, React.ReactNode> = {
  GitHub: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Twitter: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Medium: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  ),
  Linktree: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M7.953 15.066c-.08.163-.08.324-.08.486.08.517.528.897 1.052.897h.244l4.604-4.604v6.154c0 .6.486 1.085 1.085 1.085.6 0 1.085-.485 1.085-1.085V11.84l4.604 4.604h.244c.526 0 .973-.38 1.052-.897.08-.57-.323-1.085-.893-1.085l-3.955-3.955 3.955-3.955c.57-.08.973-.596.893-1.166-.08-.517-.527-.897-1.052-.897h-.244l-4.604 4.604V2.924c0-.6-.485-1.085-1.085-1.085-.6 0-1.085.485-1.085 1.085v6.154L9.169 4.474h-.244c-.526 0-.973.38-1.052.897-.08.57.323 1.085.893 1.166l3.955 3.955-3.955 3.955c-.324.08-.57.324-.813.62z" />
    </svg>
  ),
}

export default function Contact() {
  return (
    <section id="contact" className="py-36 bg-[#fafaf9]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-teal-dark mb-8">Get in touch</p>

          <h2 className="text-4xl md:text-6xl font-bold text-[#0a0a10] mb-6 leading-[1.06] tracking-tight">
            Let&apos;s build something<br />
            <span className="text-gradient">worth documenting.</span>
          </h2>

          <p className="text-text-body text-lg leading-relaxed mb-12 max-w-md mx-auto">
            API docs, developer portals, AI-ready specs, or something that doesn&apos;t exist yet.
            If it involves making complex systems legible, I&apos;m interested.
          </p>

          <a
            href="mailto:nabil.alanssi19@gmail.com"
            className="group inline-flex items-center gap-3 bg-[#0a0a10] text-[#fafaf9] font-mono font-bold text-sm px-10 py-4 rounded-full hover:bg-[#1a1a24] transition-colors mb-14"
          >
            Say Hello
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </a>

          <div className="flex items-center justify-center gap-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="text-text-muted hover:text-teal-dark transition-colors"
              >
                {iconMap[link.name] ?? (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                )}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
