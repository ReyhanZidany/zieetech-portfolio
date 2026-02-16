import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { getAccessToken, clearAccessToken, isAuthenticated, getAuthUrl } from '../services/spotifyAuth'
import '../types/spotify.d.ts'

interface SpotifyContextType {
  isAuthenticated: boolean
  accessToken: string | null
  player: Spotify.Player | null
  deviceId: string | null
  currentTrack: Spotify.Track | null
  isPlaying: boolean
  isPaused: boolean
  login: () => void
  logout: () => void
  play: (uri?: string) => void
  pause: () => void
  resume: () => void
  nextTrack: () => void
  previousTrack: () => void
}

const SpotifyContext = createContext<SpotifyContextType | undefined>(undefined)

export const useSpotify = () => {
  const context = useContext(SpotifyContext)
  if (!context) {
    throw new Error('useSpotify must be used within SpotifyProvider')
  }
  return context
}

interface SpotifyProviderProps {
  children: ReactNode
}

export const SpotifyProvider = ({ children }: SpotifyProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [player, setPlayer] = useState<Spotify.Player | null>(null)
  const [deviceId, setDeviceId] = useState<string | null>(null)
  const [currentTrack, setCurrentTrack] = useState<Spotify.Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(true)

  // Check authentication on mount
  useEffect(() => {
    const token = getAccessToken()
    if (token) {
      setAccessToken(token)
    }
  }, [])

  // Initialize Spotify Web Playback SDK
  useEffect(() => {
    if (!accessToken) return

    // Load Spotify SDK script
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true
    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: 'Zieetech Music Player',
        getOAuthToken: (cb: (token: string) => void) => {
          cb(accessToken)
        },
        volume: 0.5
      })

      // Ready
      spotifyPlayer.addListener('ready', ({ device_id }: { device_id: string }) => {
        console.log('Ready with Device ID', device_id)
        setDeviceId(device_id)
      })

      // Not Ready
      spotifyPlayer.addListener('not_ready', ({ device_id }: { device_id: string }) => {
        console.log('Device ID has gone offline', device_id)
      })

      // Player state changed
      spotifyPlayer.addListener('player_state_changed', (state: Spotify.PlaybackState | null) => {
        if (!state) return

        setCurrentTrack(state.track_window.current_track)
        setIsPlaying(!state.paused)
        setIsPaused(state.paused)
      })

      // Connect to the player
      spotifyPlayer.connect()

      setPlayer(spotifyPlayer)
    }

    return () => {
      if (player) {
        player.disconnect()
      }
    }
  }, [accessToken])

  const login = async () => {
    const authUrl = await getAuthUrl()
    window.location.href = authUrl
  }

  const logout = () => {
    clearAccessToken()
    setAccessToken(null)
    if (player) {
      player.disconnect()
    }
    setPlayer(null)
    setDeviceId(null)
    setCurrentTrack(null)
  }

  const play = async (uri?: string) => {
    if (!accessToken || !deviceId) return

    const endpoint = `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`
    const body = uri ? JSON.stringify({ uris: [uri] }) : undefined

    await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body
    })
  }

  const pause = async () => {
    if (!player) return
    await player.pause()
  }

  const resume = async () => {
    if (!player) return
    await player.resume()
  }

  const nextTrack = async () => {
    if (!player) return
    await player.nextTrack()
  }

  const previousTrack = async () => {
    if (!player) return
    await player.previousTrack()
  }

  const value: SpotifyContextType = {
    isAuthenticated: isAuthenticated(),
    accessToken,
    player,
    deviceId,
    currentTrack,
    isPlaying,
    isPaused,
    login,
    logout,
    play,
    pause,
    resume,
    nextTrack,
    previousTrack
  }

  return <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
}
