import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface SplashScreenProps {
  onComplete: () => void
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const [displayText, setDisplayText] = useState('')
  const targetText = "GOOD GRIEF! WELCOME!"

  // Animation settings
  const loops = 3
  const speed = 50

  useGSAP(() => {
    // Text Wobble Effect (Comic style)
    if (textRef.current && isVideoLoaded) {
      gsap.to(textRef.current, {
        rotation: 2,
        duration: 0.1,
        yoyo: true,
        repeat: 5,
        ease: "rough({ template: none.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp: false})"
      })
    }
  }, { scope: containerRef, dependencies: [isVideoLoaded] })

  // Ref for the video wrapper to animate zoom
  const videoWrapperRef = useRef<HTMLDivElement>(null)

  const handleVideoEnded = () => {
    // Parallax Slide Up Exit Animation
    if (containerRef.current && videoWrapperRef.current && textRef.current) {
      const tl = gsap.timeline({ onComplete })

      // 1. Zoom out / Close circle
      tl.to(videoWrapperRef.current, {
        clipPath: "circle(0% at 50% 50%)",
        duration: 0.8,
        ease: "power4.inOut"
      })

        // 2. Fade out text
        .to(textRef.current, { opacity: 0, duration: 0.3 }, "<")

        // 3. Fade out container background
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.5
        }, "-=0.2")

    } else {
      onComplete()
    }
  }

  // Text scrambling effect
  useEffect(() => {
    const randomHash = "0x" + Math.random().toString(16).substring(2, 10).toUpperCase()
    setDisplayText(randomHash)

    const startDelay = setTimeout(() => {
      let iteration = 0
      const interval = setInterval(() => {
        setDisplayText(_current => {
          return targetText
            .split("")
            .map((_letter, index) => {
              if (index < iteration) {
                return targetText[index]
              }
              const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join("")
        })

        if (iteration >= targetText.length) {
          clearInterval(interval)
        }
        iteration += 1 / loops
      }, speed)
      return () => clearInterval(interval)
    }, 1000)

    return () => clearTimeout(startDelay)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#000000] overflow-hidden"
    >
      <motion.div
        ref={videoWrapperRef}
        initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 0 }}
        animate={{ clipPath: "circle(100% at 50% 50%)", opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="relative w-full max-w-[300px] md:max-w-[400px] aspect-square rounded-full overflow-hidden bg-black"
      >
        <video
          src="/peanuts-ngoding-compressed.mp4"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-contain transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </motion.div>

      <h2
        ref={textRef}
        className="mt-8 text-xl md:text-2xl font-bold text-white tracking-widest uppercase font-comic min-h-[32px] opacity-100"
      >
        {displayText}
      </h2>
    </div>
  )
}

export default SplashScreen