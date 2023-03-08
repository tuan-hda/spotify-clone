import { useNavigate } from "react-router-dom"
import { getNewAccessToken, getTokens } from "api/spotify.api"
import { useEffect } from "react"
import { useSpotifyStore } from "store/spotify"
import { getCodeFromUrl } from "./../utils/utils"

const useAuth = () => {
  const code = getCodeFromUrl()
  const setAccessToken = useSpotifyStore((state) => state.setAccessToken)

  useEffect(() => {
    ;(async () => {
      try {
        if (code) {
          const response = await getTokens(code)
          setAccessToken(response.data.accessToken)
          window.history.pushState({}, document.title, "/")
        } else {
          const response = await getNewAccessToken()
          setAccessToken(response.data.accessToken)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [code])
}

export default useAuth
