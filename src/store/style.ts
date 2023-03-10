import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface State {
  dashboardStartColor: string
  defaultStartColor: string
}

interface Actions {
  setDashboardStartColor: (value: string) => void
  setDefaultStartColor: (value: string) => void
}

const useStyleStore = create<State & Actions>()(
  immer((set) => ({
    dashboardStartColor: '',
    defaultStartColor: '#000',
    setDashboardStartColor: (value: string) => {
      set((state) => {
        state.dashboardStartColor = value
      })
    },
    setDefaultStartColor: (value: string) => {
      set((state) => {
        state.defaultStartColor = value
      })
    }
  }))
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('styleStore', useStyleStore)
}

export default useStyleStore
