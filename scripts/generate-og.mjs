import { Resvg } from '@resvg/resvg-js'
import { writeFileSync } from 'fs'

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0,255,209,0.04)" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow1" cx="0%" cy="0%" r="70%">
      <stop offset="0%" stop-color="rgba(0,255,209,0.14)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <radialGradient id="glow2" cx="100%" cy="0%" r="60%">
      <stop offset="0%" stop-color="rgba(99,102,241,0.12)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#0b1120"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="840" height="441" fill="url(#glow1)"/>
  <rect x="600" width="600" height="378" fill="url(#glow2)"/>

  <!-- Navbar -->
  <text x="64" y="52" font-family="monospace" font-size="20" font-weight="700" letter-spacing="2" fill="#00FFD1">NM.</text>
  <text x="500" y="52" font-family="monospace" font-size="11" letter-spacing="3" fill="#64748b" text-anchor="middle">ABOUT</text>
  <text x="620" y="52" font-family="monospace" font-size="11" letter-spacing="3" fill="#64748b" text-anchor="middle">WORK</text>
  <text x="770" y="52" font-family="monospace" font-size="11" letter-spacing="3" fill="#64748b" text-anchor="middle">EXPERIENCE</text>
  <text x="920" y="52" font-family="monospace" font-size="11" letter-spacing="3" fill="#64748b" text-anchor="middle">CONTACT</text>
  <rect x="1076" y="32" width="100" height="28" rx="14" fill="none" stroke="rgba(0,255,209,0.3)" stroke-width="1"/>
  <text x="1126" y="50" font-family="monospace" font-size="11" letter-spacing="2" fill="#00FFD1" text-anchor="middle">RESUME</text>

  <!-- Eyebrow -->
  <line x1="64" y1="115" x2="88" y2="115" stroke="rgba(0,255,209,0.6)" stroke-width="1"/>
  <text x="98" y="120" font-family="monospace" font-size="12" letter-spacing="4" fill="rgba(0,255,209,0.7)">LEAD TECHNICAL WRITER · SALLA</text>

  <!-- Headline -->
  <text x="64" y="210" font-family="sans-serif" font-size="80" font-weight="700" fill="#e2e8f0">I write</text>
  <text x="64" y="295" font-family="sans-serif" font-size="80" font-weight="700" fill="#00FFD1">API docs</text>
  <text x="64" y="380" font-family="sans-serif" font-size="80" font-weight="700" fill="#e2e8f0">built for humans,</text>
  <text x="64" y="460" font-family="sans-serif" font-size="68" font-weight="700" fill="#475569">ready for agents.</text>

  <!-- Stats divider -->
  <line x1="64" y1="492" x2="1136" y2="492" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>

  <!-- Stats -->
  <text x="118" y="524" font-family="monospace" font-size="32" font-weight="700" fill="#00FFD1" text-anchor="middle">7+</text>
  <text x="118" y="545" font-family="monospace" font-size="11" letter-spacing="2" fill="#475569" text-anchor="middle">YEARS EXP</text>
  <line x1="270" y1="492" x2="270" y2="570" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>

  <text x="420" y="524" font-family="monospace" font-size="32" font-weight="700" fill="#00FFD1" text-anchor="middle">300+</text>
  <text x="420" y="545" font-family="monospace" font-size="11" letter-spacing="2" fill="#475569" text-anchor="middle">API DOCS</text>
  <line x1="570" y1="492" x2="570" y2="570" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>

  <text x="720" y="524" font-family="monospace" font-size="32" font-weight="700" fill="#00FFD1" text-anchor="middle">10k+</text>
  <text x="720" y="545" font-family="monospace" font-size="11" letter-spacing="2" fill="#475569" text-anchor="middle">DEVELOPERS</text>
  <line x1="870" y1="492" x2="870" y2="570" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>

  <text x="1020" y="524" font-family="monospace" font-size="32" font-weight="700" fill="#00FFD1" text-anchor="middle">100%</text>
  <text x="1020" y="545" font-family="monospace" font-size="11" letter-spacing="2" fill="#475569" text-anchor="middle">OPENAPI</text>
</svg>`

const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
const png = resvg.render().asPng()
writeFileSync('public/og.png', png)
console.log('✓ public/og.png generated —', png.length, 'bytes')
