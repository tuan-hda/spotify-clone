import { useSpotifyStore } from '~/store/spotify'
import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import TopResult from '../components/search/TopResult'
import Song from '../components/search/Song'
import OneLineList from '../components/search/OneLineList'
import NotFound from '~/components/search/NotFound'

const SearchResult = () => {
  const { value } = useParams()
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const { data } = useSWR(
    value ? ['/search', value] : null,
    async ([, value]) => spotifyApi.search(value, ['album', 'artist', 'playlist', 'track']),
    { suspense: false }
  )

  if (!data) return null

  if (
    data.body.albums?.total === 0 &&
    data.body.playlists?.total === 0 &&
    data.body.tracks?.total === 0 &&
    data.body.artists?.total === 0
  )
    return <NotFound />

  const getItem = () => {
    if (data.body.playlists?.total && data.body.playlists.total > 0) return data?.body.playlists?.items[0]
    if (data.body.tracks?.total && data.body.tracks?.total > 0) return data?.body.tracks?.items[0]
    if (data.body.albums?.total && data.body.albums?.total > 0) return data?.body.albums?.items[0]
    if (data.body.artists?.total && data.body.artists?.total > 0) return data?.body.artists?.items[0]
  }

  const item = getItem()

  return (
    <>
      <div className='mt-4 grid grid-cols-12 gap-6 overflow-hidden'>
        <div className='col-span-full xl:col-span-5'>
          <h2 className='mb-4 text-2xl font-bold tracking-tight'>Top result</h2>
          {item && <TopResult item={item} />}
        </div>
        <div className='col-span-full xl:col-span-7'>
          <h2 className='mb-4 text-2xl font-bold tracking-tight'>Songs</h2>
          {data.body.tracks?.items.slice(0, 4).map((track) => (
            <Song hideAlbum key={track.id} track={track} />
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
