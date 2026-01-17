import { useRef } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { personalInfo, socialLinks, skills } from '../data/portfolio'
import { iconComponents, iconColors, customIcons } from '../utils/techIcons'
import ScrollVelocity from './ScrollVelocity'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const SkillCard = ({ skill }: { skill: any }) => {
  const Icon = iconComponents[skill.icon]
  const color = iconColors[skill.icon] || '#6B7280'
  const isHyperledgerFabric = skill.name === 'Hyperledger Fabric'
  const isCustom = !isHyperledgerFabric && skill.name.toLowerCase() in customIcons

  return (
    <div className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-200">
      <div className="w-5 h-5 flex items-center justify-center">
        {isHyperledgerFabric ? (
          <img
            src="/hyperledger-fabric-logo.png"
            alt="Hyperledger Fabric"
            className="w-full h-full object-contain"
          />
        ) : isCustom ? (
          <img
            src={customIcons[skill.name.toLowerCase()]}
            alt={skill.name}
            className="w-full h-full object-contain opacity-70 dark:invert"
          />
        ) : Icon ? (
          <Icon className="text-lg" style={{ color }} />
        ) : null}
      </div>
      <span className="text-xs font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap font-mono">
        {skill.name}
      </span>
    </div>
  )
}

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null)

  const socialIconComponents: { [key: string]: any } = {
    FaGithub,
    FaLinkedin,
    FaEnvelope,
  }

  const midPoint = Math.ceil(skills.length / 2)
  const topRowSkills = skills.slice(0, midPoint)
  const bottomRowSkills = skills.slice(midPoint)
  const row1 = (
    <div className="flex gap-2.5 px-1.5">
      {topRowSkills.map((skill, i) => (
        <SkillCard key={`top-${i}`} skill={skill} />
      ))}
    </div>
  )

  const row2 = (
    <div className="flex gap-2.5 px-1.5">
      {bottomRowSkills.map((skill, i) => (
        <SkillCard key={`bottom-${i}`} skill={skill} />
      ))}
    </div>
  )

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    tl.fromTo(".hero-title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(".hero-subtitle",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(".hero-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(".hero-social a",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.4"
      )
      .fromTo(".hero-scroll",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.2"
      )

  }, { scope: containerRef })

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-6 pt-12 pb-12" ref={containerRef}>
      <div className="max-w-content mx-auto w-full mb-12">
        <div>
          <h1 className="hero-title text-5xl md:text-6xl font-bold tracking-tight mb-4 opacity-0">
            {personalInfo.name}
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6 font-mono opacity-0">
            {personalInfo.title}
          </p>

          <p className="hero-desc text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-2xl opacity-0">
            Computer Engineering student passionate about building scalable solutions.
            Experienced in{' '}
            <span className="text-gray-900 dark:text-white font-medium">fullstack development</span>
            ,{' '}
            <span className="text-gray-900 dark:text-white font-medium">blockchain technology</span>
            , and creating seamless digital experiences across the stack.
          </p>

          <div className="hero-social flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = socialIconComponents[social.icon]
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors opacity-0"
                  aria-label={social.name}
                >
                  <Icon className="text-xl" />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center hero-scroll opacity-0">
        <div
          className="max-w-2xl w-full relative overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 95%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 95%, transparent 100%)'
          }}
        >
          <ScrollVelocity
            rows={[row1, row2]}
            velocity={-100}
            className="custom-scroll-text"
            numCopies={4}
            velocityMapping={{ input: [0, 1000], output: [0, 1] }}
          />

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-black to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-black to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
