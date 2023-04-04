import { useParams } from 'react-router-dom'
import { useSpotifyStore } from '~/store/spotify'
import useSWR from 'swr'
import Song from '~/components/search/Song'
import { ReactComponent as Time } from 'assets/icons/Time.svg'
import { useState } from 'react'
import useUnselectClickOutside from '~/hooks/useUnselectClickOutside'

const SongResults = () => {
  const { value } = useParams()
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const [selected, setSelected] = useState(-1)
  const { ref } = useUnselectClickOutside(setSelected)
  const { data, isLoading } = useSWR(
    value ? ['/search-songs', value] : null,
    async ([, value]) => spotifyApi.searchTracks(value),
    { suspense: false }
  )

  const { data: savedTracks, mutate: mutateSavedTracks } = useSWR(
    data?.body.tracks && data.body.tracks.total !== 0 && !isLoading ? ['/saved-tracks', data.body.tracks.items] : null,
    async ([, tracks]) => {
      const trackIds = tracks.map((track) => track.id)
      return spotifyApi.containsMySavedTracks(trackIds)
    }
  )

  return (
    <div className='-mx-4 lg:-mx-8'>
      <div className='sticky top-28 z-[2] grid h-9 w-full grid-cols-12 items-center border-b border-s-gray-2 bg-s-black-5 px-12 text-s-gray-7'>
        <div className='col-span-7 flex items-center'>
          <span>#</span>
          <span className='ml-5'>Title</span>
        </div>
        <div className='col-span-5 flex items-center'>
          <span className='hidden lg:inline'>Album</span>
          <Time className='ml-auto mr-7 fill-s-gray-7' />
        </div>
      </div>
      <div className='mx-8 mt-4' ref={ref}>
        {data?.body.tracks?.items.map((track, index) => (
          <Song
            selected={selected}
            setSelected={setSelected}
            paddingLeft='14px'
            paddingRight='14px'
            isSaved={savedTracks?.body[index]}
            onSaveTrack={mutateSavedTracks}
            key={track.id}
            index={index}
            track={track}
            isSongTab
          />
        ))}
      </div>
    </div>
  )
}

export default SongResults
