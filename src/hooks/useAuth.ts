import { getNewAccessToken, getTokens } from '~/api/spotify.api'
import { useEffect } from 'react'
import { useSpotifyStore } from '~/store/spotify'
import { getCodeFromUrl } from '~/utils/utils'

const useAuth = () => {
  const code = getCodeFromUrl()
  const [accessToken, setAccessToken] = useSpotifyStore((state) => [state.accessToken, state.setAccessToken])

  useEffect(() => {
    ;(async () => {
      try {
        if (code) {
          const response = await getTokens(code)
          setAccessToken(response.data.accessToken)
          window.history.pushState({}, document.title, '/')
        } else if (!accessToken) {
          const response = await getNewAccessToken()
          setAccessToken(response.data.accessToken)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [code, setAccessToken, accessToken])
}

export default useAuth
