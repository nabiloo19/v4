'use client'

import { useState, useEffect } from 'react'
import { navLinks, socialLinks } from '@/lib/data'

const iconMap: Record<string, React.ReactNode> = {
  GitHub: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Twitter: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Medium: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  ),
  Linktree: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M7.953 15.066c-.08.163-.08.324-.08.486.08.517.528.897 1.052.897h.244l4.604-4.604v6.154c0 .6.486 1.085 1.085 1.085.6 0 1.085-.485 1.085-1.085V11.84l4.604 4.604h.244c.526 0 .973-.38 1.052-.897.08-.57-.323-1.085-.893-1.085l-3.955-3.955 3.955-3.955c.57-.08.973-.596.893-1.166-.08-.517-.527-.897-1.052-.897h-.244l-4.604 4.604V2.924c0-.6-.485-1.085-1.085-1.085-.6 0-1.085.485-1.085 1.085v6.154L9.169 4.474h-.244c-.526 0-.973.38-1.052.897-.08.57.323 1.085.893 1.166l3.955 3.955-3.955 3.955c-.324.08-.57.324-.813.62z" />
    </svg>
  ),
}

export default function Footer() {
  const [year, setYear] = useState(2026)
  useEffect(() => setYear(new Date().getFullYear()), [])

  return (
    <footer className="border-t border-white/5 bg-navy/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-16">

          {/* Brand */}
          <div className="max-w-xs">
            <a href="/" className="font-mono text-teal text-2xl font-bold tracking-wider hover:opacity-70 transition-opacity inline-block mb-4">
              NM<span className="opacity-40">.</span>
            </a>
            <p className="text-slate-dim text-sm leading-relaxed">
              Lead Technical Writer specialising in API documentation, OpenAPI specs, and developer content that works for humans and machines.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="font-mono text-[10px] text-slate-dim/50 tracking-[0.2em] uppercase mb-4">Navigation</p>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-mono text-xs text-slate-dim hover:text-teal transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-[10px] text-slate-dim/50 tracking-[0.2em] uppercase mb-4">Get in touch</p>
            <a
              href="mailto:nabil.alanssi19@gmail.com"
              className="font-mono text-xs text-teal hover:underline underline-offset-4 decoration-teal/40 block mb-4"
            >
              nabil.alanssi19@gmail.com
            </a>
            <a
              href="https://drive.google.com/file/d/1iqtQtiA9DqG-uofqNPMekf8qzdcn1LfC/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs text-slate-dim hover:text-teal border border-white/10 hover:border-teal/30 px-4 py-2 rounded-full transition-all duration-200"
            >
              View Resume
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="font-mono text-xs text-slate-dim/40">
            &copy; {year} Nabil Mohammed. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="text-slate-dim/30 hover:text-teal transition-colors duration-200"
              >
                {iconMap[link.name]}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
