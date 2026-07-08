'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, socialLinks } from '@/lib/data'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-[#fafaf9]/95 backdrop-blur-sm transition-all duration-300 ${scrolled ? 'border-b border-black/[0.07]' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          <a href="/" className="font-mono text-sm font-bold tracking-widest text-[#0a0a10] hover:text-teal-dark transition-colors">
            NM<span className="text-teal">.</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-[11px] tracking-[0.14em] uppercase text-text-muted hover:text-[#0a0a10] px-3.5 py-2 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://drive.google.com/file/d/1iqtQtiA9DqG-uofqNPMekf8qzdcn1LfC/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-[0.14em] uppercase text-teal-dark border border-teal/40 px-5 py-2 rounded-full hover:bg-teal/10 transition-all"
            >
              Resume
            </a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex flex-col gap-[5px] p-2"
            aria-label="Open menu"
          >
            <span className="w-5 h-px bg-[#0a0a10] block" />
            <span className="w-5 h-px bg-[#0a0a10] block" />
            <span className="w-3 h-px bg-teal-dark block" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-[#fafaf9] border-l border-black/[0.07] z-50 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-black/[0.06]">
                <span className="font-mono text-sm font-bold tracking-widest text-[#0a0a10]">
                  NM<span className="text-teal">.</span>
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-8 h-8 flex items-center justify-center"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#0a0a10]">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col px-4 py-8 gap-1 flex-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.2 }}
                    className="font-mono text-xs tracking-widest uppercase text-text-muted hover:text-[#0a0a10] hover:bg-black/[0.03] px-4 py-3.5 rounded-lg transition-all"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              <div className="px-6 pb-8 border-t border-black/[0.06] pt-6 space-y-4">
                <a
                  href="https://drive.google.com/file/d/1iqtQtiA9DqG-uofqNPMekf8qzdcn1LfC/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full font-mono text-xs tracking-widest uppercase text-teal-dark border border-teal/40 py-3 rounded-full hover:bg-teal/10 transition-all"
                >
                  View Resume
                </a>
                <div className="flex items-center justify-center gap-5 pt-1">
                  {socialLinks.slice(0, 4).map(link => (
                    <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name} className="text-text-muted hover:text-teal-dark transition-colors text-xs font-mono">
                      {link.name.slice(0, 2)}
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
