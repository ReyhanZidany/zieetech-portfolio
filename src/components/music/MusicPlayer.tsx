import { useState } from 'react'
import { FaMusic, FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { HiMinusSm } from 'react-icons/hi'
import { useSpotify } from '../../contexts/SpotifyContext'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface MusicPlayerProps {
  isOpen: boolean
  onClose: () => void
}

const MusicPlayer = ({ isOpen, onClose }: MusicPlayerProps) => {
  const [isMinimized, setIsMinimized] = useState(false)
  const { currentTrack, isPlaying, isPaused, play, pause, resume, nextTrack, previousTrack, deviceId } = useSpotify()

  useGSAP(() => {
    if (isOpen && !isMinimized) {
      gsap.fromTo('.music-player',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
    }
  }, [isOpen, isMinimized])

  if (!isOpen) return null

  const handlePlayPause = () => {
    if (isPaused) {
      if (currentTrack) {
        resume()
      } else {
        // Play default playlist
        play('spotify:playlist:0ff84BCEJTHCFteGX5h59K')
      }
    } else {
      pause()
    }
  }

  return (
    <>
      {/* Minimized vinyl icon */}
      {isMinimized && (
        <div className="fixed bottom-20 md:bottom-6 left-6 z-50">
          <button
            onClick={() => setIsMinimized(false)}
            className="group relative w-14 h-14 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Expand music player"
          >
            {/* Vinyl disc */}
            <div className={`absolute inset-0 rounded-full border-4 border-gray-900 dark:border-white ${isPlaying ? 'animate-spin-slow' : ''}`}>
              <div className="absolute inset-3 rounded-full bg-gray-800 dark:bg-gray-100"></div>
              <div className="absolute inset-5 rounded-full bg-gray-900 dark:bg-white"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-600 dark:bg-gray-400"></div>
            </div>
            
            {/* Music note icon */}
            <FaMusic className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white dark:text-gray-900 text-xs z-10" />
          </button>
        </div>
      )}

      {/* Full player */}
      <div className={`fixed inset-0 z-50 md:items-end md:justify-start md:p-6 flex items-center justify-center md:pointer-events-none ${isMinimized ? 'pointer-events-none' : 'bg-black/50 md:bg-transparent'}`}>
        <div className={`music-player pointer-events-auto w-full h-auto md:w-[400px] bg-white dark:bg-gray-900 md:rounded-2xl shadow-2xl flex flex-col overflow-hidden border-0 md:border md:border-gray-200 md:dark:border-gray-800 transition-all duration-300 ${isMinimized ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}>
          {/* Header */}
          <div className="bg-gray-900 dark:bg-white p-4 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <FaMusic className="text-green-500 dark:text-green-600 text-lg" />
              <h3 className="text-white dark:text-gray-900 font-bold text-lg">Now Playing</h3>
            </div>
            <div className="flex items-center gap-2 relative z-50">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  setIsMinimized(true)
                }}
                className="text-white dark:text-gray-900 hover:bg-white/20 dark:hover:bg-gray-900/10 rounded-full p-3 transition-colors cursor-pointer relative z-50"
                aria-label="Minimize music player"
                style={{ touchAction: 'manipulation' }}
              >
                <HiMinusSm className="text-2xl pointer-events-none" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  onClose()
                }}
                className="text-white dark:text-gray-900 hover:bg-white/20 dark:hover:bg-gray-900/10 rounded-full p-3 transition-colors cursor-pointer relative z-50"
                aria-label="Close music player"
                style={{ touchAction: 'manipulation' }}
              >
                <IoClose className="text-2xl pointer-events-none" />
              </button>
            </div>
          </div>

          {/* Player Content */}
          <div className="p-6 bg-gray-50 dark:bg-gray-800">
            {!deviceId ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Connecting to Spotify...</p>
              </div>
            ) : currentTrack ? (
              <>
                {/* Album Art */}
                <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
                  {currentTrack.album.images[0] && (
                    <img 
                      src={currentTrack.album.images[0].url} 
                      alt={currentTrack.album.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Track Info */}
                <div className="text-center mb-6">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white truncate">{currentTrack.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {currentTrack.artists.map((artist: { name: string }) => artist.name).join(', ')}
                  </p>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={previousTrack}
                    className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Previous track"
                  >
                    <FaStepBackward className="text-gray-900 dark:text-white" />
                  </button>
                  
                  <button
                    onClick={handlePlayPause}
                    className="p-4 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
                    aria-label={isPaused ? 'Play' : 'Pause'}
                  >
                    {isPaused ? (
                      <FaPlay className="text-white text-xl ml-1" />
                    ) : (
                      <FaPause className="text-white text-xl" />
                    )}
                  </button>
                  
                  <button
                    onClick={nextTrack}
                    className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Next track"
                  >
                    <FaStepForward className="text-gray-900 dark:text-white" />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <FaMusic className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">No track playing</p>
                <button
                  onClick={() => play('spotify:playlist:0ff84BCEJTHCFteGX5h59K')}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors"
                >
                  Play Playlist
                </button>
              </div>
            )}
          </div>
        </div>

        <style>{`
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          .animate-spin-slow {
            animation: spin-slow 3s linear infinite;
          }
        `}</style>
      </div>
    </>
  )
}

export default MusicPlayer
