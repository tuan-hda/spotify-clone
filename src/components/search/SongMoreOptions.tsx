import { Popup } from 'reactjs-popup'
import { popupConfig } from '~/config/popupConfig'
import { CustomTooltip, Menu } from '../common'
import { HiDotsHorizontal } from 'react-icons/hi'
import MenuItem from '../common/MenuItem'
import useSWR from 'swr'
import { useSpotifyStore } from '~/store/spotify'
import { toast } from 'react-toastify'
import { handleError } from '~/utils/https'
import { useParams } from 'react-router-dom'
type Props = {
  uri: string
  mutate?: () => void
}

function SongMoreOptions({ uri }: Props) {
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const { playlistId } = useParams()
  const { data } = useSWR('/get-current-user-playlists', async () => spotifyApi.getUserPlaylists())
  const { mutate } = useSWR(playlistId ? ['/get-playlist', playlistId] : null)

  const playlistItems = data?.body.items.map((item) => ({
    content: item.name,
    action: async () => {
      try {
        await spotifyApi.addTracksToPlaylist(item.id, [uri])
        toast(
          <p>
            Added to <span className='font-bold'>{item.name}</span>
          </p>
        )
      } catch (error) {
        handleError(error, 'Add to playlist')
      }
    }
  }))

  const callMutate = async (playlistId: string) => {
    await spotifyApi.removeTracksFromPlaylist(playlistId, [{ uri }])
    const newPlaylist = await spotifyApi.getPlaylist(playlistId)
    mutate && mutate(newPlaylist)
  }

  const menuItems = [
    'Go to song radio',
    'Go to artist',
    'Go to album',
    'Show credits',
    playlistId && (
      <MenuItem
        action={() => callMutate(playlistId)}
        className='border-t border-s-gray-3/70 '
        content='Remove from this playlist'
      />
    ),
    <Popup
      key={1}
      trigger={
        <div>
          <MenuItem content='Add to playlist' />
        </div>
      }
      {...popupConfig}
      position='left top'
      on='hover'
    >
      <Menu scroll items={playlistItems} />
    </Popup>
  ]

  return (
    <Popup
      {...popupConfig}
      trigger={
        <div className='w-fit pl-2'>
          <CustomTooltip content='More options for New Playlist'>
            <button className='cursor-default py-1 outline-0 brightness-50 hover:brightness-100'>
              <HiDotsHorizontal className='h-6 w-6' />
            </button>
          </CustomTooltip>
        </div>
      }
    >
      <Menu items={menuItems} />
    </Popup>
  )
}

export default SongMoreOptions
