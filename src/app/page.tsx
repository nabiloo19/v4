import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'

const AmbientBackground = dynamic(() => import('@/components/AmbientBackground'), { ssr: false })
const About      = dynamic(() => import('@/components/sections/About'),      { ssr: false })
const Process    = dynamic(() => import('@/components/sections/Process'),    { ssr: false })
const AIWriting  = dynamic(() => import('@/components/sections/AIWriting'),  { ssr: false })
const Skills     = dynamic(() => import('@/components/sections/Skills'),     { ssr: false })
const Work       = dynamic(() => import('@/components/sections/Work'),       { ssr: false })
const Experience = dynamic(() => import('@/components/sections/Experience'), { ssr: false })
const Contact    = dynamic(() => import('@/components/sections/Contact'),    { ssr: false })
const Footer     = dynamic(() => import('@/components/Footer'),              { ssr: false })

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <main className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Process />
        <AIWriting />
        <Skills />
        <Work />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
