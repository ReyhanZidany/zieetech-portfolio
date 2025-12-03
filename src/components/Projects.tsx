import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { projects } from '../data/portfolio'
import { FaGithub, FaExternalLinkAlt, FaTimes, FaArrowRight, FaCode } from 'react-icons/fa'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedProject, setSelectedProject] = useState<any>(null)

  return (
    <section id="projects" className="section-padding bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 relative overflow-hidden" ref={ref}>
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gray-200/30 dark:bg-gray-800/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-300/20 dark:bg-gray-700/20 rounded-full blur-3xl" />
      </div>

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display gradient-text">Technical Projects</h2>
          <div className="w-20 h-1 bg-gray-800 dark:bg-gray-200 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Real-world projects showcasing my technical expertise and problem-solving abilities
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer"
            >
              {/* Project Card */}
              <div className="relative h-full bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border-2 border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-500 shadow-lg hover:shadow-2xl">
                
                {/* Thumbnail */}
                <div className="relative h-64 md:h-72 bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  {project.thumbnail ?  (
                    <img 
                      src={project.thumbnail} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-500 dark:from-gray-700 dark:to-gray-900">
                      <span className="text-8xl font-bold text-white/20 dark:text-gray-200/20 group-hover:scale-110 transition-transform duration-500">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags Preview (First 3) */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-3 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">

                    <div className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold group-hover:gap-3 transition-all duration-300">
                      <span className="text-sm">Explore</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Popup */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-900 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl my-8"
              >
                {/* Header with Image */}
                <div className="relative h-80 bg-gray-200 dark:bg-gray-800 rounded-t-3xl overflow-hidden">
                  {selectedProject.thumbnail ? (
                    <>
                      <img 
                        src={selectedProject.thumbnail} 
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-500 dark:from-gray-700 dark:to-gray-900">
                      <span className="text-9xl font-bold text-white/30 dark:text-gray-200/30">
                        {selectedProject.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-6 right-6 w-12 h-12 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-800 transition-all shadow-xl hover:scale-110 duration-300 group"
                  >
                    <FaTimes className="text-xl group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12">
                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    {selectedProject.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  {/* Tags */}
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wider flex items-center gap-2">
                      <div className="w-8 h-0.5 bg-gray-700 dark:bg-gray-300" />
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl border-2 border-transparent hover:border-gray-400 dark:hover:border-gray-600 hover:scale-105 transition-all duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-10">
                    <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-6 uppercase tracking-wider flex items-center gap-2">
                      <div className="w-8 h-0.5 bg-gray-700 dark:bg-gray-300" />
                      Key Features & Achievements
                    </h4>
                    <div className="grid gap-4">
                      {selectedProject.highlights.map((highlight: string, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors duration-300"
                        >
                          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 text-white dark:text-gray-900 flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-lg">
                            {idx + 1}
                          </span>
                          <p className="text-gray-700 dark:text-gray-300 pt-0.5 leading-relaxed">{highlight}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t-2 border-gray-200 dark:border-gray-800">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 group flex items-center justify-center gap-3 px-6 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-lg hover:shadow-2xl transform hover:scale-105 duration-300"
                      >
                        <FaGithub className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
                        <span>View on GitHub</span>
                      </a>
                    )}
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 group flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-100 dark:to-gray-300 text-white dark:text-gray-900 rounded-2xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                      >
                        <FaExternalLinkAlt className="text-xl group-hover:-translate-y-1 transition-transform duration-300" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Projects