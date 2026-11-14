import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import MotionProvider from '@/components/MotionProvider'

const Skills     = dynamic(() => import('@/components/sections/Skills'),     { ssr: false })
const About      = dynamic(() => import('@/components/sections/About'),      { ssr: false })
const Experience = dynamic(() => import('@/components/sections/Experience'), { ssr: false })
const Work       = dynamic(() => import('@/components/sections/Work'),       { ssr: false })
const AIWriting  = dynamic(() => import('@/components/sections/AIWriting'),  { ssr: false })
const Services   = dynamic(() => import('@/components/sections/Services'),   { ssr: false })
const Contact    = dynamic(() => import('@/components/sections/Contact'),    { ssr: false })
const Footer     = dynamic(() => import('@/components/Footer'),              { ssr: false })

// Order: who he is (Hero, About), proof (Experience, Work, Writing for AI),
// then what he offers (Services + How I Work) and Contact.
export default function Home() {
  return (
    <MotionProvider>
      <main>
        <Navbar />
        <Hero />
        <Skills />
        <About />
        <Experience />
        <Work />
        <AIWriting />
        <Services />
        <Contact />
        <Footer />
      </main>
    </MotionProvider>
  )
}
