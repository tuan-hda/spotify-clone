import https from '~/utils/https'

interface AccessToken {
  accessToken: string
}

export const getTokens = (code: string) =>
  https.post<AccessToken>('/login', {
    code
  })

export const getNewAccessToken = () => https.post<AccessToken>('/refresh')

export const playSpotifyUri = (deviceId: string, uri: string, token: string) =>
  fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    method: 'PUT',
    body: JSON.stringify({ uris: [uri] }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
