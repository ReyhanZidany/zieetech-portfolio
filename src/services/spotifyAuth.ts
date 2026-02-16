// Spotify OAuth Configuration
export const SPOTIFY_CONFIG = {
  clientId: '86442a92b21b4302844192924060e0ad',
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

// Generate random string for state and code verifier
export const generateRandomString = (length: number): string => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const values = crypto.getRandomValues(new Uint8Array(length))
  return values.reduce((acc, x) => acc + possible[x % possible.length], '')
}

// Generate code challenge from verifier
async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

function base64encode(input: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const hashed = await sha256(codeVerifier)
  return base64encode(hashed)
}

// Get authorization URL with PKCE
export const getAuthUrl = async (): Promise<string> => {
  const codeVerifier = generateRandomString(64)
  const codeChallenge = await generateCodeChallenge(codeVerifier)
  const state = generateRandomString(16)

  // Store for later use
  localStorage.setItem('spotify_code_verifier', codeVerifier)
  localStorage.setItem('spotify_auth_state', state)

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: SPOTIFY_CONFIG.clientId,
    scope: SPOTIFY_CONFIG.scopes.join(' '),
    redirect_uri: SPOTIFY_CONFIG.redirectUri,
    state: state,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge
  })

  return `https://accounts.spotify.com/authorize?${params.toString()}`
}

// Exchange code for token
async function exchangeCodeForToken(code: string): Promise<string | null> {
  const codeVerifier = localStorage.getItem('spotify_code_verifier')
  if (!codeVerifier) return null

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: SPOTIFY_CONFIG.redirectUri,
    client_id: SPOTIFY_CONFIG.clientId,
    code_verifier: codeVerifier
  })

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    })

    const data = await response.json()
    
    if (data.access_token) {
      // Store token with expiration
      const expiresAt = Date.now() + data.expires_in * 1000
      localStorage.setItem('spotify_access_token', data.access_token)
      localStorage.setItem('spotify_token_expires_at', expiresAt.toString())
      localStorage.removeItem('spotify_code_verifier')
      localStorage.removeItem('spotify_auth_state')
      
      return data.access_token
    }
  } catch (error) {
    console.error('Token exchange error:', error)
  }

  return null
}

// Parse callback with authorization code
export const parseCallback = async (): Promise<{ accessToken: string | null; error: string | null }> => {
  const params = new URLSearchParams(window.location.search)
  
  const code = params.get('code')
  const state = params.get('state')
  const error = params.get('error')
  const storedState = localStorage.getItem('spotify_auth_state')

  if (error) {
    return { accessToken: null, error }
  }

  if (state !== storedState) {
    return { accessToken: null, error: 'State mismatch' }
  }

  if (code) {
    const accessToken = await exchangeCodeForToken(code)
    return { accessToken, error: accessToken ? null : 'Failed to exchange code' }
  }

  return { accessToken: null, error: 'No code received' }
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
  localStorage.removeItem('spotify_code_verifier')
  localStorage.removeItem('spotify_auth_state')
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getAccessToken() !== null
}
