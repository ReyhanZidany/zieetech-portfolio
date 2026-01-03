import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { personalInfo, education } from '../data/portfolio'

const About = () => {
  const [ref, inView] = useInView({ triggerOnce:  true, threshold: 0.1 })

  return (
    <section id="about" className="py-4 px-6" ref={ref}>
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-8">About</p>

          <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              I'm a fullstack developer and software engineer based in{' '}
              <span className="text-gray-900 dark:text-white font-medium">Jakarta, Indonesia</span>.
              Currently pursuing my degree in Computer Engineering while building production-ready 
              applications and distributed systems.
            </p>
            
            <p>
              My expertise spans across the entire stack from crafting responsive frontends with{' '}
              <span className="text-gray-900 dark:text-white font-medium">React</span> to building 
              robust backends using{' '}
              <span className="text-gray-900 dark:text-white font-medium">Laravel</span> and{' '}
              <span className="text-gray-900 dark:text-white font-medium">Node.js</span>.
              I'm particularly passionate about blockchain technology and creating scalable, 
              reliable solutions that solve real-world problems.
            </p>

            <p>
              Beyond development, I have hands-on experience with IT infrastructure and 
              enterprise system management. I believe in writing clean, maintainable code 
              and continuously learning emerging technologies. You can explore my work on{' '}
              <a 
                href={`https://github.com/${personalInfo.github || 'ReyhanZidany'}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-white hover:underline underline-offset-4"
              >
                GitHub
              </a>
              {' '}where I contribute to open-source projects and share my experiments.
            </p>

            <p>
              When I'm not coding, you'll find me vibing to{' '}
              <a 
                href={personalInfo.spotify || 'https://open.spotify.com'}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-white hover:underline underline-offset-4"
              >
                music
              </a>
              , dropping{' '}
              <a 
                href={personalInfo.instagram || 'https://instagram.com'}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-white hover:underline underline-offset-4"
              >
                photo dumps
              </a>
              , or geeking out over distributed systems and blockchain architectures. 
            </p>
          </div>

          <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-start gap-4">
              <img 
                src="/logo_undip.png" 
                alt="UNDIP" 
                className="w-12 h-12 rounded-lg object-contain"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {education.degree}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {education.university}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1 font-mono">
                  {education.period} · GPA {education.gpa}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About