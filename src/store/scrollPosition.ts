import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface State {
  top: number
}

interface Actions {
  setTop: (top: number) => void
}

export const useScrollPosition = create<State & Actions>()(
  immer((set) => ({
    top: 0,
    setTop: (top) => {
      set(() => ({ top }))
    }
  }))
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('scrollPositionStore', useScrollPosition)
}
