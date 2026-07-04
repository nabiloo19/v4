import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nabil Mohammed | Lead Technical Writer',
    short_name: 'Nabil Mohammed',
    description: 'Lead Technical Writer specializing in API docs, SDK guides, and developer content.',
    start_url: '/',
    display: 'standalone',
    background_color: '#080b14',
    theme_color: '#00ffd1',
    orientation: 'portrait',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any maskable',
      },
    ],
  }
}
