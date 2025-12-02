import { FaHeart } from 'react-icons/fa'
import { personalInfo } from '../data/portfolio'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
            © {currentYear} {personalInfo.name}.All rights reserved.
          </p>
          
          <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
            Made with <FaHeart className="text-red-500" /> by {personalInfo.name}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer