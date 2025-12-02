import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { personalInfo, education } from '../data/portfolio'
import { FaGraduationCap, FaMapMarkerAlt, FaCalendar, FaTrophy } from 'react-icons/fa'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="section-padding bg-gray-100 dark:bg-gray-900 rounded-t-3xl rounded-b-3xl" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display gradient-text">About Me</h2>
          <div className="w-20 h-1 bg-gray-800 dark:bg-gray-200 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {personalInfo.bio}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <FaMapMarkerAlt className="text-xl text-gray-800 dark:text-gray-200" />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gray-800 dark:bg-gray-200 flex items-center justify-center">
                <FaGraduationCap className="text-2xl text-white dark:text-gray-900" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Education</h3>
                <p className="text-gray-600 dark:text-gray-400">{education.university}</p>
              </div>
            </div>

            <div className="space-y-3 pl-16">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FaGraduationCap className="text-gray-600 dark:text-gray-400" />
                <span>{education.degree}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FaMapMarkerAlt className="text-gray-600 dark:text-gray-400" />
                <span>{education.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FaCalendar className="text-gray-600 dark:text-gray-400" />
                <span>{education.period}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FaTrophy className="text-gray-600 dark:text-gray-400" />
                <span className="font-semibold">GPA: {education.gpa}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About