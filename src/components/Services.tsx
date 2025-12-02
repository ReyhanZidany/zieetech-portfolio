import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaCode, FaMobile, FaServer, FaDatabase, FaCloud, FaCogs } from 'react-icons/fa'

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const services = [
    {
      icon: FaCode,
      title: 'Web Development',
      description: 'Building responsive and scalable web applications using modern frameworks like Laravel, React, and Node.js.',
      skills: ['Laravel', 'React', 'Node.js', 'Tailwind CSS'],
    },
    {
      icon: FaMobile,
      title: 'Mobile Development',
      description: 'Creating native Android applications with Kotlin, implementing MVVM architecture and Material Design.',
      skills: ['Kotlin', 'Android SDK', 'Firebase', 'Jetpack'],
    },
    {
      icon: FaServer,
      title: 'Backend Development',
      description: 'Designing and implementing RESTful APIs, microservices, and server-side logic with optimal performance.',
      skills: ['Node.js', 'Express', 'Laravel', 'API Design'],
    },
    {
      icon: FaDatabase,
      title: 'Database Management',
      description: 'Designing efficient database schemas and managing data with SQL and NoSQL databases.',
      skills: ['MySQL', 'Oracle', 'Firebase', 'Database Design'],
    },
    {
      icon: FaCloud,
      title: 'IT Infrastructure',
      description: 'Managing enterprise IT infrastructure including virtualization, server management, and network monitoring.',
      skills: ['VMware', 'RHEL', 'Nutanix', 'Zabbix'],
    },
    {
      icon: FaCogs,
      title: 'DevOps & Testing',
      description: 'Implementing CI/CD pipelines, containerization, and comprehensive testing strategies.',
      skills: ['Docker', 'Git', 'JMeter', 'PHPUnit'],
    },
  ]

  return (
    <section id="services" className="section-padding bg-gray-100 dark:bg-gray-900 rounded-t-3xl rounded-b-3xl" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display gradient-text">What I Do</h2>
          <div className="w-20 h-1 bg-gray-800 dark:bg-gray-200 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive technical services from fullstack development to IT infrastructure management
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card group"
              >
                <div className="w-16 h-16 rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center mb-6 group-hover:bg-gray-900 dark:group-hover:bg-gray-100 transition-colors duration-300">
                  <Icon className="text-3xl text-gray-800 dark:text-gray-200 group-hover:text-white dark:group-hover:text-gray-900" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services