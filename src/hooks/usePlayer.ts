import { useSpotifyStore } from './../store/spotify'
import { useEffect, useRef } from 'react'
import { shallow } from 'zustand/shallow'
import { next } from '~/utils/utils'

const usePlayer = () => {
  const [accessToken, player, setPlayer, playbackState, setPlaybackState, setDeviceId, spotifyApi, deviceId] =
    useSpotifyStore(
      (state) => [
        state.accessToken,
        state.spotifyPlayer,
        state.setSpotifyPlayer,
        state.playbackState,
        state.setPlaybackState,
        state.setDeviceId,
        state.spotifyApi,
        state.deviceId
      ],
      shallow
    )
  const suspendUpdate = useRef({
    block: false,
    flag: false
  })

  useEffect(() => {
    const playerStateChangeFn = async (state: Spotify.PlaybackState) => {
      if (suspendUpdate.current.block) {
        suspendUpdate.current.block = false
        return
      }

      // Get new song
      if (suspendUpdate.current.flag) {
        console.log('Triggered')
        await next(playbackState, spotifyApi, deviceId, player)
        suspendUpdate.current.flag = false
        return
      }

      if (state.position === state.duration && state.track_window.next_tracks.length === 0) {
        suspendUpdate.current = {
          block: true,
          flag: true
        }
        return
      }

      console.log(state)
      setPlaybackState(state)
    }

    if (player) {
      player.addListener('player_state_changed', playerStateChangeFn)
    }

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

      player.connect()

      return player
    }

    if (!document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://sdk.scdn.co/spotify-player.js'
      script.async = true

      document.body.appendChild(script)
    }

    return () => {
      player?.removeListener('player_state_changed', playerStateChangeFn)
    }
  }, [accessToken, deviceId, playbackState, player, setDeviceId, setPlaybackState, setPlayer, spotifyApi])
}

export default usePlayer
