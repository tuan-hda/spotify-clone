import Scrollbars from 'react-custom-scrollbars'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'

interface State {
  ref: Scrollbars | null
}

interface Actions {
  setRef: (ref: Scrollbars) => void
}

export const useScrollRef = create<State & Actions>()((set) => ({
  ref: null,
  setRef: (ref) => {
    set(() => ({
      ref
    }))
  }
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('scrollPositionStore', useScrollRef)
}
