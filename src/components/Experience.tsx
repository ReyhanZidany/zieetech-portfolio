import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { experiences, organizations, certifications } from '../data/portfolio'
import { FaCalendar, FaMapMarkerAlt, FaCertificate, FaUsers, FaChevronDown, FaExternalLinkAlt, FaAward, FaFileAlt } from 'react-icons/fa'

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [expandedOrgId, setExpandedOrgId] = useState<number | null>(
    organizations.length > 0 ? organizations[0].id : null
  )

  const toggleOrgExpand = (id: number) => {
    setExpandedOrgId(expandedOrgId === id ? null : id)
  }
  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

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

        {/* Work Experience - Expandable Timeline */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Work & Training</h3>
          
          {/* Timeline Container */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700" />

            {/* Timeline Items */}
            <div className="space-y-6">
              {experiences.map((exp, index) => {
                const isExpanded = expandedId === exp.id

                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="relative pl-16"
                  >
                    {/* Timeline Dot */}
                    <motion.div 
                      className="absolute left-3 top-6 w-6 h-6 rounded-full bg-gray-800 dark:bg-white border-4 border-white dark:border-gray-950 z-10"
                      animate={{ 
                        scale: isExpanded ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Clickable Header */}
                    <div 
                      onClick={() => toggleExpand(exp.id)}
                      className="card hover:shadow-xl transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                            {exp.title}
                          </h4>
                          <p className="text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {exp.company}
                          </p>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1.5">
                              <FaCalendar className="text-gray-500 dark:text-gray-500" />
                              {exp.period}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <FaMapMarkerAlt className="text-gray-500 dark:text-gray-500" />
                              {exp.location}
                            </span>
                            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-xs">
                              {exp.type}
                            </span>
                          </div>
                        </div>

                        {/* Expand Icon */}
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-4 flex-shrink-0"
                        >
                          <FaChevronDown className="text-gray-600 dark:text-gray-400 text-xl" />
                        </motion.div>
                      </div>

                      {/* Expandable Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                              {exp.responsibilities.map((resp, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                                  className="flex items-start gap-3"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-gray-500 mt-2 flex-shrink-0" />
                                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                    {resp}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Organizations - Desktop: Always Open, Mobile: Expandable */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Organizations</h3>
          {/* Desktop Layout (≥1024px) - Side by Side, Always Open */}
          <div className="hidden lg:grid lg:grid-cols-[320px_1fr] gap-6">
            {/* Left Column - All Preview Cards */}
            <div className="space-y-4">
              {organizations.map((org, index) => {
                const isExpanded = expandedOrgId === org.id

                return (
                  <motion.div
                    key={org.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => setExpandedOrgId(org.id)}
                    className={`card hover:shadow-xl transition-all duration-300 cursor-pointer ${
                      isExpanded 
                        ? 'border-gray-400 dark:border-gray-600 shadow-xl' 
                        : 'hover:border-gray-400 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Logo or Icon */}
                      {org.logo ? (
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white dark:bg-gray-800 p-1 shadow-md">
                          <img 
                            src={org.logo} 
                            alt={org.organization}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center flex-shrink-0 shadow-md transition-all duration-300 ${
                            isExpanded ? 'ring-2 ring-gray-500 dark:ring-white' : ''
                          }`}
                        >
                          <FaUsers className="text-base text-gray-800 dark:text-gray-200" />
                        </motion.div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-base font-bold mb-1 transition-colors ${
                          isExpanded 
                            ?  'text-gray-900 dark:text-white' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {org.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 truncate">
                          {org.organization}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {org.period}
                        </p>
                      </div>

                      {/* Active Indicator */}
                      <div className="flex-shrink-0">
                        {isExpanded ? (
                          <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white" />
                        ) : (
                          <FaChevronDown className="text-gray-400 text-sm transform -rotate-90" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Right Column - Details Panel (Desktop Only) */}
            <AnimatePresence mode="wait">
              {expandedOrgId !== null && organizations.find(org => org.id === expandedOrgId) && (
                <motion.div
                  key={expandedOrgId}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4, type: 'spring' }}
                >
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 md:p-8 h-full sticky top-24">
                    {(() => {
                      const currentOrg = organizations.find(org => org.id === expandedOrgId)! 
                      return (
                        <>
                          {/* Header */}
                          <div className="mb-6 pb-6 border-b-2 border-gray-200 dark:border-gray-800">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="flex-1">
                                <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                  {currentOrg.title}
                                </h4>
                                <p className="text-base text-gray-700 dark:text-gray-300 font-medium mb-2">
                                  {currentOrg.organization}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                  <FaCalendar className="text-gray-500" />
                                  {currentOrg.period}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Achievements */}
                          <div>
                            <h5 className="text-base font-bold text-gray-700 dark:text-gray-300 mb-5 uppercase tracking-wider flex items-center gap-2">
                              <div className="w-8 h-0.5 bg-gray-700 dark:bg-gray-300" />
                              Key Achievements & Responsibilities
                            </h5>
                            <div className="space-y-4">
                              {currentOrg.achievements.map((achievement, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                                  className="flex items-start gap-3 group"
                                >
                                  <span className="text-gray-500 dark:text-gray-500 font-bold mt-0.5 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                                    -
                                  </span>
                                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {achievement}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </>
                      )
                    })()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Layout (<1024px) - Expandable Like Work Experience */}
          <div className="lg:hidden space-y-6">
            {organizations.map((org, index) => {
              const isExpanded = expandedOrgId === org.id

              return (
                <motion.div
                  key={org.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Clickable Card */}
                  <div 
                    onClick={() => toggleOrgExpand(org.id)}
                    className="card hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {/* Logo or Icon */}
                        {org.logo ? (
                          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white dark:bg-gray-800 p-1 shadow-md">
                            <img 
                              src={org.logo} 
                              alt={org.organization}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center flex-shrink-0 shadow-md">
                            <FaUsers className="text-base text-gray-800 dark:text-gray-200" />
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                            {org.title}
                          </h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                            {org.organization}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                            <FaCalendar className="text-gray-500" />
                            {org.period}
                          </p>
                        </div>
                      </div>

                      {/* Expand Icon */}
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-4 flex-shrink-0"
                      >
                        <FaChevronDown className="text-gray-600 dark:text-gray-400 text-lg" />
                      </motion.div>
                    </div>

                    {/* Expandable Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                            {org.achievements.map((achievement, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                className="flex items-start gap-3"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-gray-500 mt-2 flex-shrink-0" />
                                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                  {achievement}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Certifications - Modern Card Style */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Certifications</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => {
              // Determine credential link (URL or PDF)
              const credentialLink = cert.credentialUrl || cert.certificatePDF
              const isExternalLink = !!cert.credentialUrl
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ?  { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group"
                >
                  {credentialLink ?  (
                    <a
                      href={credentialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card h-full hover:shadow-2xl hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 block relative overflow-hidden"
                    >
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                      <div className="relative">
                        <div className="flex items-start gap-4 mb-3">
                          {/* Logo or Icon */}
                          {cert.logo ? (
                            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-white dark:bg-gray-800 p-2 shadow-lg">
                              <img 
                                src={cert.logo}
                                alt={cert.issuer}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          ) : (
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center flex-shrink-0 shadow-lg"
                            >
                              <FaAward className="text-xl text-gray-800 dark:text-gray-200" />
                            </motion.div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-900 dark:text-gray-100 text-base leading-snug mb-1 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                              {cert.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {cert.issuer}
                            </p>
                          </div>
                        </div>

                        {/* View Credential Link */}
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          {isExternalLink ? (
                            <FaExternalLinkAlt className="text-xs" />
                          ) : (
                            <FaFileAlt className="text-xs" />
                          )}
                          <span>View Credential</span>
                          <FaChevronDown className="ml-auto transform -rotate-90 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="card h-full hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                      <div className="flex items-start gap-4">
                        {cert.logo ? (
                          <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-white dark:bg-gray-800 p-2 shadow-lg">
                            <img 
                              src={cert.logo}
                              alt={cert.issuer}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                            <FaCertificate className="text-xl text-gray-700 dark:text-gray-300" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 dark:text-gray-100 text-base leading-snug mb-1">
                            {cert.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {cert.issuer}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience