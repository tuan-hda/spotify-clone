import { useParams } from 'react-router-dom'
import TopResult from '../components/search/TopResult'
import Song from '../components/search/Song'
import OneLineList from '../components/search/OneLineList'
import { useSearch } from '~/hooks'
import { useState } from 'react'
import useUnselectClickOutside from '~/hooks/useUnselectClickOutside'
import useSWR from 'swr'
import { useSpotifyStore } from '~/store/spotify'

const SearchResult = () => {
  const { value } = useParams()
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const { data, isLoading, getTopResult } = useSearch(value)
  const [selected, setSelected] = useState(-1)
  const { ref } = useUnselectClickOutside(setSelected)

  const { data: savedTracks, mutate: mutateSavedTracks } = useSWR(
    data?.body.tracks && data.body.tracks.total !== 0 && !isLoading ? ['/saved-tracks', data.body.tracks.items] : null,
    async ([, tracks]) => {
      const trackIds = tracks.map((track) => track.id)
      return spotifyApi.containsMySavedTracks(trackIds)
    }
  )

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
          <div ref={ref}>
            {data.body.tracks?.items.slice(0, 4).map((track, index) => (
              <Song
                selected={selected}
                setSelected={setSelected}
                index={index}
                hideAlbum
                key={track.id + index}
                isSaved={savedTracks?.body[index]}
                onSaveTrack={mutateSavedTracks}
                track={track}
              />
            ))}
          </div>
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
