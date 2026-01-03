import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaEye } from 'react-icons/fa'
import { ref, runTransaction, onValue } from 'firebase/database'
import { database } from '../firebase/config'

const VisitorCounter = () => {
  const [visitors, setVisitors] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const visitorRef = ref(database, 'visitorCount')
    
    // Check if user already visited this session
    const hasVisited = sessionStorage.getItem('hasVisited')
    
    if (!hasVisited) {
      // Increment the visitor count atomically
      runTransaction(visitorRef, (currentValue) => {
        return (currentValue || 0) + 1
      }).catch(err => {
        console.error('Error incrementing visitor count:', err)
      })
      
      // Mark as visited for this session
      sessionStorage.setItem('hasVisited', 'true')
    }
    
    // Listen to real-time updates
    const unsubscribe = onValue(visitorRef, (snapshot) => {
      const count = snapshot.val() || 0
      setVisitors(count)
      setLoading(false)
    }, (error) => {
      console.error('Error reading visitor count:', error)
      setLoading(false)
    })
    
    // Cleanup listener on unmount
    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-mono">
        <FaEye className="text-base opacity-70 animate-pulse" />
        <span>Loading...</span>
      </div>
    )
  }

  if (! visitors) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y:  0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-mono"
    >
      <FaEye className="text-base opacity-70" />
      <span>
        {visitors.toLocaleString()} {visitors === 1 ? 'visitor' : 'visitors'}
      </span>
    </motion.div>
  )
}

export default VisitorCounter