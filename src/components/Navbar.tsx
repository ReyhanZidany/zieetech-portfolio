import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { navLinks } from '../data/portfolio'
import ThemeToggle from './ThemeToggle'

interface NavbarProps {
  scrolled: boolean
}

const Navbar = ({ scrolled }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.slice(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-slate-800' : 'bg-transparent'
      }`}
    >
      <div className="container-custom mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              handleClick('#home')
            }}
            className="text-2xl md:text-3xl font-bold font-display gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            ZIEETECH
          </motion.a>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleClick(link.href)
                  }}
                  className={`relative text-sm lg:text-base font-medium transition-colors duration-300 ${
                    activeSection === link.href.slice(1)
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                  {activeSection === link.href.slice(1) && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col gap-1.5 z-50"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 ${
                  isOpen ?  'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 ${
                  isOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white/98 dark:bg-slate-900/98 backdrop-blur-md border-t border-gray-200 dark:border-slate-800 shadow-xl"
          >
            <ul className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleClick(link.href)
                    }}
                    className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                      activeSection === link.href.slice(1)
                        ? 'bg-primary text-white'
                        : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar