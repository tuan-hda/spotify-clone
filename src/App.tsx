import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { Suspense, useCallback } from 'react'
import { SWRConfig } from 'swr'
import { getNewAccessToken } from './api/spotify.api'
import { useSpotifyStore } from './store/spotify'
import { SWRDevTools } from 'swr-devtools'
import routes from './config/routes'
import usePlayer from './hooks/usePlayer'

const router = createBrowserRouter(createRoutesFromElements(routes))

export default function App() {
  const setAccessToken = useSpotifyStore((state) => state.setAccessToken)

  usePlayer()

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
