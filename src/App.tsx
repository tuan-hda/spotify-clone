import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { useCallback } from 'react'
import { SWRConfig } from 'swr'
import { getNewAccessToken } from './api/spotify.api'
import { useSpotifyStore } from './store/spotify'
import routes from './config/routes'
import usePlayer from './hooks/usePlayer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
    <SWRConfig
      value={{
        suspense: false,
        onErrorRetry: async (error, _, __, revalidate, { retryCount }) => {
          if (!String(error).includes('The access token expired')) return
          if (retryCount >= 3) return

          await refreshToken()
          revalidate({ retryCount })
        },
        revalidateOnFocus: false
      }}
    >
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        className='mb-20 '
        toastClassName='bg-[#2E77D0]'
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <RouterProvider router={router} />
    </SWRConfig>
  )
}
