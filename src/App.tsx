import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import MainLayout from '~/layouts/MainLayout'
import { Suspense, lazy, useCallback } from 'react'
import useAuth from '~/hooks/useAuth'
import { SWRConfig } from 'swr'
import { getNewAccessToken } from './api/spotify.api'
import { useSpotifyStore } from './store/spotify'

const Main = lazy(() => import('~/components/main'))
const Album = lazy(() => import('~/components/album'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Main />} />
      <Route path='/album' element={<Album />} />
    </Route>
  )
)

export default function App() {
  const setAccessToken = useSpotifyStore((state) => state.setAccessToken)

  useAuth()

  const refreshToken = useCallback(async () => {
    try {
      const response = await getNewAccessToken()
      setAccessToken(response.data.accessToken)
    } catch (err) {
      console.log('Cannot refresh token!')
    }
  }, [setAccessToken])

  return (
    <SWRConfig
      value={{
        onErrorRetry: async (error, _, __, revalidate, { retryCount }) => {
          if (!String(error).includes('The access token expired')) return
          if (retryCount >= 3) return

          await refreshToken()
          revalidate({ retryCount })
        }
      }}
    >
      <Suspense fallback={<div className='bg-black'></div>}>
        <RouterProvider router={router} />
      </Suspense>
    </SWRConfig>
  )
}
