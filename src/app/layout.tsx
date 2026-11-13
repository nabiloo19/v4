import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'
import ServiceWorker from '@/components/ServiceWorker'
import { content } from '@/lib/content'

const { profile, seo } = content

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  authors: [{ name: profile.name, url: 'https://nabiloo.tech' }],
  keywords: [
    'Technical Writer', 'API Documentation', 'OpenAPI', 'SDK Guides',
    'Developer Documentation', 'Developer Experience', 'Salla', 'DX Writing',
    'Information Architecture', 'Developer Portal', 'MCP', 'AI Documentation',
  ],
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/favicon.svg',
  },
  metadataBase: new URL('https://nabiloo.tech'),
  openGraph: {
    title: seo.title,
    description: seo.ogDescription,
    url: 'https://nabiloo.tech',
    siteName: profile.name,
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Nabil Mohammed — Lead Technical Writer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.twitterDescription,
    creator: '@nabiloo_19',
    images: ['/og.png'],
  },
  alternates: {
    canonical: 'https://nabiloo.tech',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://nabiloo.tech/#person',
      name: profile.name,
      url: 'https://nabiloo.tech',
      image: 'https://nabiloo.tech/me.jpeg',
      jobTitle: profile.jobTitle,
      description: seo.personDescription,
      email: profile.email,
      knowsAbout: [
        'API Documentation', 'OpenAPI Specification', 'SDK Documentation',
        'Developer Experience', 'Information Architecture', 'Technical Writing',
        'Developer Relations', 'MCP Servers', 'AI-readable Documentation',
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Salla',
        url: 'https://salla.com',
      },
      address: { '@type': 'PostalAddress', addressLocality: 'Addis Ababa', addressCountry: 'ET' },
      sameAs: content.socialLinks.map(l => l.href),
    },
    {
      '@type': 'WebSite',
      '@id': 'https://nabiloo.tech/#website',
      url: 'https://nabiloo.tech',
      name: 'Nabil Mohammed — Lead Technical Writer',
      description:
        'Portfolio of Nabil Mohammed, Lead Technical Writer at Salla. API docs, OpenAPI specs, and developer content built for humans and ready for agents.',
      author: { '@id': 'https://nabiloo.tech/#person' },
      inLanguage: 'en-US',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // Escape "<" so edited text can never close this script tag early.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body className={`${inter.variable} ${firaCode.variable} font-sans antialiased`}>
        <ServiceWorker />
        {children}
      </body>
    </html>
  )
}
