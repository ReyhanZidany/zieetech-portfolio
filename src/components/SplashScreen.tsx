import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SplashScreenProps {
  onComplete: () => void
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hash, setHash] = useState(() => Math.random().toString(16).substring(2, 15))

  useEffect(() => {
    // Hash updates every 200ms
    const hashInterval = setInterval(() => {
      setHash(Math.random().toString(16).substring(2, 15))
    }, 200)

    const timer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(onComplete, 500)
    }, 2500)

    return () => {
      clearTimeout(timer)
      clearInterval(hashInterval)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Hexagon Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
              <polygon points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Logo Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Main Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 bg-clip-text text-transparent">
              {'</zie>'}
            </span>
          </motion.h1>
        </motion.div>

        {/* Block Hash Animation - Updating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 text-xs font-mono text-gray-500 transition-all duration-200"
        >
          0x{hash}...
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SplashScreen