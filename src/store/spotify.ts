import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import SpotifyWebApi from 'spotify-web-api-node'
import { createJSONStorage, persist } from 'zustand/middleware'

interface CredentialsSpotify extends SpotifyWebApi {
  _credentials?: {
    accessToken: string
    clientId: string
  }
}

interface State {
  accessToken: string
  spotifyApi: CredentialsSpotify
  spotifyPlayer: Spotify.Player | null
  deviceId: string
  playbackState: Spotify.PlaybackState | null
}

interface Actions {
  setAccessToken: (accessToken: string) => void
  setSpotifyPlayer: (player: Spotify.Player) => void
  setDeviceId: (deviceId: string) => void
  setPlaybackState: (playbackState: Spotify.PlaybackState) => void
  clearSession: () => void
  play: (
    item:
      | SpotifyApi.ArtistObjectFull
      | SpotifyApi.AlbumObjectSimplified
      | SpotifyApi.TrackObjectFull
      | SpotifyApi.PlaylistObjectSimplified
  ) => void
}

const defaultState: State = {
  accessToken: '',
  spotifyApi: new SpotifyWebApi({
    clientId: import.meta.env.VITE_CLIENT_ID
  }),
  spotifyPlayer: null,
  deviceId: '',
  playbackState: null
}

export const useSpotifyStore = create<State & Actions>()(
  immer(
    persist(
      (set, get) => ({
        accessToken: '',
        spotifyApi: new SpotifyWebApi({
          clientId: import.meta.env.VITE_CLIENT_ID
        }),
        spotifyPlayer: null,
        deviceId: '',
        playbackState: null,

        setAccessToken: (accessToken) => {
          set((state) => {
            state.accessToken = accessToken
            state.spotifyApi.setAccessToken(accessToken)
          })
        },
        setSpotifyPlayer: (player) => {
          set((state) => {
            state.spotifyPlayer = player
          })
        },
        setDeviceId: (deviceId) => {
          set((state) => {
            state.deviceId = deviceId
          })
        },
        setPlaybackState: (playbackState) => {
          set((state) => {
            state.playbackState = playbackState
          })
        },
        clearSession: () => {
          set(defaultState)
        },
        play: (item) => {
          const { spotifyApi, deviceId: device_id } = get()
          if (!spotifyApi || !device_id) {
            console.error('FAILED WHEN PLAY AN ITEM. EITHER SPOTIFY API OR DEVICE_ID IS NULL/UNDEFINED')

            return
          }
          if (item.type === 'track')
            spotifyApi.play({
              device_id,
              uris: [item.uri]
            })
          else
            spotifyApi.play({
              device_id,
              context_uri: item.uri
            })
        }
      }),
      {
        name: 'spotify-store',
        partialize: (state) => ({ accessToken: state.accessToken, spotifyApi: state.spotifyApi }),
        merge: (persistedState: unknown, currentState) => {
          return {
            ...currentState,
            ...(persistedState as State),
            spotifyApi: new SpotifyWebApi({
              ...(persistedState as State)?.spotifyApi?._credentials,
              clientId: import.meta.env.VITE_CLIENT_ID
            })
          }
        },
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('spotifyStore', useSpotifyStore)
}
