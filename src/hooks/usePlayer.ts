import { useSpotifyStore } from './../store/spotify'
import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'

const usePlayer = () => {
  const [accessToken, setPlayer, setPlaybackState, setDeviceId] = useSpotifyStore(
    (state) => [state.accessToken, state.setSpotifyPlayer, state.setPlaybackState, state.setDeviceId],
    shallow
  )

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb) => {
          cb(accessToken)
        }
      })

      player.addListener('ready', ({ device_id }) => {
        setDeviceId(device_id)
      })

      setPlayer(player)

      player.addListener('player_state_changed', (state) => {
        console.log(state)
        setPlaybackState(state)
      })

      player.connect()

      return player
    }

    if (!document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://sdk.scdn.co/spotify-player.js'
      script.async = true

      document.body.appendChild(script)
    }
  }, [accessToken, setPlayer, setPlaybackState, setDeviceId])
}

export default usePlayer
