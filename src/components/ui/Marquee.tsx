'use client'

interface Props {
  items: string[]
  speed?: number
  reverse?: boolean
}

export default function Marquee({ items, speed = 30, reverse = false }: Props) {
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className={`inline-flex gap-10 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 font-mono text-sm text-text-muted">
            <span className="w-1 h-1 rounded-full bg-teal/60" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
