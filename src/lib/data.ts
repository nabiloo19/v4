import { content } from '@/lib/content'

// Structural navigation stays in code. Everything else comes from
// src/content/site.json, which the content API can edit.
export const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Work', href: '#work' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

export const socialLinks = content.socialLinks
export const jobs = content.jobs
export const otherProjects = content.otherProjects
export const featuredProjects = content.featuredProjects.map((p, i) => ({
  ...p,
  number: String(i + 1).padStart(2, '0'),
}))
