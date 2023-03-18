import { useParams } from 'react-router-dom'
import { useSpotifyStore } from '~/store/spotify'
import useSWR from 'swr'
import Song from './Song'

const SongResults = () => {
  const { value } = useParams()
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const { data } = useSWR(
    value ? ['/search-songs', value] : null,
    async ([, value]) => spotifyApi.searchTracks(value),
    { suspense: false }
  )

  return (
    <>
      {data?.body.tracks?.items.map((track) => (
        <Song key={track.id} track={track} />
      ))}
    </>
  )
}

export default SongResults
