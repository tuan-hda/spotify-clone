import { Icons } from '~/components/common'
import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import { useSpotifyStore } from '~/store/spotify'
import classNames from 'classnames'
import { PlaylistDetail } from '~/components/playlist'
import useSavedTracks from '~/hooks/useSavedTracks'
import PlaylistDescription from '~/components/playlist/PlaylistDescription'
import { shallow } from 'zustand/shallow'

const LikedSongs = () => {
  const [spotifyApi, deviceId] = useSpotifyStore((state) => [state.spotifyApi, state.deviceId], shallow)
  const { playlistId } = useParams()
  const { data } = useSWR(playlistId ? ['/get-playlist', playlistId] : null, async ([, id]) =>
    spotifyApi.getPlaylist(id || '')
  )
  const { data: tracksData } = useSWR('/saved-tracks', async () =>
    spotifyApi.getMySavedTracks({
      limit: 50
    })
  )

  const { data: savedData } = useSavedTracks()
  const totalSongs = savedData?.total
  const image = data?.body.images[0]?.url

  const play = () => {
    const trackURIs = tracksData?.body.items.map((item) => item.track.uri)
    spotifyApi.play({
      uris: trackURIs,
      device_id: deviceId
    })
  }

  return (
    <>
      <div className='-top-16 flex h-[340px] items-end bg-gradient-to-b from-[#523B9F] to-[#2B1E52] pb-6'>
        {/* Image */}
        <div className='relative ml-8 h-[192px] w-[192px] gap-2 shadow-s-5 xl:h-[232px] xl:w-[232px]'>
          {image && <img src={image} alt={data.body.name} className='h-full w-full object-cover' />}

          <div
            className={classNames(
              'absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#4117B7] to-[#7A8F88]'
            )}
          >
            <Icons type='heart' isSelected className=' scale-[5.5]' />
          </div>
        </div>

        {/* Description */}
        <PlaylistDescription name='Liked Songs' totalSongs={totalSongs} />
      </div>

      <PlaylistDetail play={play} tracks={tracksData?.body.items.map((item) => item.track)} fromColor='#2B1E52' />
    </>
  )
}

export default LikedSongs
