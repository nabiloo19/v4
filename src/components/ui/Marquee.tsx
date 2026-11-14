'use client'

import { clsx as cn } from 'clsx'

interface Props {
  items: string[]
  speed?: number
  reverse?: boolean
}

// Scrolling row of items. With reduced motion it stops and wraps instead,
// and the duplicate copy (only there to loop seamlessly) is hidden.
export default function Marquee({ items, speed = 30, reverse = false }: Props) {
  const item = (text: string, i: number, copy: boolean) => (
    <span
      key={`${copy ? 'b' : 'a'}${i}`}
      aria-hidden={copy || undefined}
      className={cn('inline-flex items-center gap-3 font-mono text-[13px] text-text-muted', copy && 'motion-reduce:hidden')}
    >
      <span className="w-1 h-1 rounded-full bg-teal/60" />
      {text}
    </span>
  )

  return (
    <div className="overflow-hidden whitespace-nowrap motion-reduce:whitespace-normal">
      <div
        className={cn(
          'inline-flex gap-10',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
          'motion-reduce:animate-none motion-reduce:flex motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-8 motion-reduce:gap-y-2 motion-reduce:px-6',
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((t, i) => item(t, i, false))}
        {items.map((t, i) => item(t, i, true))}
      </div>
    </div>
  )
}
