import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import { personalInfo } from '../data/portfolio'
import { FaGithub, FaLinkedin, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'

interface ContactForm {
  name: string
  email: string
  message: string
}

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>()

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'a7b31cc3-4959-4ce3-887c-1ed989300e3e',
          name: data.name,
          email: data.email,
          message: data.message,
          from_name: 'Portfolio Contact',
        })
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        reset()
        setTimeout(() => setSubmitStatus(null), 5000)
      } else {
        throw new Error('Failed')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-12 px-6" ref={ref}>
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-12">
            <p className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-4">Contact</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Let's build something together
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-lg">
              Have a project in mind or just want to chat? Drop me a message or reach out through social media.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              {/* Email */}
              <div>
                <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-2">EMAIL</p>
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="text-lg text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors font-mono"
                >
                  {personalInfo.email}
                </a>
              </div>

              {/* Social */}
              <div>
                <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-3">SOCIALS</p>
                <div className="flex gap-4">
                  <a
                    href={`https://github.com/${personalInfo.github || 'ReyhanZidany'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
                  >
                    <FaGithub className="text-xl" />
                    <span className="text-sm font-mono group-hover:underline underline-offset-4">GitHub</span>
                  </a>
                  <a
                    href={personalInfo.linkedin || 'https://linkedin.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
                  >
                    <FaLinkedin className="text-xl" />
                    <span className="text-sm font-mono group-hover:underline underline-offset-4">LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Location */}
              <div>
                <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-2">LOCATION</p>
                <p className="text-gray-900 dark:text-white font-mono">{personalInfo.location}</p>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <input
                  {...register('name', { required: 'Name required' })}
                  type="text"
                  placeholder="Name"
                  className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 dark:border-gray-800 focus:border-gray-900 dark:focus:border-white focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 transition-colors font-mono"
                />
                {errors.name && (
                  <p className="mt-2 text-xs text-red-500 font-mono">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  {...register('email', {
                    required: 'Email required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email',
                    },
                  })}
                  type="email"
                  placeholder="Email"
                  className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 dark:border-gray-800 focus:border-gray-900 dark:focus:border-white focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 transition-colors font-mono"
                />
                {errors.email && (
                  <p className="mt-2 text-xs text-red-500 font-mono">{errors.email.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <textarea
                  {...register('message', {
                    required: 'Message required',
                    minLength:  { value: 10, message:  'Min 10 characters' },
                  })}
                  rows={4}
                  placeholder="Message"
                  className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 dark:border-gray-800 focus:border-gray-900 dark:focus:border-white focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 resize-none transition-colors font-mono"
                />
                {errors.message && (
                  <p className="mt-2 text-xs text-red-500 font-mono">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-mono text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-none border-2 border-gray-900 dark:border-white"
              >
                {isSubmitting ? (
                  <span>SENDING...</span>
                ) : (
                  <>
                    <span>SEND MESSAGE</span>
                    <FaPaperPlane className="text-xs" />
                  </>
                )}
              </button>

              {/* Status Message */}
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 border-2 ${
                    submitStatus === 'success'
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-red-500 bg-red-500/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {submitStatus === 'success' ?  (
                      <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    ) : (
                      <FaExclamationCircle className="text-red-500 flex-shrink-0" />
                    )}
                    <p className={`text-sm font-mono ${
                      submitStatus === 'success' ?  'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                    }`}>
                      {submitStatus === 'success'
                        ? 'Message sent successfully!'
                        : 'Failed to send. Try email instead.'}
                    </p>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact