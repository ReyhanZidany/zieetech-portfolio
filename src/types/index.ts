export interface NavLink {
  name: string
  href: string
}

export interface Skill {
  name: string
  icon: string
  category: 'frontend' | 'backend' | 'tools'
}

export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  demoUrl?: string
  githubUrl?: string
}

export interface Service {
  id: number
  title: string
  description: string
  icon: string
  features: string[]
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}