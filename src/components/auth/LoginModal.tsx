import { useState } from 'react'
import { FaGoogle, FaGithub, FaTimes } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { signInWithGoogle, signInWithGithub } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo('.login-modal',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
      )
    }
  }, [isOpen])

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      await signInWithGoogle()
      onClose()
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google')
    } finally {
      setLoading(false)
    }
  }

  const handleGithubLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      await signInWithGithub()
      onClose()
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with GitHub')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="login-modal bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          aria-label="Close"
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to start chatting
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Login buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <FaGoogle className="text-xl text-red-500" />
            <span className="font-medium text-gray-700 dark:text-gray-200">
              {loading ? 'Signing in...' : 'Continue with Google'}
            </span>
          </button>

          <button
            onClick={handleGithubLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gray-900 dark:bg-gray-800 border-2 border-gray-900 dark:border-gray-700 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-750 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <FaGithub className="text-xl text-white" />
            <span className="font-medium text-white dark:text-gray-200">
              {loading ? 'Signing in...' : 'Continue with GitHub'}
            </span>
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

export default LoginModal
