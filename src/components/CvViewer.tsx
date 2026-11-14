'use client'

import { useEffect, useRef, useState } from 'react'

// The CV is an A4 page (794 x 1123 CSS px). It renders in an iframe so its own
// styles stay separate from the site's, then scales to fit the screen width.
const PAGE_W = 794
const PAGE_H = 1123

export default function CvViewer({ src, pdf, name, title }: { src: string; pdf: string; name: string; title: string }) {
  const wrap = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const [scale, setScale] = useState<number | null>(null)

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const fit = () => setScale(Math.min(1.15, el.clientWidth / PAGE_W))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const print = () => {
    const w = frame.current?.contentWindow
    if (w) { w.focus(); w.print() } else window.open(pdf, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#f2f1ee]">
      <header className="sticky top-0 z-10 bg-[#fafaf9]/90 backdrop-blur border-b border-black/[0.07]">
        <div className="max-w-[920px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <a href="/" className="min-w-0 group">
            <span className="block font-mono text-[11px] text-text-muted group-hover:text-teal-dark transition-colors">← nabiloo.tech</span>
            <span className="block text-sm font-semibold text-[#0a0a10] truncate">{name} · {title}</span>
          </a>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={print}
              className="hidden sm:inline-flex font-mono text-xs text-[#0a0a10] px-4 py-2 rounded-full border border-black/[0.12] hover:border-black/25 transition-colors"
            >
              Print
            </button>
            <a
              href={pdf}
              download="Nabil-Mohammed-CV.pdf"
              className="inline-flex items-center gap-2 font-mono text-xs bg-[#0a0a10] text-[#fafaf9] px-4 py-2 rounded-full hover:bg-[#1a1a24] transition-colors"
            >
              Download PDF
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-[920px] mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div ref={wrap} className="w-full">
          <div
            className="relative mx-auto bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_40px_-12px_rgba(10,10,16,0.18)] rounded-sm overflow-hidden transition-opacity duration-300"
            style={{
              width: PAGE_W * (scale ?? 1),
              height: PAGE_H * (scale ?? 1),
              maxWidth: '100%',
              opacity: scale === null ? 0 : 1,
            }}
          >
            <iframe
              ref={frame}
              src={src}
              title={`${name} CV`}
              scrolling="no"
              className="absolute top-0 left-0 border-0 origin-top-left"
              style={{ width: PAGE_W, height: PAGE_H, transform: `scale(${scale ?? 1})` }}
            />
          </div>
        </div>
        <p className="sm:hidden text-center font-mono text-[11px] text-text-muted mt-4">
          Pinch to zoom, or download the PDF.
        </p>
      </main>
    </div>
  )
}
