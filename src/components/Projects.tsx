import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { projects } from '../data/portfolio'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { getSkillIcon } from '../utils/techIcons'

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold:  0.1 })

  return (
    <section id="projects" className="py-12 px-6" ref={ref}>
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y:  20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration:  0.5 }}
        >
          {/* Section Label */}
          <p className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-8">Projects</p>

          {/* Projects List */}
          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex flex-col gap-3">
                  {/* Title & Links */}
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                          aria-label="GitHub"
                        >
                          <FaGithub className="text-lg" />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                          aria-label="Live Demo"
                        >
                          <FaExternalLinkAlt className="text-base" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack with Icons */}
                  <div className="flex flex-wrap gap-2 items-center">
                    {project.tags.map((tech) => {
                      const { icon: Icon, color, isImage, imagePath } = getSkillIcon(tech)
                      
                      return (
                        <div
                          key={tech}
                          className="flex items-center gap-1.5 px-2.5 py-1"
                          title={tech}
                        >
                          {/* Only show icon container if there's an icon */}
                          {(isImage || Icon) && (
                            <div className="w-3.5 h-3.5 flex items-center justify-center">
                              {isImage && imagePath ?  (
                                <img 
                                  src={imagePath} 
                                  alt={tech}
                                  className="w-full h-full object-contain"
                                />
                              ) : Icon ? (
                                <Icon className="text-sm" style={{ color }} />
                              ) : null}
                            </div>
                          )}
                          <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
                            {tech}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Divider */}
                {index < projects.length - 1 && (
                  <div className="mt-8 h-px bg-gray-200 dark:bg-gray-800"></div>
                )}
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects