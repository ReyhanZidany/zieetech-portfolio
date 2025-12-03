export const personalInfo = {
  name: 'Reyhan Zidany Jovianto',
  title: 'Crafting Seamless Experiences Across the Stack',
  subtitle: 'Fullstack Developer | Software Engineer | Blockchain Developer',
  email: 'reyzidan23@gmail.com',
  phone: '+6281298541085',
  location: 'Jakarta, Indonesia',
  bio: "I turn ideas into scalable digital solutions. With hands-on experience across fullstack web development, mobile apps, and enterprise infrastructure, I thrive on solving complex problems and shipping products that matter. Whether it's building web applications, developing mobile solutions, or managing critical systems, I deliver real impact through code.",
  resumeUrl: '/resume.pdf',
}

export const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/ReyhanZidany', icon: 'FaGithub' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/reyhanzidanyjovianto', icon: 'FaLinkedin' },
  { name: 'Email', url: 'mailto:reyzidan23@gmail. com', icon: 'FaEnvelope' },
]

export const education = {
  university: 'Diponegoro University',
  degree: 'Bachelor of Engineering - Computer Engineering',
  location: 'Semarang, Indonesia',
  period: '2022 - Present',
  gpa: '3.75/4.00',
}

export const experiences = [
  {
    id: 1,
    title: 'IT Infrastructure Development Intern',
    company: 'Indonesia Stock Exchange (IDX)',
    period: 'January 2025 - February 2025',
    location: 'Jakarta, Indonesia',
    type: 'Internship',
    responsibilities: [
      'Gained hands-on experience in enterprise IT infrastructure with Sophos Firewall, Nutanix Core, and RHEL',
      'Developed expertise in server management and virtualization using VMware vCenter',
      'Implemented network monitoring solutions with Zabbix',
      'Managed blade servers and Logical Volume Manager (LVM) solutions',
    ],
  },
  {
    id: 2,
    title: 'Fullstack Developer Intern',
    company: 'PT. IPC Terminal Petikemas',
    period: 'June 2024 - August 2024',
    location: 'Jakarta, Indonesia',
    type: 'Internship',
    responsibilities: [
      'Developed responsive helpdesk web application using Laravel and JavaScript',
      'Designed and managed MySQL databases for efficient data storage',
      'Created comprehensive technical documentation for features and modules',
      'Collaborated with team to improve UI/UX and system functionality',
    ],
  },
  {
    id: 3,
    title: 'Mobile Development Cohort',
    company: 'Bangkit Academy (Google, Tokopedia, Gojek, Traveloka)',
    period: 'September 2024 - December 2024',
    location: 'Remote',
    type: 'Training',
    responsibilities: [
      'Participated in intensive Android development program using Kotlin',
      'Focused on mobile UI/UX design and Google Cloud technologies',
      'Completed collaborative capstone project with team members',
      'Developed soft skills: problem-solving, teamwork, and leadership',
    ],
  },
]

export const projects = [
  {
    id: 1,
    title: 'ChainCarbon – Blockchain Carbon Marketplace',
    thumbnail: '/cb-ls.jpeg',
    description: 'Blockchain-based carbon certificate trading platform using Hyperledger Fabric with multi-organization network.',
    tags: ['Hyperledger Fabric', 'Node.js', 'React', 'MySQL', 'CouchDB'],
    githubUrl: 'https://github.com/ReyhanZidany',
    demoUrl: '',
    highlights: [
      'Developed smart contracts for certificate creation, trading, and retirement',
      'Designed multi-org network (Buyer, Seller, Regulator) with endorsement policies',
      'Implemented REST API gateway and MySQL off-chain sync',
      'Load testing with JMeter: avg response 2.0–2.6s (p80–p100)',
    ],
  },
  {
    id: 2,
    title: 'DipoHelp – Service Management Platform',
    thumbnail: 'dh-ls.jpeg',
    description: 'Integrated service platform for Diponegoro University providing streamlined access to IT support, facilities, academic services, and student activities.',
    tags: ['Laravel', 'Tailwind CSS', 'PHP', 'MySQL', 'Amazon S3'],
    githubUrl: 'https://github.com/ReyhanZidany/DipoHelp',
    demoUrl: '',
    highlights: [
      'Built multi-category service system (Academic, Finance, IT, Facilities, Student Affairs)',
      'Developed comprehensive ticketing system with automated routing',
      'Created help center with FAQ, tutorials, and user guides',
      'Integrated social media feeds from official university accounts',
      'Designed responsive UI with Tailwind CSS for optimal user experience',
    ],
  },
  {
    id: 3,
    title: 'Helpdesk Management System',
    thumbnail: '/landscape-ticket.png',
    description: 'Full-featured helpdesk ticketing system for PT. IPC Terminal Petikemas with PIC assignment and history logging.',
    tags: ['Laravel', 'Tailwind CSS', 'JavaScript', 'MySQL'],
    githubUrl: 'https://github.com/ReyhanZidany/ServiceNow',
    demoUrl: '',
    highlights: [
      'Built complete ticketing system with PIC assignment',
      'Implemented image upload and history logs',
      'Designed database structure used by internal team',
      'Improved UI flow and added maintenance documentation',
    ],
  },
  {
    id: 4,
    title: 'Android Mobile App – Bangkit',
    thumbnail: '/dopamind-landscape.jpg',
    description: 'Mobile application developed during Bangkit Academy using Kotlin with MVVM architecture and cloud integration.',
    tags: ['Kotlin', 'Firebase', 'Retrofit', 'MVVM'],
    githubUrl: 'https://github.com/DopamindPlus',
    demoUrl: '',
    highlights: [
      'Implemented MVVM architecture and local caching',
      'Developed UI/UX using Jetpack & Material Design',
      'Integrated cloud-based API for authentication',
      'Applied Android development best practices',
    ],
  },
]

export const skills = [
  // Programming Languages
  { name: 'PHP', icon: 'SiPhp', category: 'languages' },
  { name: 'JavaScript', icon: 'IoLogoJavascript', category: 'languages' },
  { name: 'TypeScript', icon: 'SiTypescript', category: 'languages' },
  { name: 'Python', icon: 'FaPython', category: 'languages' },
  { name: 'Java', icon: 'FaJava', category: 'languages' },
  { name: 'Kotlin', icon: 'SiKotlin', category: 'languages' },

    // Frontend
  { name: 'React.js', icon: 'FaReact', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'SiTailwindcss', category: 'frontend' },
  
  // Backend
  { name: 'Laravel', icon: 'FaLaravel', category: 'backend' },
  { name: 'Node.js', icon: 'FaNode', category: 'backend' },
  { name: 'Express', icon: 'SiExpress', category: 'backend' },
  { name: 'Spring Boot', icon: 'SiSpringboot', category: 'backend' },

  // Blockchain
  { name: 'Hyperledger Fabric', icon: 'SiHyperledger', category: 'blockchain' },
  
  // Database
  { name: 'MySQL', icon: 'SiMysql', category: 'database' },
  { name: 'Oracle', icon: 'SiOracle', category: 'database' },
  { name: 'Firebase', icon: 'SiFirebase', category: 'database' },
  { name: 'CouchDB', icon: 'SiApachecouchdb', category: 'database' },
  
  // DevOps & Tools
  { name: 'Git', icon: 'FaGitAlt', category: 'tools' },
  { name: 'Docker', icon: 'FaDocker', category: 'tools' },
  { name: 'Postman', icon: 'SiPostman', category: 'tools' },
  
  // Testing
  { name: 'JMeter', icon: 'SiApachejmeter', category: 'testing' },
]

export const organizations = [
  {
    id: 1,
    title: 'Staff of Interests, Talents, & Hobbies Department',
    organization: 'Himpunan Mahasiswa Teknik Komputer, Universitas Diponegoro',
    period: 'August 2023 - April 2025',
    logo: 'himaskom-nobg.png',
    achievements: [
      'Led Rembug UKM inauguration event for student activity unit leaders',
      'Coordinated field operations for THE ACE 2024 anniversary event',
      'Managed Event Division of POR Tekkom annual sports week',
    ],
  },
  {
    id: 2,
    title: 'Core Staff - Software Division',
    organization: 'Computer Engineering Research Club',
    period: 'May 2023 - October 2025',
    logo: '/cerc-logo.png',
    achievements: [
      'Learned JavaScript, Node.js, and API development',
      'Taught backend development to peers',
      'Collaborated on research-based projects',
    ],
  },
  {
    id: 3,
    title: 'Staff',
    organization: 'Google Developer Student Clubs',
    period: 'July 2023 - June 2024',
    logo: '/gdsc.png',
    achievements: [
      'Participated in workshops on Front-End and Back-End Development',
      'Explored React, Laravel, and Node.js frameworks',
      'Built project prototypes applying development best practices',
    ],
  },
]

export const certifications = [
  { name: 'Cisco – IT Essentials',
    issuer: 'Cisco', 
    credentialUrl: 'https://www.credly.com/badges/f32a708c-abd3-45c6-a11b-102443902117',
    logo: '/cisco.png' 
  },
  { name: 'CCNA Intro to Networks', 
    issuer: 'Cisco', 
    credentialUrl: 'https://www.credly.com/badges/06bdd403-0fa7-497b-b50a-cd2e9ba962ba',
    logo: '/cisco.png'  
  },
  { name: 'CCNAv7: Switching, Routing, and Wireless Essentials', 
    issuer: 'Cisco', 
    credentialUrl: 'https://www.credly.com/badges/9ed766d2-752c-4ec1-938e-5fdc75b4cbbd',
    logo: '/cisco.png'  
  },
  { name: 'Database Design', 
    issuer: 'Oracle', 
    certificatePDF: '/certificates/Oracle_Certificate.pdf',
    logo: '/oracle.png'  
  },
  { name: 'Database Foundation', 
    issuer: 'Oracle', 
    certificatePDF: '/certificates/Oracle_Certificate.pdf',
    logo: '/oracle.png'  
  },
  { name: 'Kotlin Programming', 
    issuer: 'Dicoding', 
    credentialUrl: 'https://www.dicoding.com/certificates/NVP74G79VPR0',
    logo: '/dicoding.png'  
  },
  { name: 'Android Basic & Fundamentals', 
    issuer: 'Dicoding', 
    credentialUrl: 'https://www.dicoding.com/certificates/81P244DYJZOY',
    logo: '/dicoding.png'  
  },
  { name: 'Machine Learning for Android', 
    issuer: 'Dicoding', 
    credentialUrl: 'https://www.dicoding.com/certificates/4EXG7J2DEPRL',
    logo: '/dicoding.png'  
  },
  { name: 'Python for Software Development', 
    issuer: 'Progate', 
    certificatePDF: '/certificates/python_certificate.pdf',
    logo: '/progate.jpg' 
  },
]