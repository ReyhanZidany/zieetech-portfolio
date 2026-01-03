import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSun, FaMoon, FaHome, FaUser, FaCode, FaBriefcase, FaEnvelope } from 'react-icons/fa'

const Navigation = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isFooterVisible, setIsFooterVisible] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'experience', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 200 && rect.bottom >= 200
        }
        return false
      })
      if (current) setActiveSection(current)

      // Check footer visibility
      const footer = document.querySelector('footer')
      if (footer) {
        const rect = footer.getBoundingClientRect()
        const windowHeight = window.innerHeight
        // Hide navigation when footer starts to appear (with 100px threshold)
        setIsFooterVisible(rect.top < windowHeight - 100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
    setDarkMode(!darkMode)
  }

  const navItems = [
    { id: 'hero', icon: FaHome, label: 'Home' },
    { id: 'about', icon: FaUser, label:  'About' },
    { id: 'projects', icon:  FaCode, label: 'Projects' },
    { id:  'experience', icon: FaBriefcase, label: 'Experience' },
    { id:  'contact', icon: FaEnvelope, label: 'Contact' },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: 100 }}
      animate={{ 
        opacity: isFooterVisible ? 0 :  1, 
        y:  isFooterVisible ? 100 : 0 
      }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 left-[calc(50%-150px)] md:left-[calc(50%-220px)] z-[100]"
      style={{ pointerEvents:isFooterVisible ?  'none' :'auto' }}
    >
      <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-full border border-gray-200 dark:border-gray-800 shadow-2xl px-4 py-3 flex items-center justify-center">
        <div className="flex items-center gap-2">
          {/* Logo - Hidden on mobile */}
          <a 
            href="#hero"
            className="text-sm font-bold font-mono text-gray-900 dark:text-white px-3 py-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors hidden md:block"
          >
            {'</zie>'}
          </a>

          <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-1 hidden md:block" />

          {/* Nav Items */}
          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="relative group"
                  aria-label={item.label}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2.5 sm:p-3 rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-black shadow-md' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="text-base sm:text-lg" />
                  </motion.div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0 pointer-events-none">
                    <div className="bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                      {item.label}
                      {/* Arrow Tooltip */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-white rotate-45"></div>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>

          <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-1" />

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 sm:p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {darkMode ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 90, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaSun className="text-base sm:text-lg" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: -90, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaMoon className="text-gray-600 text-base sm:text-lg" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navigation