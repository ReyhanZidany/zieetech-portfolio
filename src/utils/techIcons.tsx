import React from 'react'
import type { IconType } from 'react-icons'
import { 
  SiPhp, SiTypescript, SiTailwindcss, SiExpress, SiSpringboot,
  SiMysql, SiOracle, SiFirebase, SiApachecouchdb,
  SiPostman, SiApachejmeter, SiKotlin
} from 'react-icons/si'
import { IoLogoJavascript } from 'react-icons/io'
import { FaPython, FaJava, FaReact, FaLaravel, FaNode, FaGitAlt, FaDocker } from 'react-icons/fa'

export const iconComponents: Record<string, IconType> = {
  'SiPhp': SiPhp,
  'IoLogoJavascript': IoLogoJavascript,
  'SiTypescript': SiTypescript,
  'FaPython': FaPython,
  'FaJava': FaJava,
  'SiKotlin': SiKotlin,
  'FaReact': FaReact,
  'SiTailwindcss': SiTailwindcss,
  'FaLaravel': FaLaravel,
  'FaNode':  FaNode,
  'SiExpress': SiExpress,
  'SiSpringboot': SiSpringboot,
  'SiMysql': SiMysql,
  'SiOracle': SiOracle,
  'SiFirebase':  SiFirebase,
  'SiApachecouchdb':  SiApachecouchdb,
  'FaGitAlt': FaGitAlt,
  'FaDocker': FaDocker,
  'SiPostman': SiPostman,
  'SiApachejmeter': SiApachejmeter,
}

export const iconColors:  Record<string, string> = {
  'SiPhp':  '#777BB4',
  'IoLogoJavascript':  '#F7DF1E',
  'SiTypescript':  '#3178C6',
  'FaPython': '#3776AB',
  'FaJava': '#ED8B00',
  'SiKotlin': '#7F52FF',
  'FaReact': '#61DAFB',
  'SiTailwindcss': '#06B6D4',
  'FaLaravel': '#FF2D20',
  'FaNode': '#339933',
  'SiExpress': '#000000',
  'SiSpringboot': '#6DB33F',
  'SiMysql': '#4479A1',
  'SiOracle': '#F80000',
  'SiFirebase': '#FFCA28',
  'SiApachecouchdb': '#E42528',
  'FaGitAlt': '#F05032',
  'FaDocker': '#2496ED',
  'SiPostman': '#FF6C37',
  'SiApachejmeter': '#D22128',
}

export const customIcons: Record<string, string> = {
  'hyperledger':  '/hyperledger-fabric-logo.png',
  'hyperledger fabric': '/hyperledger-fabric-logo.png',
  'ruby on rails': '/rails.png',
  'rest api': '/restapi.png',
}

export const nameToIcon: Record<string, string | null> = {
  'php':  'SiPhp',
  'javascript': 'IoLogoJavascript',
  'js': 'IoLogoJavascript',
  'typescript': 'SiTypescript',
  'ts': 'SiTypescript',
  'python': 'FaPython',
  'java': 'FaJava',
  'kotlin': 'SiKotlin',
  'react': 'FaReact',
  'react.js': 'FaReact',
  'reactjs': 'FaReact',
  'tailwind': 'SiTailwindcss',
  'tailwind css': 'SiTailwindcss',
  'tailwindcss': 'SiTailwindcss',
  'laravel': 'FaLaravel',
  'node': 'FaNode',
  'node.js': 'FaNode',
  'nodejs': 'FaNode',
  'express': 'SiExpress',
  'express.js': 'SiExpress',
  'expressjs': 'SiExpress',
  'spring boot': 'SiSpringboot',
  'springboot': 'SiSpringboot',
  'spring': 'SiSpringboot',
  'mysql': 'SiMysql',
  'oracle': 'SiOracle',
  'firebase': 'SiFirebase',
  'couchdb':  'SiApachecouchdb',
  'couch':  'SiApachecouchdb',
  'git': 'FaGitAlt',
  'docker': 'FaDocker',
  'postman': 'SiPostman',
  'jmeter':  'SiApachejmeter',
  'rest api': null,
  'ruby on rails': null,
}

export const getIconByName = (iconName: string): IconType | null => {
  return iconComponents[iconName] || null
}

export const getIconColor = (iconName:  string, isDark = false): string => {
  if (isDark && iconName === 'SiExpress') {
    return '#E5E7EB'
  }
  return iconColors[iconName] || '#6B7280'
}

export const hasCustomIcon = (techName:  string): boolean => {
  return techName.toLowerCase() in customIcons
}

export const getCustomIconPath = (techName: string): string | null => {
  return customIcons[techName.toLowerCase()] || null
}

export const renderIcon = (
  iconName: string, 
  className = '', 
  isDark = false
): React.ReactElement | null => {
  const IconComponent = getIconByName(iconName)
  if (!IconComponent) return null
  
  const color = getIconColor(iconName, isDark)
  return <IconComponent className={className} color={color} />
}

export const renderTechIcon = (
  techName: string, 
  className = '', 
  isDark = false
): React.ReactElement | null => {
  const lowerName = techName.toLowerCase()
  
  if (hasCustomIcon(lowerName)) {
    const path = getCustomIconPath(lowerName)
    return (
      <img 
        src={path! } 
        alt={techName} 
        className={`${className} object-contain`}
      />
    )
  }
  
  const iconName = nameToIcon[lowerName]
  if (!iconName) return null
  
  return renderIcon(iconName, className, isDark)
}

export const getSkillIcon = (techName: string) => {
  const lowerName = techName.toLowerCase()

  if (lowerName === 'hyperledger fabric' || lowerName === 'hyperledger') {
    return {
      isImage: true,
      imagePath: '/hyperledger-fabric-logo.png',
      color: null,
      icon:  null,
    }
  }

  if (hasCustomIcon(lowerName)) {
    return {
      isImage: true,
      imagePath: getCustomIconPath(lowerName),
      color: null,
      icon:  null,
    }
  }

  const iconName = nameToIcon[lowerName]
  if (iconName && iconName in iconComponents) {
    return {
      isImage:  false,
      imagePath: null,
      color: iconColors[iconName] || '#6B7280',
      icon: iconComponents[iconName],
    }
  }

  return {
    isImage: false,
    imagePath: null,
    color: '#6B7280',
    icon: null,
  }
}