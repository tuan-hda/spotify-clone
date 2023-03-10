import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import MainLayout from '~/layouts/MainLayout'
import { Suspense, lazy, useCallback } from 'react'
import { SWRConfig } from 'swr'
import { getNewAccessToken } from './api/spotify.api'
import { useSpotifyStore } from './store/spotify'
import { SWRDevTools } from 'swr-devtools'

const Main = lazy(() => import('~/components/main'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Main />} />
    </Route>
  )
)

export default function App() {
  const setAccessToken = useSpotifyStore((state) => state.setAccessToken)

  const refreshToken = useCallback(async () => {
    try {
      const response = await getNewAccessToken()
      setAccessToken(response.data.accessToken)
    } catch (err) {
      console.log('Cannot refresh token!')
    }
  }, [setAccessToken])

  return (
    <SWRDevTools>
      <SWRConfig
        value={{
          suspense: true,
          onErrorRetry: async (error, _, __, revalidate, { retryCount }) => {
            if (!String(error).includes('The access token expired')) return
            if (retryCount >= 3) return

            await refreshToken()
            revalidate({ retryCount })
          }
        }}
      >
        <Suspense fallback={<div className='h-screen w-screen bg-black' />}>
          <RouterProvider router={router} />
        </Suspense>
      </SWRConfig>
    </SWRDevTools>
  )
}
