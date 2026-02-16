import { useState } from 'react'
import { FaMusic, FaComments, FaPlus, FaTimes } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import { useSpotify } from '../contexts/SpotifyContext'
import LoginModal from './auth/LoginModal'
import ChatWindow from './chat/ChatWindow'
import MusicPlayer from './music/MusicPlayer'

const FloatingMenu = () => {
  const { user } = useAuth()
  const { isAuthenticated: isSpotifyAuth, login: spotifyLogin } = useSpotify()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showMusic, setShowMusic] = useState(false)

  const handleChatClick = () => {
    setIsMenuOpen(false)
    if (!user) {
      setShowLogin(true)
    } else {
      setShowChat(true)
    }
  }

  const handleMusicClick = () => {
    setIsMenuOpen(false)
    if (!isSpotifyAuth) {
      // Redirect to Spotify login
      spotifyLogin()
    } else {
      setShowMusic(true)
    }
  }

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-20 md:bottom-6 right-6 z-40 flex flex-col-reverse items-end gap-3">
        {/* Menu Options - appear when menu is open */}
        {isMenuOpen && (
          <>
            {/* Music Button */}
            <button
              onClick={handleMusicClick}
              className="w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group animate-scale-in"
              aria-label="Open music player"
            >
              <FaMusic className="text-xl group-hover:scale-110 transition-transform" />
            </button>

            {/* Chat Button */}
            <button
              onClick={handleChatClick}
              className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group animate-scale-in"
              aria-label="Open chat"
            >
              <FaComments className="text-xl group-hover:scale-110 transition-transform" />
            </button>
          </>
        )}

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-14 h-14 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? (
            <FaTimes className="text-2xl group-hover:rotate-90 transition-transform duration-300" />
          ) : (
            <FaPlus className="text-2xl group-hover:rotate-90 transition-transform duration-300" />
          )}
          
          {/* Pulse animation when closed */}
          {!isMenuOpen && (
            <span className="absolute inset-0 rounded-full bg-gray-900 dark:bg-white animate-ping opacity-20" />
          )}
        </button>
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />

      {/* Chat Window */}
      {user && <ChatWindow isOpen={showChat} onClose={() => setShowChat(false)} />}

      {/* Music Player */}
      <MusicPlayer isOpen={showMusic} onClose={() => setShowMusic(false)} />

      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </>
  )
}

export default FloatingMenu
