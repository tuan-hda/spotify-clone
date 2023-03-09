import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface State {
  length: number
  index: number
}

interface Actions {
  incLength: () => void
  decIndex: () => void
  incIndex: () => void
}

export const useHistory = create<State & Actions>()(
  immer((set) => ({
    length: 0,
    index: 0,
    incIndex: () => {
      set((state) => {
        state.index += 1
      })
    },
    decIndex: () => {
      set((state) => {
        state.index -= 1
      })
    },
    incLength: () => {
      set((state) => {
        state.length = state.index + 1
      })
    }
  }))
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('historyStore', useHistory)
}
