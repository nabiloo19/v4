import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Nabil Mohammed — Lead Technical Writer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0b1120',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'monospace',
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(0,255,209,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,209,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Teal radial glow top */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '70%',
            height: '70%',
            background: 'radial-gradient(circle, rgba(0,255,209,0.14) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Indigo glow top-right */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-10%',
            width: '50%',
            height: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)',
            filter: 'blur(70px)',
          }}
        />

        {/* Navbar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '28px 64px',
            position: 'relative',
          }}
        >
          <span style={{ color: '#00FFD1', fontSize: 20, fontWeight: 700, letterSpacing: '0.1em' }}>
            NM<span style={{ opacity: 0.4 }}>.</span>
          </span>
          <div style={{ display: 'flex', gap: 32 }}>
            {['About', 'Work', 'Experience', 'Contact'].map(l => (
              <span key={l} style={{ color: '#64748b', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                {l}
              </span>
            ))}
          </div>
          <span style={{ color: '#00FFD1', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', border: '1px solid rgba(0,255,209,0.3)', padding: '8px 20px', borderRadius: 999 }}>
            Resume
          </span>
        </div>

        {/* Hero content */}
        <div style={{ display: 'flex', flexDirection: 'column', padding: '24px 64px 0', position: 'relative', flex: 1 }}>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <div style={{ width: 24, height: 1, background: 'rgba(0,255,209,0.6)' }} />
            <span style={{ color: 'rgba(0,255,209,0.7)', fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
              Lead Technical Writer · Salla
            </span>
          </div>

          {/* Headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 32 }}>
            <span style={{ color: '#e2e8f0', fontSize: 80, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              I write
            </span>
            <span style={{
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #00FFD1 0%, #00b8d4 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}>
              API docs
            </span>
            <span style={{ color: '#e2e8f0', fontSize: 80, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              built for humans,
            </span>
            <span style={{ color: '#475569', fontSize: 80, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              ready for agents.
            </span>
          </div>
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: 'flex',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            margin: '0 64px 40px',
            position: 'relative',
          }}
        >
          {[
            { value: '7+', label: 'Years experience' },
            { value: '300+', label: 'API docs shipped' },
            { value: '10k+', label: 'Developers served' },
            { value: '100%', label: 'OpenAPI compliant' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '20px 24px',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              <span style={{ color: '#00FFD1', fontSize: 32, fontWeight: 700, marginBottom: 4 }}>
                {stat.value}
              </span>
              <span style={{ color: '#475569', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
