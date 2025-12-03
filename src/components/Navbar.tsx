import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, socialLinks } from '../data/portfolio'
import ThemeToggle from './ThemeToggle'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  FaGithub: <FaGithub className="w-5 h-5" />,
  FaLinkedin: <FaLinkedin className="w-5 h-5" />,
  FaEnvelope: <FaEnvelope className="w-5 h-5" />,
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [showLogo, setShowLogo] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        const aboutPosition = aboutSection.offsetTop
        setShowLogo(window.scrollY >= aboutPosition - 100)
      }

      const sections = navLinks.map(link => link.href.slice(1))
      const scrollPosition = window.scrollY + 150

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          if (scrollPosition >= offsetTop - 50) {
            setActiveSection(section)
            break
          }
        }
      }

      if (window.scrollY < 100) {
        setActiveSection('home')
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClick = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      const navbarHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navbarHeight + 50
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleLogoClick = () => {
    setIsOpen(false)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      >
        {/* Floating Container */}
        <div className={`flex items-center rounded-full transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-gray-800 shadow-lg px-6 md:px-6 py-3 w-full max-w-7xl justify-between md:justify-start gap-3'
            : 'bg-transparent border border-transparent px-6 md:px-4 py-3 w-full md:w-auto justify-between md:justify-start gap-3'
        }`}>
          
          {/* Logo - Show after scroll */}
          <AnimatePresence>
            {showLogo && (
              <>
                <motion.button
                  onClick={handleLogoClick}
                  initial={{ opacity: 0, width: 0, marginRight: 0 }}
                  animate={{ opacity: 1, width: 'auto', marginRight: 12 }}
                  exit={{ opacity: 0, width: 0, marginRight: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="text-lg md:text-xl font-bold font-display gradient-text whitespace-nowrap overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  zieetech
                </motion.button>
                
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="hidden md:block w-px h-6 bg-gray-300 dark:bg-gray-700 mr-2"
                />
              </>
            )}
          </AnimatePresence>

          {/* Spacer - Mobile only */}
          {!showLogo && <div className="md:hidden flex-1" />}

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1 relative flex-1 justify-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => handleClick(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 whitespace-nowrap ${
                    activeSection === link.href.slice(1)
                      ?  scrolled ?  'text-gray-900 dark:text-white' : 'text-white'
                      : scrolled ? 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.name}
                  {activeSection === link.href.slice(1) && (
                    <motion.span
                      layoutId="navbar-underline"
                      className={`absolute left-2 right-2 bottom-1 h-0.5 rounded-full ${scrolled ? 'bg-gray-900 dark:bg-white' : 'bg-white'}`}
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Theme Toggle - Desktop */}
          <div className="hidden md:flex items-center ml-2">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center gap-1.5 p-2 w-10 h-10 flex-shrink-0"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 transition-all duration-300 rounded-full ${scrolled ? 'bg-gray-900 dark:bg-white' : 'bg-white'} ${isOpen ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`block w-5 h-0.5 transition-all duration-300 rounded-full ${scrolled ? 'bg-gray-900 dark:bg-white' : 'bg-white'} ${isOpen ?  '-rotate-45 -translate-y-1' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu - Dropdown with Social Links */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden fixed top-[88px] left-4 right-4 mx-auto max-w-sm bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-800/50 z-50 overflow-hidden"
            >
              {/* Navigation Links */}
              <nav className="p-3">
                <ul className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <button
                        onClick={() => handleClick(link.href)}
                        className={`w-full text-center py-3 px-4 rounded-xl font-semibold text-base transition-all duration-300 ${
                          activeSection === link.href.slice(1)
                            ?  'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg scale-[1.02]'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.01]'
                        }`}
                      >
                        {link.name}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Social Links Section */}
              <div className="px-4 pb-4 pt-2 border-t border-gray-200/50 dark:border-gray-800/50">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center gap-4"
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                      rel={social.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-300 shadow-md hover:shadow-lg ${
                        social.icon === 'FaGithub'
                          ? 'hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900'
                          : social.icon === 'FaLinkedin'
                          ? 'hover:bg-[#0A66C2] hover:text-white'
                          : social.icon === 'FaEnvelope'
                          ? 'hover:bg-red-500 hover:text-white'
                          : 'hover:bg-gray-700 hover:text-white'
                      }`}
                      aria-label={social.name}
                    >
                      {iconMap[social.icon]}
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Theme Toggle - Mobile */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        className="md:hidden fixed bottom-6 right-6 z-[60]"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-full shadow-2xl border border-gray-200/50 dark:border-gray-800/50 p-1"
        >
          <ThemeToggle />
        </motion.div>
      </motion.div>
    </>
  )
}

export default Navbar