import { useSpotifyStore } from '~/store/spotify'
import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import TopResult from './TopResult'
import Song from './Song'
import OneLineList from './OneLineList'

const SearchResult = () => {
  const { value } = useParams()
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const { data } = useSWR(
    value ? ['/search', value] : null,
    async ([, value]) => spotifyApi.search(value, ['album', 'artist', 'playlist', 'track']),
    { suspense: false }
  )

  if (!data || !data.body.playlists) return null

  return (
    <>
      <div className='mt-4 grid grid-cols-12 gap-6 overflow-hidden'>
        <div className='col-span-5'>
          <h2 className='mb-4 text-2xl font-bold tracking-tight'>Top result</h2>
          <TopResult item={data?.body.playlists?.items[0]} />
        </div>
        <div className='col-span-7'>
          <h2 className='mb-4 text-2xl font-bold tracking-tight'>Songs</h2>
          {data.body.tracks?.items.slice(0, 4).map((track) => (
            <Song key={track.id} track={track} />
          ))}
        </div>
      </div>

      <div className='mt-10' />
      <OneLineList data={data.body.artists} name='Artists' />

      <div className='mt-10' />
      <OneLineList data={data.body.albums} name='Albums' />

      <div className='mt-10' />
      <OneLineList data={data.body.playlists} name='Playlists' />
    </>
  )
}

export default SearchResult
