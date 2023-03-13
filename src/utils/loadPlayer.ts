import SpotifyWebApi from 'spotify-web-api-node'
import { playSpotifyUri } from '~/api/spotify.api'

const loadPlayer = (playOnInit?: boolean, spotifyApi?: SpotifyWebApi, accessToken = '') => {
  if (document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]') !== null) {
    return
  }

  if (playOnInit) {
    const oldSdkReady = window.onSpotifyWebPlaybackSDKReady

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = oldSdkReady() as Spotify.Player

      if (!player || !spotifyApi || !accessToken) {
        console.log('Lack of parameters for playOnInit=true')
        return
      }

      const playTrack = async ({ device_id }: { device_id: string }) => {
        const lastTrackRes = await spotifyApi?.getMyRecentlyPlayedTracks({ limit: 1 })
        const lastTrackUri = lastTrackRes?.body.items.at(0)?.track.uri || ''

        await playSpotifyUri(device_id, lastTrackUri, accessToken)
        player?.removeListener('ready', playTrack)
      }
      player?.addListener('ready', playTrack)
    }
  }

  const script = document.createElement('script')
  script.src = 'https://sdk.scdn.co/spotify-player.js'
  script.async = true

  document.body.appendChild(script)
}

export default loadPlayer
