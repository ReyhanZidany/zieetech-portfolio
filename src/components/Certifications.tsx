import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { certifications } from '../data/portfolio'
import { FaExternalLinkAlt, FaFilePdf } from 'react-icons/fa'

const Certifications = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const groupedCerts = certifications.reduce((acc: any, cert) => {
    if (!acc[cert.issuer]) {
      acc[cert.issuer] = []
    }
    acc[cert.issuer].push(cert)
    return acc
  }, {})

  return (
    <section id="certifications" className="py-12 px-6" ref={ref}>
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y:  20 }}
          animate={inView ? { opacity: 1, y: 0 } :  {}}
          transition={{ duration:  0.5 }}
        >
          <p className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-8">Certifications</p>

          <div className="space-y-10">
            {Object.entries(groupedCerts).map(([issuer, certs]:  [string, any], index) => (
              <motion.div
                key={issuer}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={certs[0].logo} 
                    alt={issuer}
                    className="w-8 h-8 rounded object-contain"
                  />
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    {issuer}
                  </h3>
                </div>

                <ul className="space-y-3 ml-11">
                  {certs.map((cert:  any, idx: number) => (
                    <li 
                      key={idx}
                      className="group flex items-start justify-between gap-4"
                    >
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {cert.name}
                      </span>
                      
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                          aria-label="View credential"
                        >
                          <FaExternalLinkAlt className="text-xs" />
                        </a>
                      )}
                      {cert.certificatePDF && (
                        <a
                          href={cert.certificatePDF}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                          aria-label="View PDF"
                        >
                          <FaFilePdf className="text-xs" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>

                {index < Object.keys(groupedCerts).length - 1 && (
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

export default Certifications