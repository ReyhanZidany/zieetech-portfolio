import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { experiences } from '../data/portfolio'

const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="experience" className="py-12 px-6" ref={ref}>
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Section Label */}
          <p className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-8">Experience</p>

          {/* Timeline */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity:  0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex items-start gap-4">
                  {/* Company Logo */}
                  {exp.logo && (
                    <img 
                      src={exp.logo} 
                      alt={exp.company}
                      className="w-12 h-12 rounded-lg object-contain flex-shrink-0"
                    />
                  )}

                  <div className="flex-1">
                    {/* Period */}
                    <p className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-2">
                      {exp.period}
                    </p>

                    {/* Position & Company */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                      {exp.company}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-4 font-mono">
                      {exp.location} · {exp.type}
                    </p>

                    {/* Responsibilities */}
                    <ul className="space-y-2">
                      {exp.responsibilities.map((responsibility, idx) => (
                        <li 
                          key={idx}
                          className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-gray-400 dark:before:text-gray-600"
                        >
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Divider */}
                {index < experiences.length - 1 && (
                  <div className="mt-8 h-px bg-gray-200 dark:bg-gray-800"></div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience