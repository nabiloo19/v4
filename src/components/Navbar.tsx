'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, socialLinks } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    setMounted(true)
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* lock body scroll when sidebar open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* ── Desktop / iPad — floating pill ── */}
      <header className="fixed top-5 left-0 right-0 z-50 hidden md:flex justify-center px-6 pointer-events-none">
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-full border transition-all duration-500',
            scrolled
              ? 'bg-[#0b1120]/85 backdrop-blur-2xl border-white/[0.09] shadow-xl shadow-black/30'
              : 'bg-[#0b1120]/50 backdrop-blur-xl border-white/[0.06]',
          )}
        >
          {/* Logo */}
          <a href="/" className="font-mono text-teal font-bold tracking-wider text-sm hover:opacity-70 transition-opacity pr-2">
            NM<span className="opacity-40">.</span>
          </a>

          <div className="w-px h-4 bg-white/10 shrink-0" />

          {/* Links */}
          <nav className="flex items-center">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '')
              const isActive = mounted && activeSection === id
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'relative font-mono text-[11px] tracking-[0.12em] uppercase px-3.5 py-1.5 rounded-full transition-all duration-200',
                    isActive ? 'text-teal' : 'text-slate-dim hover:text-slate-lightest',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-teal/[0.08] border border-teal/25"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                    />
                  )}
                  <span className="relative">{link.name}</span>
                </a>
              )
            })}
          </nav>

          <div className="w-px h-4 bg-white/10 shrink-0" />

          {/* Resume */}
          <a
            href="https://drive.google.com/file/d/1iqtQtiA9DqG-uofqNPMekf8qzdcn1LfC/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-[0.12em] uppercase text-teal hover:text-navy hover:bg-teal px-4 py-1.5 rounded-full border border-teal/40 hover:border-teal transition-all duration-200"
          >
            Resume
          </a>
        </motion.div>
      </header>

      {/* ── Mobile header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden flex items-center justify-between px-6 py-5">
        <a href="/" className="font-mono text-teal font-bold tracking-wider text-base">
          NM<span className="opacity-40">.</span>
        </a>
        <button
          onClick={() => setMenuOpen(true)}
          className="flex flex-col gap-[5px] p-2"
          aria-label="Open menu"
        >
          <span className="w-5 h-px bg-slate-lightest block" />
          <span className="w-5 h-px bg-slate-lightest block" />
          <span className="w-3 h-px bg-teal block" />
        </button>
      </header>

      {/* ── Mobile sidebar ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-[#0d1221] border-l border-white/[0.07] z-50 flex flex-col md:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
                <span className="font-mono text-teal text-base font-bold tracking-wider">
                  NM<span className="text-slate-dim/60">.</span>
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 hover:border-white/20 transition-colors"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-dim">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col px-4 py-8 gap-1 flex-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.25 }}
                    className="font-mono text-xs tracking-widest uppercase text-slate-dim hover:text-teal hover:bg-teal/5 px-4 py-3.5 rounded-xl transition-all duration-200"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              {/* Drawer footer */}
              <div className="px-6 pb-8 space-y-4 border-t border-white/[0.06] pt-6">
                <a
                  href="https://drive.google.com/file/d/1iqtQtiA9DqG-uofqNPMekf8qzdcn1LfC/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full font-mono text-xs tracking-widest uppercase text-teal border border-teal/30 py-3 rounded-full hover:bg-teal/10 transition-all"
                >
                  View Resume
                </a>
                <div className="flex items-center justify-center gap-5 pt-2">
                  {socialLinks.slice(0, 4).map(link => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      className="text-slate-dim/40 hover:text-teal transition-colors"
                    >
                      <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
