export const authEndpoint = 'https://accounts.spotify.com/authorize'
const redirectUri = import.meta.env.VITE_REDIRECT_URI
const clientId = import.meta.env.VITE_CLIENT_ID
const responseType = 'code'
const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'app-remote-control',
  'streaming',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
  'user-follow-modify',
  'user-follow-read',
  'user-read-playback-position',
  'user-top-read',
  'user-read-recently-played',
  'user-library-modify',
  'user-library-read',
  'user-read-email',
  'user-read-private'
]

export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&show_dialog=true`
