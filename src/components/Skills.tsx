import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skills } from '../data/portfolio'
import { 
  FaReact, FaNode, FaPython, FaJava, FaGitAlt, FaDocker, FaAndroid, FaLaravel, FaCube
} from 'react-icons/fa'
import { 
  SiKotlin, SiExpress, SiMysql, SiOracle, SiFirebase, SiPostman, SiPhp
} from 'react-icons/si'
import { IoLogoJavascript } from 'react-icons/io5'

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const iconComponents: { [key: string]: any } = {
    FaReact, FaNode, FaPython, FaJava, FaGitAlt, FaDocker, FaAndroid, FaLaravel,
    SiKotlin, SiExpress, SiMysql, SiOracle, SiFirebase, SiPostman, SiPhp,
    IoLogoJavascript, FaCube,
    SiApachejmeter: FaCube,
  }

  // Duplicate skills for infinite scroll effect
  const duplicatedSkills = [...skills, ...skills]

  return (
    <section id="skills" className="section-padding bg-white dark:bg-gray-950 relative overflow-hidden" ref={ref}>
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gray-200/40 dark:bg-gray-800/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-300/30 dark:bg-gray-700/30 rounded-full blur-3xl" />
      </div>

      <div className="container-custom">
        <motion. div
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

        {/* Auto-scrolling carousel */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10" />

          {/* Scrolling Container */}
          <div className="overflow-hidden py-8">
            <motion.div
              className="flex gap-6"
              animate={{
                x: [0, -1920], // Adjust based on content width
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
              {duplicatedSkills.map((skill, index) => {
                const Icon = iconComponents[skill.icon]
                const isCustomImage = skill.icon === 'SiHyperledger'

                return (
                  <motion.div
                    key={`${skill.name}-${index}`}
                    whileHover={{ scale: 1.1, y: -10 }}
                    className="flex-shrink-0 group"
                  >
                    <div className="bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-2xl p-6 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-2xl w-32 h-32 relative overflow-hidden">
                      {/* Hover Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                      {/* Content */}
                      <div className="relative flex flex-col items-center justify-center h-full gap-3">
                        {/* Icon */}
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 p-2">
                          {isCustomImage ? (
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
              })}
            </motion.div>
          </div>

          {/* Category Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ?  { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-3"
          >
            {[
              'Languages',
              'Backend',
              'Mobile',
              'Blockchain',
              'Database',
              'DevOps',
              'Testing'
            ].map((cat) => (
              <span
                key={cat}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {cat}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Skills