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
    <section id="home" className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="/idx-pict.jpg" 
          alt={personalInfo.name}
          className="w-full h-full object-cover object-center md:object-center object-[45%_center]"
        />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col py-24 px-6 md:px-12 lg:px-16">        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-auto"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
            {personalInfo.name}
          </h1>
          <p className="text-sm md:text-base text-white/80 max-w-xl">
            {personalInfo.subtitle}
          </p>
        </motion.div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mt-auto">
          
          {/* Bottom Left - Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <p className="text-white/60 text-sm mb-2">Connect with me</p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = iconComponents[social.icon]
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all duration-300 border border-white/30"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Icon className="text-xl" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Bottom Right - Title & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-right"
          >
            <h2 className="text-2xl md:text-3xl lg:text-2xl font-bold text-white mb-4 max-w-md">
              {personalInfo.title}
            </h2>    
            <a 
              href="#contact" 
              className="group inline-flex items-center gap-2 text-white font-semibold text-lg hover:text-white/90 transition-all duration-300"
            >
              <span className="relative">
                Get in Touch
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </span>
              
              {/* Diagonal Arrow */}
              <svg className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero