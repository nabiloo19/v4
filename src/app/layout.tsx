import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'
import ServiceWorker from '@/components/ServiceWorker'

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
  title: 'Nabil Mohammed | Lead Technical Writer',
  description:
    'Nabil Mohammed — Lead Technical Writer at Salla. 7+ years writing API docs, OpenAPI specs, and SDK guides for 10,000+ developers. Built for humans, ready for agents.',
  authors: [{ name: 'Nabil Mohammed', url: 'https://nabiloo.tech' }],
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
    title: 'Nabil Mohammed | Lead Technical Writer',
    description:
      'API docs, OpenAPI specs, and SDK guides built for humans and ready for agents. 7+ years, 300+ docs, 10,000+ developers served.',
    url: 'https://nabiloo.tech',
    siteName: 'Nabil Mohammed',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Nabil Mohammed — Lead Technical Writer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nabil Mohammed | Lead Technical Writer',
    description:
      'API docs, OpenAPI specs, and SDK guides built for humans and ready for agents.',
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
      name: 'Nabil Mohammed',
      url: 'https://nabiloo.tech',
      image: 'https://nabiloo.tech/me.jpeg',
      jobTitle: 'Lead Technical Writer',
      description:
        'Lead Technical Writer specialising in API documentation, OpenAPI specs, SDK guides, and developer content built for humans and AI agents.',
      email: 'nabil.alanssi19@gmail.com',
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
      sameAs: [
        'https://github.com/nabiloo19',
        'https://www.linkedin.com/in/nabiloo19',
        'https://x.com/nabiloo_19',
        'https://nabil-alanssi19.medium.com/',
        'https://linktr.ee/nabiloo',
      ],
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
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${firaCode.variable} font-sans antialiased`}>
        <ServiceWorker />
        {children}
      </body>
    </html>
  )
}
