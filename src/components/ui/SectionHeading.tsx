import { clsx as cn } from 'clsx'

interface SectionHeadingProps {
  number: string
  title: string
  /** Optional text or actions shown to the right of the title on wide screens. */
  children?: React.ReactNode
  dark?: boolean
  className?: string
}

export default function SectionHeading({ number, title, children, dark = false, className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-8 md:mb-10', className)}>
      <div className="flex items-center gap-4 mb-3">
        <span className={cn('font-mono text-[10px] tracking-[0.32em] uppercase', dark ? 'text-teal' : 'text-teal-dark')}>{number}</span>
        <span className={cn('flex-1 h-px', dark ? 'bg-white/[0.08]' : 'bg-black/[0.07]')} />
      </div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-10">
        <h2 className={cn('text-3xl md:text-4xl font-bold leading-[1.08] tracking-tight', dark ? 'text-white' : 'text-[#0a0a10]')}>
          {title}
        </h2>
        {children}
      </div>
    </div>
  )
}
