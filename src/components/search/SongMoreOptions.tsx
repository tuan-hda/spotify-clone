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
import { useRef } from 'react'
import { PopupActions } from 'reactjs-popup/dist/types'
type Props = {
  uri: string
  mutate?: () => void
}

function SongMoreOptions({ uri }: Props) {
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const { playlistId } = useParams()
  const { data } = useSWR('/get-current-user-playlists', async () => spotifyApi.getUserPlaylists(), { suspense: false })
  const { mutate } = useSWR(playlistId ? ['/get-playlist', playlistId] : null)
  const ref = useRef<PopupActions | null>(null)
  const { data: user } = useSWR('/get-me', async () => spotifyApi.getMe())
  const { data: playlistData } = useSWR(playlistId ? ['/get-playlist', playlistId] : null, async ([, id]) =>
    spotifyApi.getPlaylist(id || '')
  )

  const closePopup = () => ref.current?.close()

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
    playlistId && <MenuItem action={() => callMutate(playlistId)} content='Remove from this playlist' />,
    <Popup
      {...popupConfig}
      key={1}
      trigger={
        <div>
          <MenuItem content='Add to playlist' />
        </div>
      }
      position='left top'
      on='hover'
    >
      <Menu closePopup={closePopup} scroll items={playlistItems} />
    </Popup>
  ]

  if (playlistId) {
    if (playlistData?.body.owner.id !== user?.body.id) return <div className='w-8' />
  }

  return (
    <Popup
      ref={ref}
      {...popupConfig}
      closeOnDocumentClick
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
      <Menu closePopup={closePopup} items={menuItems} />
    </Popup>
  )
}

export default SongMoreOptions
