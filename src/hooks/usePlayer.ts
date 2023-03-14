import { useSpotifyStore } from './../store/spotify'
import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'

const usePlayer = () => {
  const [accessToken, setPlayer, setPlaybackState] = useSpotifyStore(
    (state) => [state.accessToken, state.setSpotifyPlayer, state.setPlaybackState],
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

      setPlayer(player)

      player.addListener('player_state_changed', (state) => {
        console.log(state)
        setPlaybackState(state)
      })

      player.connect()

      return player
    }
  }, [accessToken, setPlayer, setPlaybackState])
}

export default usePlayer
