import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface SplashScreenProps {
  onComplete: () => void
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const targetText = "GOOD GRIEF! WELCOME!"

  const loops = 3
  const speed = 50

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

  const handleVideoEnded = () => {
    setTimeout(onComplete, 500)
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#000000] overflow-hidden"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
        className="relative w-full flex justify-center px-4"
      >
        <div className="relative w-full max-w-[280px] md:max-w-[400px] aspect-[4/3] overflow-hidden rounded-xl">
          <video
            src="/peanuts-ngoding-compressed.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-xl md:text-2xl font-bold text-white tracking-widest uppercase font-comic min-h-[32px]"
      >
        {displayText}
      </motion.h2>
    </motion.div>
  )
}

export default SplashScreen