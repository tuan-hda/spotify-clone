import { mountStoreDevtool } from 'simple-zustand-devtools'
import { immer } from 'zustand/middleware/immer'
import { create } from 'zustand'

interface State {
  show: boolean
}

interface Actions {
  toggle: () => void
  close: () => void
  open: () => void
}

export const usePlaylistStore = create<State & Actions>()(
  immer((set) => ({
    show: false,
    toggle: () =>
      set((state) => {
        state.show = !state.show
      }),
    close: () =>
      set((state) => {
        state.show = false
      }),
    open: () =>
      set((state) => {
        state.show = true
      })
  }))
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('scrollPositionStore', usePlaylistStore)
}
