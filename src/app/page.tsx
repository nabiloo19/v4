import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'

const About      = dynamic(() => import('@/components/sections/About'),      { ssr: false })
const Services   = dynamic(() => import('@/components/sections/Services'),   { ssr: false })
const Process    = dynamic(() => import('@/components/sections/Process'),    { ssr: false })
const AIWriting  = dynamic(() => import('@/components/sections/AIWriting'),  { ssr: false })
const Skills     = dynamic(() => import('@/components/sections/Skills'),     { ssr: false })
const Work       = dynamic(() => import('@/components/sections/Work'),       { ssr: false })
const Experience = dynamic(() => import('@/components/sections/Experience'), { ssr: false })
const Contact    = dynamic(() => import('@/components/sections/Contact'),    { ssr: false })
const Footer     = dynamic(() => import('@/components/Footer'),              { ssr: false })

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Process />
      <AIWriting />
      <Skills />
      <Work />
      <Experience />
      <Contact />
      <Footer />
    </main>
  )
}
