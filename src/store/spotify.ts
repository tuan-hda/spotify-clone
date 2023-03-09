import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import SpotifyWebApi from 'spotify-web-api-node'

interface State {
  accessToken: string
  spotifyApi: SpotifyWebApi
  _hasHydrated: boolean
}

interface Actions {
  setAccessToken: (accessToken: string) => void
  setHasHydrated: (value: boolean) => void
}

export const useSpotifyStore = create<State & Actions>()(
  immer((set) => ({
    accessToken: '',
    spotifyApi: new SpotifyWebApi({
      clientId: import.meta.env.VITE_CLIENT_ID
    }),
    _hasHydrated: false,
    setAccessToken: (accessToken) => {
      set((state) => {
        state.accessToken = accessToken
        state.spotifyApi.setAccessToken(accessToken)
      })
    },
    setHasHydrated: (value) => {
      set((state) => ({
        ...state,
        _hasHydrated: value
      }))
    }
  }))
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('spotifyStore', useSpotifyStore)
}
