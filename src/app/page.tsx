import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import MotionProvider from '@/components/MotionProvider'

// Split into separate chunks but still server-rendered, so the text is in the
// HTML and links like /#experience land on the section.
const Skills     = dynamic(() => import('@/components/sections/Skills'))
const About      = dynamic(() => import('@/components/sections/About'))
const Experience = dynamic(() => import('@/components/sections/Experience'))
const Work       = dynamic(() => import('@/components/sections/Work'))
const AIWriting  = dynamic(() => import('@/components/sections/AIWriting'))
const Services   = dynamic(() => import('@/components/sections/Services'))
const Contact    = dynamic(() => import('@/components/sections/Contact'))
const Footer     = dynamic(() => import('@/components/Footer'))

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
