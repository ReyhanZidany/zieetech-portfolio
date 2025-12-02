import { motion } from 'framer-motion'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-14 flex items-center justify-center bg-gray-200 dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-700 rounded-full transition-colors duration-300 hover:scale-110"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180, scale: theme === 'dark' ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <FaMoon className="text-2xl text-slate-700" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'light' ? 0 : 180, scale: theme === 'light' ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <FaSun className="text-2xl text-yellow-500" />
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle