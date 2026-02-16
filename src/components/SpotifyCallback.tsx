import { useEffect } from 'react'
import { parseCallback } from '../services/spotifyAuth'

const SpotifyCallback = () => {
  useEffect(() => {
    const handleCallback = async () => {
      const { accessToken, error } = await parseCallback()

      if (error) {
        console.error('Spotify auth error:', error)
        window.location.href = '/'
        return
      }

      if (accessToken) {
        // Clear hash from URL
        window.history.replaceState(null, '', window.location.pathname)
        // Redirect back to home
        window.location.href = '/'
      }
    }

    handleCallback()
  }, [])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Connecting to Spotify...</p>
      </div>
    </div>
  )
}

export default SpotifyCallback
