// Spotify OAuth Configuration
export const SPOTIFY_CONFIG = {
  clientId: '86442a92b21b4302844192924060e0ad',
  // Use production URL since Spotify doesn't allow localhost without specific setup
  redirectUri: 'https://zieetech.web.app/callback',
  scopes: [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
    'user-modify-playback-state',
    'playlist-read-private',
    'playlist-read-collaborative'
  ]
}

// Generate random string for state parameter
export const generateRandomString = (length: number): string => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const values = crypto.getRandomValues(new Uint8Array(length))
  return values.reduce((acc, x) => acc + possible[x % possible.length], '')
}

// Get authorization URL
export const getAuthUrl = (): string => {
  const state = generateRandomString(16)
  localStorage.setItem('spotify_auth_state', state)

  const params = new URLSearchParams({
    response_type: 'token',
    client_id: SPOTIFY_CONFIG.clientId,
    scope: SPOTIFY_CONFIG.scopes.join(' '),
    redirect_uri: SPOTIFY_CONFIG.redirectUri,
    state: state
  })

  return `https://accounts.spotify.com/authorize?${params.toString()}`
}

// Parse callback hash
export const parseCallback = (): { accessToken: string | null; error: string | null } => {
  const hash = window.location.hash.substring(1)
  const params = new URLSearchParams(hash)

  const accessToken = params.get('access_token')
  const state = params.get('state')
  const storedState = localStorage.getItem('spotify_auth_state')

  if (state !== storedState) {
    return { accessToken: null, error: 'State mismatch' }
  }

  if (accessToken) {
    // Store token with expiration
    const expiresIn = parseInt(params.get('expires_in') || '3600')
    const expiresAt = Date.now() + expiresIn * 1000
    
    localStorage.setItem('spotify_access_token', accessToken)
    localStorage.setItem('spotify_token_expires_at', expiresAt.toString())
    localStorage.removeItem('spotify_auth_state')

    return { accessToken, error: null }
  }

  return { accessToken: null, error: params.get('error') }
}

// Get stored access token
export const getAccessToken = (): string | null => {
  const token = localStorage.getItem('spotify_access_token')
  const expiresAt = localStorage.getItem('spotify_token_expires_at')

  if (!token || !expiresAt) return null

  // Check if token is expired
  if (Date.now() >= parseInt(expiresAt)) {
    clearAccessToken()
    return null
  }

  return token
}

// Clear access token
export const clearAccessToken = (): void => {
  localStorage.removeItem('spotify_access_token')
  localStorage.removeItem('spotify_token_expires_at')
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getAccessToken() !== null
}
