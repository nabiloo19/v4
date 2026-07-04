interface LogoMarkProps {
  size?: number
  className?: string
  uid?: string
}

export function LogoMark({ size = 40, className, uid = 'a' }: LogoMarkProps) {
  const clipId = `nm-clip-${uid}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="100" height="100" rx="22" fill="#0B1120" />

      <defs>
        <clipPath id={clipId}>
          <circle cx="38" cy="50" r="26" />
        </clipPath>
      </defs>

      {/* Human circle — organic, white */}
      <circle cx="38" cy="50" r="26" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

      {/* Agent circle — geometric, teal */}
      <circle cx="62" cy="50" r="26" stroke="rgba(0,255,209,0.45)" strokeWidth="1.5" />

      {/* Intersection wash */}
      <circle cx="62" cy="50" r="26" fill="rgba(0,255,209,0.1)" clipPath={`url(#${clipId})`} />

      {/* Pen stroke — the writing bridge between both worlds */}
      <line x1="47" y1="66" x2="55" y2="34" stroke="#00FFD1" strokeWidth="3" strokeLinecap="round" />

      {/* Nib tines */}
      <line x1="47" y1="66" x2="41" y2="73" stroke="#00FFD1" strokeWidth="2" strokeLinecap="round" />
      <line x1="47" y1="66" x2="52" y2="73" stroke="#00FFD1" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function LogoFull({ height = 36 }: { height?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark size={height} uid="nav" />
      <span
        className="font-mono font-bold text-teal tracking-wider"
        style={{ fontSize: height * 0.38 }}
      >
        nabil<span className="text-slate-dim opacity-60">.</span>
      </span>
    </div>
  )
}
