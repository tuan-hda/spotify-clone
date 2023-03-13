import Like from '~/assets/icons/Like.png'
import { useSpotifyStore } from '~/store/spotify'
import useImmutableSWR from 'swr/immutable'
import { shallow } from 'zustand/shallow'
import { CustomLink } from '../common'
import { extractId } from '~/utils/utils'
import { Fragment } from 'react'

const Track = () => {
  const [playbackState, spotifyApi] = useSpotifyStore((state) => [state.playbackState, state.spotifyApi], shallow)
  const { data } = useImmutableSWR('/get-immutable-last-track', async () =>
    spotifyApi.getMyRecentlyPlayedTracks({ limit: 1 })
  )
  const track = playbackState?.track_window.current_track ?? data?.body.items.at(0)?.track

  if (!track) return <div className='col-span-3' />

  return (
    <div className='col-span-3 flex h-14 items-center gap-[15px]'>
      <img
        src={track.album.images.at(0)?.url}
        className='aspect-square h-full flex-shrink-0 object-cover'
        alt='Current Track'
      />

      <div>
        <CustomLink
          to={`/album/${extractId(track.album.uri)}`}
          className='overflow-hidden text-ellipsis whitespace-nowrap text-sm text-white hover:underline'
        >
          {track.name}
        </CustomLink>
        <p className='overflow-hidden text-ellipsis whitespace-nowrap text-ss font-light text-s-gray-5'>
          {track.artists.map((artist, index) => (
            <Fragment key={artist.uri}>
              {index !== 0 && ', '}
              <CustomLink className='hover:underline' to={`/artist/${extractId(artist.uri)}`}>
                {artist.name}
              </CustomLink>
            </Fragment>
          ))}
        </p>
      </div>

      <div className='ml-1 flex-shrink-0'>
        <button className='flex h-8 w-8 cursor-auto brightness-75 hover:brightness-100'>
          <img className='m-auto h-4' src={Like} alt='Like Button' />
        </button>
      </div>
    </div>
  )
}

export default Track
