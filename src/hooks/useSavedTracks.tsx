import { useEffect, useState } from 'react'
import { useSpotifyStore } from '~/store/spotify'

function useSavedTracks() {
  const [data, setData] = useState<SpotifyApi.UsersSavedTracksResponse>()
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)

  useEffect(() => {
    spotifyApi.getMySavedTracks().then(
      function (data) {
        setData(data.body)
      },
      function (err) {
        console.log('Something went wrong!')
        if (err.response) {
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        }
      }
    )
  }, [spotifyApi])

  return { data, setData }
}

export default useSavedTracks
