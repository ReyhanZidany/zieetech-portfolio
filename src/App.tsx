import { useState } from 'react'
import SplashScreen from './components/SplashScreen'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Organizations from './components/Organizations'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LightRays from './components/LightRays'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      
      {! showSplash && (
        <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors relative">
          {/* LightRays Background */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={0.5}
              lightSpread={2}
              rayLength={2.5}
              pulsating={false}
              fadeDistance={0.8}
              saturation={0.3}
              followMouse={true}
              mouseInfluence={0.15}
              noiseAmount={0.1}
              distortion={0.2}
              className="opacity-10 dark:opacity-20"
            />
          </div>

          <Navigation />
          <main className="pb-24 relative z-10">
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Organizations />
            <Certifications />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  )
}

export default App