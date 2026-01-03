import { motion, useMotionValue, useAnimationFrame } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { skills } from '../data/portfolio'
import { iconComponents, iconColors, customIcons } from '../utils/techIcons'

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [isHoveredTop, setIsHoveredTop] = useState(false)
  const [isHoveredBottom, setIsHoveredBottom] = useState(false)

  const midPoint = Math.ceil(skills.length / 2)
  const topRowSkills = skills.slice(0, midPoint)
  const bottomRowSkills = skills.slice(midPoint)

  const xTop = useMotionValue(0)
  const xBottom = useMotionValue(0)

  const topRowWidth = topRowSkills.length * 180
  const bottomRowWidth = bottomRowSkills.length * 180

  useAnimationFrame((t, delta) => {
    if (!isHoveredTop) {
      let newX = xTop.get() - (delta * 0.05)
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
    const isCustom = skill.name.toLowerCase() in customIcons

    return (
      <div className="flex-shrink-0 flex items-center gap-3 px-5 py-3 bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-200">
        <div className="w-6 h-6 flex items-center justify-center">
          {isCustom ?  (
            <img 
              src={customIcons[skill.name.toLowerCase()]} 
              alt={skill.name}
              className="w-full h-full object-contain opacity-70 dark:invert"
            />
          ) : Icon ? (
            <Icon className="text-xl" style={{ color }} />
          ) : null}
        </div>
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap font-mono">
          {skill.name}
        </span>
      </div>
    )
  }

  return (
    <section id="skills" className="py-16 bg-transparent" ref={ref}>
      <div className="max-w-content mx-auto px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity:  1, y: 0 } :  {}}
          transition={{ duration:  0.5 }}
        >
          <p className="text-sm font-mono text-gray-500 dark:text-gray-400">Tech Stack</p>
        </motion.div>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark: from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <div className="space-y-4">
            <div 
              className="overflow-hidden"
              onMouseEnter={() => setIsHoveredTop(true)}
              onMouseLeave={() => setIsHoveredTop(false)}
            >
              <motion.div 
                className="flex gap-3 py-2"
                style={{ x: xTop }}
              >
                {[...topRowSkills, ...topRowSkills, ...topRowSkills].map((skill, i) => (
                  <SkillCard key={`top-${i}`} skill={skill} />
                ))}
              </motion.div>
            </div>

            <div 
              className="overflow-hidden"
              onMouseEnter={() => setIsHoveredBottom(true)}
              onMouseLeave={() => setIsHoveredBottom(false)}
            >
              <motion.div 
                className="flex gap-3 py-2"
                style={{ x: xBottom }}
              >
                {[...bottomRowSkills, ...bottomRowSkills, ...bottomRowSkills].map((skill, i) => (
                  <SkillCard key={`bottom-${i}`} skill={skill} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills