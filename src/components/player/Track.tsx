import Like from 'assets/icons/Like.png'
import LikeFill from 'assets/icons/LikeFill.png'
import { useSpotifyStore } from '~/store/spotify'
import useImmutableSWR from 'swr/immutable'
import { shallow } from 'zustand/shallow'
import { CustomLink } from '../common'
import ArtistCredit from '../common/ArtistCredit'
import useSWR from 'swr'

const Track = () => {
  const [playbackState, spotifyApi] = useSpotifyStore((state) => [state.playbackState, state.spotifyApi], shallow)
  const { data } = useImmutableSWR('/get-immutable-last-track', async () =>
    spotifyApi.getMyRecentlyPlayedTracks({ limit: 1 })
  )
  const track = playbackState?.track_window.current_track ?? data?.body.items.at(0)?.track
  const { data: savedData, mutate } = useSWR(
    track !== undefined ? ['/saved-tracks', track] : null,
    async ([, track]) => {
      return spotifyApi.containsMySavedTracks([track.id || ''])
    }
  )
  const isSaved = savedData?.body.at(0)
  const saveTrack = async () => {
    if (track?.id) {
      if (!isSaved) {
        await spotifyApi.addToMySavedTracks([track.id])
      } else {
        await spotifyApi.removeFromMySavedTracks([track.id])
      }
      mutate()
    }
  }

  if (!track) return <div className='col-span-3' />

  return (
    <div className='col-span-3 flex h-14 items-center gap-[15px]'>
      <img
        src={track.album.images.at(0)?.url}
        loading='lazy'
        className='aspect-square h-full flex-shrink-0 object-cover'
        alt='Current Track'
      />

      <div className='ellipsis min-w-0 text-white'>
        <CustomLink to={`/album/${track.id}`} className='text-sm text-white hover:underline'>
          {track.name}
        </CustomLink>
        <p className='group text-ss font-light text-s-gray-5'>
          {track.artists.map((artist, index) => {
            return <ArtistCredit artist={artist} index={index} key={artist.uri} />
          })}
        </p>
      </div>

      <div className='ml-1 flex-shrink-0'>
        <button onClick={saveTrack} className='flex h-8 w-8 cursor-auto brightness-75 hover:brightness-100'>
          <img className='m-auto h-4' src={isSaved ? LikeFill : Like} alt='Like Button' />
        </button>
      </div>
    </div>
  )
}

export default Track
