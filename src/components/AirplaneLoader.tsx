import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(MotionPathPlugin)

interface AirplaneLoaderProps {
  onComplete: () => void
}

const AirplaneLoader = ({ onComplete }: AirplaneLoaderProps) => {
  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 300)
      }
    })

    // Animate airplane along curved path
    tl.to('.airplane', {
      duration: 2.5,
      ease: 'power1.inOut',
      motionPath: {
        path: '#flight-path',
        align: '#flight-path',
        autoRotate: 90,
        alignOrigin: [0.5, 0.5]
      }
    }, 0)

    // Fade in airplane at start
    tl.fromTo('.airplane',
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.5 },
      0
    )

    // Fade out airplane at end
    tl.to('.airplane',
      { opacity: 0, scale: 0.7, duration: 0.5 },
      2
    )

    // Smoke follows the same path but with delay (trailing behind)
    tl.to('.smoke-trail', {
      duration: 2.5,
      ease: 'power1.inOut',
      motionPath: {
        path: '#flight-path',
        align: '#flight-path',
        autoRotate: 90,
        alignOrigin: [0.5, 0.5]
      }
    }, 0.03) // Start 0.3s after airplane

    // Fade out smoke
    tl.to('.smoke-trail',
      { opacity: 0, scale: 1.5, duration: 0.8 },
      1.7
    )

    // Fade out trail
    tl.to('.trail',
      { opacity: 0, duration: 0.5 },
      2
    )

    // Fade out entire loader
    tl.to('.loader-container', {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    }, 2.5)

  }, [onComplete])

  return (
    <div className="loader-container fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      {/* SVG for curved path and trail */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Hidden path for motion */}
        <path
          id="flight-path"
          d="M 10,90 Q 30,20 50,20 T 90,90"
          fill="none"
          stroke="none"
        />
        
        {/* Visible trailing line - dashed */}
        <path
          className="trail"
          d="M 10,90 Q 30,20 50,20 T 90,90"
          fill="none"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="0.3"
          strokeDasharray="2 1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Smoke particle - follows path behind airplane */}
      <div className="smoke-trail absolute w-8 h-8 bg-white/50 rounded-full blur-lg" style={{ left: '10%', top: '90%' }}></div>

      {/* Minimal white airplane icon */}
      <div className="airplane absolute" style={{ left: '10%', top: '90%' }}>
        {/* Engine glow effect */}
        <div className="absolute left-1 top-1/2 -translate-y-1/2 -translate-x-3 w-3 h-3 bg-orange-400/60 rounded-full blur-md animate-pulse"></div>

        {/* Airplane SVG */}
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          <path
            d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
            fill="white"
          />
        </svg>

        {/* Engine glow effect */}
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-orange-400/60 rounded-full blur-md animate-pulse"></div>
      </div>

      {/* Takeoff text */}
      <div className="absolute bottom-20 text-white/60 font-mono text-sm tracking-widest">
        TAKING OFF...
      </div>
    </div>
  )
}

export default AirplaneLoader
