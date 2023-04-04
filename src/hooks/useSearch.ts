import { useSpotifyStore } from '~/store/spotify'
import useSWR from 'swr'

const useSearch = (value: string | undefined) => {
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)

  const { data, isLoading } = useSWR(
    value ? ['/search', value] : null,
    async ([, value]) => spotifyApi.search(value, ['album', 'artist', 'playlist', 'track']),
    { suspense: false }
  )

  const isNotFound = () =>
    data?.body.albums?.total === 0 &&
    data?.body.playlists?.total === 0 &&
    data?.body.tracks?.total === 0 &&
    data?.body.artists?.total === 0

  const getTopResult = () => {
    if (!data) return
    if (data.body.tracks?.total && data.body.tracks?.total > 0) return data?.body.tracks?.items[0]
    if (data.body.playlists?.total && data.body.playlists.total > 0) return data?.body.playlists?.items[0]
    if (data.body.albums?.total && data.body.albums?.total > 0) return data?.body.albums?.items[0]
    if (data.body.artists?.total && data.body.artists?.total > 0) return data?.body.artists?.items[0]
  }

  return { data, isLoading, isNotFound, getTopResult }
}

export default useSearch
