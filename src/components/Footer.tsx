import VisitorCounter from './VisitorCounter'

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-content mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 Reyhan Zidany Jovianto. All rights reserved.
          </p>
          
          {/* Visitor Counter */}
          <VisitorCounter />
        </div>
      </div>
    </footer>
  )
}

export default Footer