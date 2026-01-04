import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaEye } from 'react-icons/fa'
import { ref, runTransaction, onValue, push, set } from 'firebase/database'
import { database } from '../firebase/config'

const VisitorCounter = () => {
  const [visitors, setVisitors] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  const getDeviceInfo = () => {
    const ua = navigator.userAgent
    let device = 'Unknown'
    let os = 'Unknown'
    let browser = 'Unknown'

    // Detect Device
    if (/mobile/i.test(ua)) device = 'Mobile'
    else if (/tablet/i.test(ua)) device = 'Tablet'
    else device = 'Desktop'

    // Detect OS
    if (/windows/i.test(ua)) os = 'Windows'
    else if (/mac/i.test(ua)) os = 'MacOS'
    else if (/linux/i.test(ua)) os = 'Linux'
    else if (/android/i.test(ua)) os = 'Android'
    else if (/iphone|ipad/i.test(ua)) os = 'iOS'

    // Detect Browser
    if (/chrome/i.test(ua) && !/edg/i.test(ua)) browser = 'Chrome'
    else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari'
    else if (/firefox/i.test(ua)) browser = 'Firefox'
    else if (/edg/i.test(ua)) browser = 'Edge'

    return { device, os, browser }
  }

  useEffect(() => {
    const visitorRef = ref(database, 'visitorCount')
    const visitorLogsRef = ref(database, 'visitorLogs')
    
    const hasVisited = sessionStorage.getItem('hasVisited')
    
    if (!hasVisited) {
      // Increment counter
      runTransaction(visitorRef, (currentValue) => {
        return (currentValue || 0) + 1
      }).catch(err => {
        console. error('Error incrementing visitor count:', err)
      })

      // Log visitor details
      const deviceInfo = getDeviceInfo()
      const visitorData = {
        timestamp: new Date().toISOString(),
        device: deviceInfo.device,
        os: deviceInfo.os,
        browser: deviceInfo.browser,
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        referrer: document.referrer || 'Direct'
      }

      // Push to logs
      const newLogRef = push(visitorLogsRef)
      set(newLogRef, visitorData).catch(err => {
        console.error('Error logging visitor:', err)
      })
      
      sessionStorage.setItem('hasVisited', 'true')
    }
    
    const unsubscribe = onValue(visitorRef, (snapshot) => {
      const count = snapshot. val() || 0
      setVisitors(count)
      setLoading(false)
    }, (error) => {
      console.error('Error reading visitor count:', error)
      setLoading(false)
    })
    
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
      animate={{ opacity:  1, y:  0 }}
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