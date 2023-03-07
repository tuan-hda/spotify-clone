import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { persist } from "zustand/middleware"
import { mountStoreDevtool } from "simple-zustand-devtools"

interface State {
  accessToken: string
  user?: SpotifyApi.CurrentUsersProfileResponse
}

interface Actions {
  setAccessToken: (accessToken: string) => void
  setUser: (user: SpotifyApi.CurrentUsersProfileResponse) => void
}

export const useSpotifyStore = create<State & Actions>()(
  immer(
    persist(
      (set) => ({
        accessToken: "",
        setAccessToken: (accessToken) => {
          set((state) => {
            state.accessToken = accessToken
          })
        },
        setUser: (user) => {
          set((state) => {
            state.user = user
          })
        },
      }),
      {
        name: "spotify-store",
      }
    )
  )
)

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("spotifyStore", useSpotifyStore)
}
