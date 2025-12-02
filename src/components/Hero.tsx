import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { personalInfo, socialLinks } from '../data/portfolio'

const Hero = () => {
  const iconComponents: { [key: string]: any } = {
    FaGithub,
    FaLinkedin,
    FaEnvelope,
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden section-padding pt-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-100 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-gray-300/30 dark:bg-gray-700/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-400/20 dark:bg-gray-600/20 rounded-full blur-3xl" />
      </div>

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 font-display"
            >
              <span className="gradient-text">{personalInfo.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 mb-4"
            >
              {personalInfo.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl"
            >
              {personalInfo.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mb-8"
            >
              <a href="#contact" className="btn-primary">
                Get in Touch
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex gap-4"
            >
              {socialLinks.map((social, index) => {
                const Icon = iconComponents[social.icon]
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-white dark:hover:text-gray-900 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <Icon className="text-xl" />
                  </motion.a>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right Side - Large Photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500 dark:from-gray-700 dark:to-gray-900 rounded-3xl rotate-6 blur-sm opacity-50" />
              <div className="relative w-full h-full bg-gradient-to-br from-gray-300 to-gray-500 dark:from-gray-700 dark:to-gray-900 rounded-3xl p-2">
                <img 
                  src="/profile.jpg" 
                  alt={personalInfo.name}
                  className="w-full h-full rounded-2xl object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero