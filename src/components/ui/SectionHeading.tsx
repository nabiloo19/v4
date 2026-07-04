interface SectionHeadingProps {
  number: string
  title: string
}

const labels: Record<string, string> = {
  '01': 'Background',
  '02': 'Process',
  '03': 'AI-first',
  '04': 'Skills',
  '05': 'Work',
  '06': 'Career',
}

export default function SectionHeading({ number, title }: SectionHeadingProps) {
  const label = labels[number] ?? number

  return (
    <div className="mb-14">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="w-5 h-px bg-teal/50" />
        <span className="font-mono text-[10px] text-teal/60 tracking-[0.28em] uppercase">{label}</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-lightest leading-tight">{title}</h2>
    </div>
  )
}
