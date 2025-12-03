import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skills } from '../data/portfolio'
import { 
  FaReact, FaNode, FaPython, FaJava, FaGitAlt, FaDocker, FaAndroid, FaLaravel, FaCube
} from 'react-icons/fa'
import { 
  SiKotlin, SiExpress, SiMysql, SiOracle, SiFirebase, SiPostman, SiPhp, SiApachecouchdb, SiTypescript, SiSpringboot, SiTailwindcss
} from 'react-icons/si'
import { IoLogoJavascript } from 'react-icons/io5'

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeCategory, setActiveCategory] = useState('all')

  const iconComponents: { [key: string]: any } = {
    FaReact, FaNode, FaPython, FaJava, FaGitAlt, FaDocker, FaAndroid, FaLaravel,
    SiKotlin, SiExpress, SiMysql, SiOracle, SiFirebase, SiPostman, SiPhp, SiApachecouchdb, SiTypescript, SiSpringboot,SiTailwindcss,
    IoLogoJavascript, FaCube,
    SiApachejmeter: FaCube,
  }

  const categories = [
    { key: 'all', label: 'All Skills' },
    { key: 'languages', label: 'Languages' },
    { key: 'backend', label: 'Backend' },
    { key: 'blockchain', label: 'Blockchain' },
    { key: 'database', label: 'Database' },
    { key: 'tools', label: 'DevOps' },
    { key: 'testing', label: 'Testing' },
  ]

  // Filter skills based on active category
  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory)

  // Duplicate for infinite scroll (only for "All Skills")
  const duplicatedSkills = [...filteredSkills, ...filteredSkills, ...filteredSkills]

  // Check if should use scrolling (only for "All Skills")
  const useScrolling = activeCategory === 'all'

  const SkillCard = ({ skill, index }: { skill: any, index: number }) => {
    const Icon = iconComponents[skill.icon]
    const isCustomImage = skill.icon === 'SiHyperledger'

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, delay: useScrolling ? 0 : index * 0.05 }}
        whileHover={{ scale: 1.1, y: -10 }}
        className={`group ${useScrolling ? 'flex-shrink-0' : ''}`}
      >
        <div className="bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-6 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-2xl w-32 h-32 relative overflow-hidden">
          {/* Hover Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

          {/* Content */}
          <div className="relative flex flex-col items-center justify-center h-full gap-3">
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 p-2">
              {isCustomImage ?  (
                <img 
                  src="/hyperledger-fabric-logo-bw.png" 
                  alt="Hyperledger Fabric"
                  className="w-full h-full object-contain"
                />
              ) : (
                Icon && <Icon className="text-2xl text-gray-800 dark:text-gray-200" />
              )}
            </div>

            {/* Name */}
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs text-center leading-tight">
              {skill.name}
            </h4>
          </div>

          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </div>
      </motion.div>
    )
  }

  return (
    <section id="skills" className="section-padding bg-white dark:bg-gray-950 relative overflow-hidden" ref={ref}>
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gray-200/40 dark:bg-gray-800/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-300/30 dark:bg-gray-700/30 rounded-full blur-3xl" />
      </div>

      <div className="container-custom">
        {/* Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display gradient-text">Technical Skills</h2>
          <div className="w-20 h-1 bg-gray-800 dark:bg-gray-200 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Proficient in various technologies and frameworks for fullstack and mobile development
          </p>
        </motion.div>

        {/* Category Filter - Simple with Underline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ?  { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 flex flex-wrap justify-center gap-6"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className="relative text-sm md:text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 pb-2"
            >
              {cat.label}
              
              {/* Underline for active category */}
              {activeCategory === cat.key && (
                <motion.div
                  layoutId="activeUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Skills Display */}
        <AnimatePresence mode="wait">
          {useScrolling ? (
            /* Auto-scrolling carousel for "All Skills" */
            <motion.div
              key="scrolling"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              {/* Gradient Overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />

              {/* Scrolling Container */}
              <div className="overflow-hidden py-8">
                <motion.div
                  className="flex gap-6"
                  animate={{
                    x: [0, -1920],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 30,
                      ease: "linear",
                    },
                  }}
                >
                  {duplicatedSkills.map((skill, index) => (
                    <SkillCard key={`${skill.name}-${index}`} skill={skill} index={index} />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ) : (
            /* Grid layout for specific categories - CENTERED */
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
            <div className="flex flex-wrap justify-center gap-6 max-w-5xl">
                {filteredSkills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skills Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center text-gray-600 dark:text-gray-400"
        >
          Showing <span className="font-bold text-gray-900 dark:text-white">{filteredSkills.length}</span> skill{filteredSkills.length !== 1 ? 's' : ''}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills