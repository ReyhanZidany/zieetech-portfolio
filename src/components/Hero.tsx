import { motion, useMotionValue, useAnimationFrame } from 'framer-motion'
import { useState } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { personalInfo, socialLinks, skills } from '../data/portfolio'
import { iconComponents, iconColors, customIcons } from '../utils/techIcons'

const Hero = () => {
  const [isHoveredTop, setIsHoveredTop] = useState(false)
  const [isHoveredBottom, setIsHoveredBottom] = useState(false)

  const socialIconComponents:  { [key: string]: any } = {
    FaGithub,
    FaLinkedin,
    FaEnvelope,
  }

  // Skills animation
  const midPoint = Math.ceil(skills.length / 2)
  const topRowSkills = skills.slice(0, midPoint)
  const bottomRowSkills = skills.slice(midPoint)

  const xTop = useMotionValue(0)
  const xBottom = useMotionValue(0)

  const topRowWidth = topRowSkills.length * 150
  const bottomRowWidth = bottomRowSkills.length * 150

  useAnimationFrame((_t, delta) => {
    if (! isHoveredTop) {
      let newX = xTop. get() - (delta * 0.05)
      if (newX <= -topRowWidth) {
        newX = 0
      }
      xTop.set(newX)
    }

    if (!isHoveredBottom) {
      let newX = xBottom.get() + (delta * 0.05)
      if (newX >= 0) {
        newX = -bottomRowWidth
      }
      xBottom.set(newX)
    }
  })

  const SkillCard = ({ skill }: { skill: any }) => {
    const Icon = iconComponents[skill.icon]
    const color = iconColors[skill.icon] || '#6B7280'
    
    // Check if it's Hyperledger Fabric specifically
    const isHyperledgerFabric = skill.name === 'Hyperledger Fabric'
    const isCustom = ! isHyperledgerFabric && skill.name.toLowerCase() in customIcons

    return (
      <div className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-200">
        <div className="w-5 h-5 flex items-center justify-center">
          {isHyperledgerFabric ?  (
            <img 
              src="/hyperledger-fabric-logo.png" 
              alt="Hyperledger Fabric"
              className="w-full h-full object-contain"
            />
          ) : isCustom ? (
            <img 
              src={customIcons[skill.name.toLowerCase()]} 
              alt={skill.name}
              className="w-full h-full object-contain opacity-70 dark:invert"
            />
          ) : Icon ? (
            <Icon className="text-lg" style={{ color }} />
          ) : null}
        </div>
        <span className="text-xs font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap font-mono">
          {skill.name}
        </span>
      </div>
    )
  }

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-6 pt-12 pb-12">
      <div className="max-w-content mx-auto w-full mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Name */}
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            {personalInfo.name}
          </h1>

          {/* Title */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6 font-mono">
            {personalInfo.title}
          </p>

          {/* Bio */}
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-2xl">
            Computer Engineering student passionate about building scalable solutions. 
            Experienced in{' '}
            <span className="text-gray-900 dark:text-white font-medium">fullstack development</span>
            ,{' '}
            <span className="text-gray-900 dark:text-white font-medium">blockchain technology</span>
            , and creating seamless digital experiences across the stack.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = socialIconComponents[social.icon]
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <Icon className="text-xl" />
                </a>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Skills Section with Fade - max-w-2xl only */}
      <div className="w-full flex justify-center">
        <div 
          className="max-w-2xl w-full relative overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 95%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 95%, transparent 100%)'
          }}
        >
          <div className="space-y-3">
            {/* Top Row */}
            <div 
              className="overflow-visible"
              onMouseEnter={() => setIsHoveredTop(true)}
              onMouseLeave={() => setIsHoveredTop(false)}
            >
              <motion.div 
                className="flex gap-2.5 py-2"
                style={{ x: xTop }}
              >
                {[...topRowSkills, ...topRowSkills, ...topRowSkills].map((skill, i) => (
                  <SkillCard key={`top-${i}`} skill={skill} />
                ))}
              </motion.div>
            </div>

            {/* Bottom Row */}
            <div 
              className="overflow-visible"
              onMouseEnter={() => setIsHoveredBottom(true)}
              onMouseLeave={() => setIsHoveredBottom(false)}
            >
              <motion.div 
                className="flex gap-2.5 py-2"
                style={{ x: xBottom }}
              >
                {[...bottomRowSkills, ...bottomRowSkills, ...bottomRowSkills].map((skill, i) => (
                  <SkillCard key={`bottom-${i}`} skill={skill} />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Gradient overlay fallback - juga max-w-2xl */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-black to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-black to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero