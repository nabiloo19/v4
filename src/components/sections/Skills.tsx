'use client'

import Marquee from '@/components/ui/Marquee'
import { content } from '@/lib/content'

const { marquee } = content.skills

// Thin keyword band under the hero. The grouped skill lists ("What I Bring")
// live in the About section.
export default function Skills() {
  return (
    <div className="bg-[#f2f1ee] border-y border-black/[0.06] py-4 space-y-2.5">
      {marquee.map((row, i) => (
        <Marquee key={i} items={row} speed={i % 2 ? 28 : 35} reverse={i % 2 === 1} />
      ))}
    </div>
  )
}
