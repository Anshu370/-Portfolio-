import { useState } from 'react'
import IntroScreen from './components/IntroScreen'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

function App() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <div className="bg-[#050505] text-[#e8e0d0] font-['Outfit'] overflow-x-hidden">
      <CustomCursor />
      {!introComplete ? (
        <IntroScreen onComplete={() => setIntroComplete(true)} />
      ) : (
        <>
          <nav id="nav" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-6 py-3 rounded-full opacity-0 translate-y-[20px] nav-glass">
            <a href="#hero" className="font-['Cinzel'] text-[14px] font-black text-[#c9a84c] tracking-[2px] no-underline pr-4 border-r border-[rgba(201,168,76,0.2)]">AG</a>
            <ul className="flex gap-1 list-none">
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#skills" className="nav-link">Skills</a></li>
              <li><a href="#projects" className="nav-link">Projects</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
          </nav>
          <main className="animate-fadeIn">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
          </main>
        </>
      )}
    </div>
  )
}

export default App
