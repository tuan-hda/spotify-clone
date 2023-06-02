import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import { useSpotifyStore } from '~/store/spotify'
import { PlaylistDetail } from '~/components/playlist'
import PlaylistDescription from '~/components/playlist/PlaylistDescription'
import { shallow } from 'zustand/shallow'
import PlaylistCover from '~/components/playlist/PlaylistCover'
import { usePalette } from 'react-palette'
import { darken } from 'polished'

const Playlist = () => {
  const [spotifyApi, deviceId] = useSpotifyStore((state) => [state.spotifyApi, state.deviceId], shallow)
  const { playlistId } = useParams()
  const { data, mutate } = useSWR(playlistId ? ['/get-playlist', playlistId] : null, async ([, id]) =>
    spotifyApi.getPlaylist(id || '')
  )

  const image = data?.body.images[0]?.url
  const totalSongs = data?.body.tracks.total || 0
  const totalDuration = data?.body.tracks.items.reduce((prev, curr) => prev + (curr.track?.duration_ms || 0), 0) || 0
  const name = data?.body.name
  const items = data?.body.tracks.items || []
  const { data: dominantData } = usePalette(image || '')
  const fromColor = darken(0.1, dominantData.vibrant || '#535353')
  const toColor = darken(0.3, dominantData.vibrant || '#535353')

  const play = () => {
    const uri = data?.body.uri || ''
    spotifyApi.play({
      context_uri: uri,
      device_id: deviceId
    })
  }

  return (
    <>
      <div
        className='-top-16 flex h-[340px] items-end bg-gradient-to-b pb-6'
        style={{
          '--tw-gradient-from': fromColor,
          '--tw-gradient-to': toColor,
          '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)'
        }}
      >
        {/* Image */}
        <PlaylistCover mutate={mutate} id={data?.body.id} image={image} name={name} />

        {/* Description */}
        <PlaylistDescription name={data?.body.name} totalSongs={totalSongs} duration={totalDuration} />
      </div>

      <PlaylistDetail fromColor={toColor} tracks={items.map((item) => item.track)} play={play} />
    </>
  )
}

export default Playlist
