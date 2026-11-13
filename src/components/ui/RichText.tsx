import { Fragment } from 'react'

// Renders the tiny inline markup used in site.json:
// **text** = dark emphasis, ==text== = accent colour.
export default function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|==[^=]+==)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
          return <span key={i} className="text-[#0a0a10] font-medium">{part.slice(2, -2)}</span>
        }
        if (part.startsWith('==') && part.endsWith('==') && part.length > 4) {
          return <span key={i} className="text-teal-dark font-medium">{part.slice(2, -2)}</span>
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}
