import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import { useSpotifyStore } from '~/store/spotify'
import { PlaylistDetail } from '~/components/playlist'
import PlaylistDescription from '~/components/playlist/PlaylistDescription'
import { shallow } from 'zustand/shallow'
import PlaylistCover from '~/components/playlist/PlaylistCover'
import { darken } from 'polished'
import { useColor } from 'color-thief-react'
import EditDetailModal from '~/components/playlist/EditDetailModal'
import { usePlaylistStore } from '~/store/playlistStore'

const Playlist = () => {
  const [spotifyApi, deviceId] = useSpotifyStore((state) => [state.spotifyApi, state.deviceId], shallow)
  const { playlistId } = useParams()
  const { data } = useSWR(playlistId ? ['/get-playlist', playlistId] : null, async ([, id]) =>
    spotifyApi.getPlaylist(id || '')
  )

  const image = data?.body.images[0]?.url
  const totalSongs = data?.body.tracks.total || 0
  const totalDuration = data?.body.tracks.items.reduce((prev, curr) => prev + (curr.track?.duration_ms || 0), 0) || 0
  const name = data?.body.name
  const items = data?.body.tracks.items || []
  const id = data?.body.id
  const { data: dominantData } = useColor(image || '', 'hex', { crossOrigin: 'anonymous', quality: 1 })
  const fromColor = darken(0.1, dominantData || '#535353')
  const toColor = dominantData ? darken(0.4, dominantData) : darken(0.3, '#888')
  const [showEdit, closeEdit] = usePlaylistStore((state) => [state.show, state.close], shallow)

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
        <PlaylistCover id={id} image={image} name={name} />

        {/* Description */}
        <PlaylistDescription name={name} totalSongs={totalSongs} duration={totalDuration} />
      </div>

      <PlaylistDetail fromColor={toColor} tracks={items.map((item) => item.track)} play={play} />
      <EditDetailModal show={showEdit} onClose={closeEdit} />
    </>
  )
}

export default Playlist
