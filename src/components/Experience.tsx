import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { experiences, organizations, certifications } from '../data/portfolio'
import { FaBriefcase, FaCalendar, FaMapMarkerAlt, FaCertificate, FaUsers } from 'react-icons/fa'

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="experience" className="section-padding bg-white dark:bg-gray-950" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display gradient-text">Experience</h2>
          <div className="w-20 h-1 bg-gray-800 dark:bg-gray-200 mx-auto" />
        </motion.div>

        {/* Work Experience */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Work & Training</h3>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-800 dark:bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <FaBriefcase className="text-xl text-white dark:text-gray-900" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">{exp.title}</h4>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">{exp.company}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaCalendar /> {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt /> {exp.location}
                      </span>
                      <span className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-xs">
                        {exp.type}
                      </span>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2 pl-16">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <span className="text-gray-500 dark:text-gray-500 mt-1">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Organizations */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Organizations</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {organizations.map((org, index) => (
              <motion.div
                key={org.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-800 dark:bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <FaUsers className="text-xl text-white dark:text-gray-900" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">{org.title}</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">{org.organization}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{org.period}</p>
                  </div>
                </div>
                <ul className="space-y-1 pl-16">
                  {org.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-gray-500 dark:text-gray-500">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Certifications</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="card"
              >
                <div className="flex items-start gap-3">
                  <FaCertificate className="text-gray-700 dark:text-gray-300 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{cert.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience