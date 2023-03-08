import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { mountStoreDevtool } from "simple-zustand-devtools"

interface State {
  accessToken: string
  user?: any
}

interface Actions {
  setAccessToken: (accessToken: string) => void
  setUser: (user: any) => void
}

export const useSpotifyStore = create<State & Actions>()(
  immer((set) => ({
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
  }))
)

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("spotifyStore", useSpotifyStore)
}
