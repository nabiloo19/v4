import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: 'rgb(var(--color-bg) / <alpha-value>)',
          light: 'rgb(var(--color-bg-soft) / <alpha-value>)',
          card: 'rgb(var(--color-card) / <alpha-value>)',
        },
        teal: {
          DEFAULT: '#00ffd1',
          dim: 'rgba(0,255,209,0.08)',
          glow: 'rgba(0,255,209,0.2)',
        },
        slate: {
          dim: 'rgb(var(--color-text-dim) / <alpha-value>)',
          light: 'rgb(var(--color-text-light) / <alpha-value>)',
          lightest: 'rgb(var(--color-text-lightest) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
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
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        marquee: 'marquee linear infinite',
        'marquee-reverse': 'marqueeReverse linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
