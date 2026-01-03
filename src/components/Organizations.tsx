import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { organizations } from '../data/portfolio'

const Organizations = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="organizations" className="py-12 px-6" ref={ref}>
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Section Label */}
          <p className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-8">Organizations</p>

          {/* Organizations List */}
          <div className="space-y-12">
            {organizations.map((org, index) => (
              <motion.div
                key={org.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Period */}
                <p className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-3">
                  {org.period}
                </p>

                {/* Logo & Title */}
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={org.logo} 
                    alt={org.organization}
                    className="w-12 h-12 rounded-lg object-contain flex-shrink-0"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {org.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {org.organization}
                    </p>
                  </div>
                </div>

                {/* Achievements */}
                <ul className="space-y-2">
                  {org.achievements.map((achievement, idx) => (
                    <li 
                      key={idx}
                      className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-gray-400 dark:before:text-gray-600"
                    >
                      {achievement}
                    </li>
                  ))}
                </ul>

                {/* Divider */}
                {index < organizations.length - 1 && (
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

export default Organizations