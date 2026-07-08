import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#00ffd1',
          dark: '#007a65',
          dim: 'rgba(0,255,209,0.1)',
          glow: 'rgba(0,255,209,0.25)',
        },
        'text-heading': '#0a0a10',
        'text-body': '#52525f',
        'text-muted': '#96969f',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        marquee: 'marquee linear infinite',
        'marquee-reverse': 'marqueeReverse linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
