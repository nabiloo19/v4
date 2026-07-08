interface SectionHeadingProps {
  number: string
  title: string
}

export default function SectionHeading({ number, title }: SectionHeadingProps) {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-4 mb-5">
        <span className="font-mono text-[10px] text-teal-dark tracking-[0.32em] uppercase">{number}</span>
        <span className="flex-1 h-px bg-black/[0.07]" />
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-[#0a0a10] leading-[1.08] tracking-tight">{title}</h2>
    </div>
  )
}
