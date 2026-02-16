import { useState } from 'react'
import { FaComments } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import LoginModal from '../auth/LoginModal'
import ChatWindow from './ChatWindow'

const ChatButton = () => {
  const { user } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const handleClick = () => {
    if (!user) {
      setShowLogin(true)
    } else {
      setShowChat(true)
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={handleClick}
        className="fixed bottom-20 md:bottom-6 right-6 z-40 w-14 h-14 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Open chat"
      >
        <FaComments className="text-2xl group-hover:scale-110 transition-transform" />
        
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-gray-900 dark:bg-white animate-ping opacity-20" />
      </button>

      {/* Login Modal */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />

      {/* Chat Window */}
      {user && <ChatWindow isOpen={showChat} onClose={() => setShowChat(false)} />}
    </>
  )
}

export default ChatButton
