import type { Metadata } from 'next'
import CvViewer from '@/components/CvViewer'
import { content } from '@/lib/content'

const { profile, seo } = content

export const metadata: Metadata = {
  title: `CV | ${profile.name}, ${profile.jobTitle}`,
  description: seo.description,
  alternates: { canonical: 'https://nabiloo.tech/cv' },
  openGraph: {
    title: `${profile.name} CV`,
    description: seo.ogDescription,
    url: 'https://nabiloo.tech/cv',
    type: 'profile',
    images: ['/og.png'],
  },
}

export default function CvPage() {
  return (
    <CvViewer
      src="/cv/nabil-mohammed-cv.html"
      pdf="/Nabil-Mohammed-CV.pdf"
      name={profile.name}
      title={profile.jobTitle}
    />
  )
}
