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
}

interface Actions {
  setAccessToken: (accessToken: string) => void
}

export const useSpotifyStore = create<State & Actions>()(
  immer(
    persist(
      (set) => ({
        accessToken: '',
        spotifyApi: new SpotifyWebApi({
          clientId: import.meta.env.VITE_CLIENT_ID
        }),
        setAccessToken: (accessToken) => {
          set((state) => {
            state.accessToken = accessToken
            state.spotifyApi.setAccessToken(accessToken)
          })
        }
      }),
      {
        name: 'spotify-store',
        merge: (persistedState: unknown, currentState) => {
          return {
            ...currentState,
            ...(persistedState as State),
            spotifyApi: new SpotifyWebApi({
              ...(persistedState as State)?.spotifyApi?._credentials
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
