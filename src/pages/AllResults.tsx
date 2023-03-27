import { useParams } from 'react-router-dom'
import TopResult from '../components/search/TopResult'
import Song from '../components/search/Song'
import OneLineList from '../components/search/OneLineList'
import { useSearch } from '~/hooks'

const SearchResult = () => {
  const { value } = useParams()
  const { data, getTopResult } = useSearch(value)

  if (!data) return null

  const item = getTopResult()

  return (
    <>
      <div className='mt-4 grid grid-cols-12 gap-6 overflow-hidden'>
        <div className='col-span-full xl:col-span-5'>
          <h2 className='mb-4 text-2xl font-bold tracking-tight'>Top result</h2>
          {item && <TopResult artists={'artists' in item && item.artists} item={item} />}
        </div>
        <div className='col-span-full xl:col-span-7'>
          <h2 className='mb-4 text-2xl font-bold tracking-tight'>Songs</h2>
          {data.body.tracks?.items.slice(0, 4).map((track) => (
            <Song hideAlbum key={track.id} track={track} />
          ))}
        </div>
      </div>

      {data.body.artists?.total && data.body.artists?.total > 0 ? (
        <>
          <div className='mt-10' />
          <OneLineList data={data.body.artists} name='Artists' />
        </>
      ) : null}

      {data.body.albums?.total && data.body.albums?.total > 0 ? (
        <>
          <div className='mt-10' />
          <OneLineList data={data.body.albums} name='Albums' />
        </>
      ) : null}

      {data.body.playlists?.total && data.body.playlists?.total > 0 ? (
        <>
          <div className='mt-10' />
          <OneLineList data={data.body.playlists} name='Playlists' />
        </>
      ) : null}
    </>
  )
}

export default SearchResult
