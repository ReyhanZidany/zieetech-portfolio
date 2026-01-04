import { useState, useEffect } from 'react'
import ReactGA from 'react-ga4'
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

  const handleSplashComplete = () => {
    setShowSplash(false)
    
    ReactGA.event({
      category: 'User',
      action: 'Completed Splash Screen'
    })
  }

  useEffect(() => {
    if (! showSplash) {
      let maxScroll = 0
      
      const handleScroll = () => {
        const scrollPercentage = (window.scrollY / (document. documentElement.scrollHeight - window. innerHeight)) * 100
        
        if (scrollPercentage > maxScroll) {
          maxScroll = scrollPercentage
          
          if (maxScroll > 25 && maxScroll < 30) {
            ReactGA.event({ category: 'Scroll', action: '25% Page Scroll' })
          } else if (maxScroll > 50 && maxScroll < 55) {
            ReactGA.event({ category: 'Scroll', action: '50% Page Scroll' })
          } else if (maxScroll > 75 && maxScroll < 80) {
            ReactGA.event({ category: 'Scroll', action:  '75% Page Scroll' })
          } else if (maxScroll > 90) {
            ReactGA.event({ category: 'Scroll', action: '100% Page Scroll' })
          }
        }
      }
      
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [showSplash])

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      {! showSplash && (
        <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors relative">
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