export const personalInfo = {
  name: 'Reyhan Zidany Jovianto',
  title: 'Crafting Seamless Experiences Across the Stack',
  subtitle: 'Fullstack Developer | Software Engineer | Blockchain Developer',
  email: 'reyzidan23@gmail.com',
  phone: '+6281298541085',
  location: 'Jakarta, Indonesia',
  github: 'ReyhanZidany',
  linkedin: 'https://linkedin.com/in/reyhanzidanyjovianto',
  spotify: 'https://open.spotify.com/user/21gqfh4lshux3ifxvfeirvpva?si=8b48f5a82c5d489f',
  instagram: 'https://instagram.com/reyhannzj',
  bio: "Computer Engineering student with hands-on experience in software development and IT infrastructure. Skilled in fullstack development (Laravel, Node.js, React) and distributed systems, with familiarity in enterprise system management, focusing on building reliable and scalable technology solutions.",
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
  gpa: '3.77/4.00',
}

export const experiences = [
  {
    id: 1,
    title: 'IT Infrastructure Development Intern',
    company: 'Indonesia Stock Exchange (IDX)',
    period: 'January 2025 - February 2025',
    location:  'Jakarta, Indonesia',
    type: 'Internship',
    logo: '/logo_idx.jpg',
    responsibilities: [
      'Gained hands-on experience in enterprise IT infrastructure with Sophos Firewall, Nutanix Core, and RHEL',
      'Developed expertise in server management and virtualization using VMware vCenter',
      'Implemented network monitoring solutions with Zabbix',
      'Managed blade servers and Logical Volume Manager (LVM) solutions',
    ],
  },
  {
    id: 2,
    title:  'Fullstack Developer Intern',
    company: 'PT. IPC Terminal Petikemas',
    period: 'June 2024 - August 2024',
    location: 'Jakarta, Indonesia',
    type:  'Internship',
    logo: '/pelindo_nobg.png',
    responsibilities:  [
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
    location:  'Remote',
    type: 'Training',
    logo: '/bangkit_logo.jpg',
    responsibilities: [
      'Participated in intensive Android development program using Kotlin',
      'Focused on mobile UI/UX design and Google Cloud technologies',
      'Completed collaborative capstone project with team members',
      'Developed soft skills:  problem-solving, teamwork, and leadership',
    ],
  },
]

export const projects = [
  {
    id: 1,
    title: 'ChainCarbon – Blockchain Carbon Marketplace',
    thumbnail: '/cb-ls.jpeg',
    description: 'Blockchain-based carbon certificate trading platform using Hyperledger Fabric with multi-organization network.',
    tags: ['Hyperledger Fabric', 'Node.js', 'React.js', 'MySQL', 'CouchDB'],
    githubUrl:  'https://github.com/ReyhanZidany/ChainCarbon',
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
    title:  'StockHub – Enterprise Resource Planning (ERP)',
    thumbnail: '/stockhub-ls.jpeg',
    description: 'Comprehensive ERP solution designed for efficient inventory management with decoupled architecture featuring React frontend and Rails API backend.',
    tags: ['React.js', 'Ruby on Rails', 'JavaScript', 'Docker', 'REST API'],
    githubUrl:  'https://github.com/ReyhanZidany/StockHub',
    demoUrl: 'https://stockkhub.vercel.app',
    highlights: [
      'Built comprehensive supplier management system with vendor tracking',
      'Developed real-time dashboard analytics with interactive data visualization',
      'Containerized application using Docker',
      'Designed RESTful API architecture for seamless frontend-backend communication',
    ],
  },
  {
    id: 3,
    title: 'DipoHelp – Service Management Platform',
    thumbnail: '/dh-ls.jpeg',
    description: 'Integrated service platform for Diponegoro University providing streamlined access to IT support, facilities, academic services, and student activities.',
    tags: ['Laravel', 'Tailwind CSS', 'PHP', 'MySQL', 'JavaScript'],
    githubUrl: 'https://github.com/ReyhanZidany/DipoHelp',
    demoUrl:  '',
    highlights: [
      'Built multi-category service system (Academic, Finance, IT, Facilities, Student Affairs)',
      'Developed comprehensive ticketing system with automated routing',
      'Created help center with FAQ, tutorials, and user guides',
      'Integrated social media feeds from official university accounts',
      'Designed responsive UI with Tailwind CSS for optimal user experience',
    ],
  },
  {
    id: 4,
    title: 'Mr. Beans – Coffee E-Commerce Platform',
    thumbnail: '/mrbeans. png',
    description: 'Modern e-commerce web application for browsing and ordering coffee products with dynamic API integration and responsive design.',
    tags: ['React.js', 'Firebase', 'Tailwind CSS', 'REST API'],
    githubUrl: 'https://github.com/ReyhanZidany/MrBeans',
    demoUrl: 'https://mrbeans-coffee.web.app',
    highlights: [
      'Built responsive e-commerce interface with React.js and Tailwind CSS',
      'Integrated Fake Coffee API for dynamic product data fetching',
      'Implemented shopping cart functionality with add-to-cart features',
      'Deployed on Firebase with optimized performance',
      'Designed clean, modern UI supporting all screen sizes',
    ],
  },
  {
    id: 5,
    title: 'Helpdesk Management System',
    thumbnail: '/landscape-ticket.png',
    description: 'Full-featured helpdesk ticketing system for PT.  IPC Terminal Petikemas with PIC assignment and history logging.',
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
    id: 6,
    title: 'Dopamind+ - Android Mobile App',
    thumbnail: '/dopamind-landscape.jpg',
    description: 'Mobile application developed during Bangkit Academy using Kotlin with MVVM architecture and cloud integration.',
    tags: ['Kotlin', 'Firebase'],
    githubUrl: 'https://github.com/DopamindPlus',
    demoUrl:  '',
    highlights: [
      'Implemented MVVM architecture and local caching',
      'Developed UI/UX using Jetpack & Material Design',
      'Integrated cloud-based API for authentication',
      'Applied Android development best practices',
    ],
  },
]

export const skills = [
  { name: 'PHP', icon: 'SiPhp', category: 'languages' },
  { name:  'JavaScript', icon: 'IoLogoJavascript', category: 'languages' },
  { name: 'TypeScript', icon: 'SiTypescript', category: 'languages' },
  { name: 'Python', icon: 'FaPython', category: 'languages' },
  { name: 'Java', icon: 'FaJava', category: 'languages' },
  { name: 'Kotlin', icon: 'SiKotlin', category:  'languages' },

  { name:  'React.js', icon: 'FaReact', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'SiTailwindcss', category:  'frontend' },
  
  { name:  'Laravel', icon: 'FaLaravel', category:  'backend' },
  { name: 'Node.js', icon: 'FaNode', category: 'backend' },
  { name: 'Express', icon: 'SiExpress', category: 'backend' },
  { name: 'Spring Boot', icon: 'SiSpringboot', category: 'backend' },

  { name: 'Hyperledger Fabric', icon:  'SiHyperledger', category: 'blockchain' },
  
  { name: 'MySQL', icon: 'SiMysql', category: 'database' },
  { name: 'Oracle', icon: 'SiOracle', category: 'database' },
  { name: 'Firebase', icon: 'SiFirebase', category: 'database' },
  { name:  'CouchDB', icon:  'SiApachecouchdb', category: 'database' },
  
  { name: 'Git', icon: 'FaGitAlt', category: 'tools' },
  { name: 'Docker', icon: 'FaDocker', category: 'tools' },
  { name: 'Postman', icon: 'SiPostman', category: 'tools' },
  
  { name: 'JMeter', icon: 'SiApachejmeter', category: 'testing' },
]

export const organizations = [
  {
    id: 1,
    title: 'Staff of Interests, Talents, & Hobbies Department',
    organization: 'Himpunan Mahasiswa Teknik Komputer, Universitas Diponegoro',
    period: 'August 2023 - April 2025',
    logo: 'himaskom.png',
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