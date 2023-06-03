import React, { useRef, useState } from 'react'
import { default as Popup } from 'reactjs-popup'
import { CustomTooltip, Menu } from '~/components/common'
import { HiDotsHorizontal } from 'react-icons/hi'
import { popupConfig } from '~/config/popupConfig'
import DeleteModal from '../common/DeleteModal'
import { useSpotifyStore } from '~/store/spotify'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { handleError } from '~/utils/https'
import useSWR from 'swr'
import MenuItem from '../common/MenuItem'
import { PopupActions } from 'reactjs-popup/dist/types'
import { usePlaylistStore } from '~/store/playlistStore'
import { shallow } from 'zustand/shallow'
import { copyToClipboard } from '~/utils/clipboard'
function PlaylistPopup() {
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const [show, setShow] = useState(false)
  const [toggleEditShow] = usePlaylistStore((state) => [state.toggle], shallow)
  const { playlistId } = useParams()
  const navigate = useNavigate()
  const { mutate } = useSWR('/get-current-user-playlists', async () => spotifyApi.getUserPlaylists())
  const ref = useRef<PopupActions | null>(null)

  const closePopup = () => ref.current?.close()

  const close = () => {
    setShow(false)
    closePopup()
  }
  const toggleEdit = () => {
    toggleEditShow()
    closePopup()
  }

  const confirmDelete = async () => {
    close()
    try {
      playlistId && (await spotifyApi.unfollowPlaylist(playlistId))
      navigate('/', {
        state: {
          from: 'true'
        }
      })
      mutate()
      toast(
        <p>
          Removed from <span className='font-bold'>Your library</span>
        </p>
      )
    } catch (error) {
      handleError(error, 'DELETE TRACK')
    }
  }
  const menuItems = [
    { content: 'Edit detail', action: toggleEdit },
    { content: 'Delete', action: () => setShow(true) },
    {
      content: (
        <div className='border-t border-s-gray-3'>
          <MenuItem closePopup={closePopup} content={'Share'} />
        </div>
      ),
      action: () => {
        copyToClipboard(window.location.href)
      }
    }
  ]

  return (
    <>
      <Popup
        ref={ref}
        trigger={
          <div className='w-fit'>
            <CustomTooltip content='More options for New Playlist'>
              <button className='cursor-default py-1 outline-0 brightness-50 hover:brightness-100'>
                <HiDotsHorizontal className='h-6 w-6' />
              </button>
            </CustomTooltip>
          </div>
        }
        {...popupConfig}
      >
        <Menu items={menuItems} />
      </Popup>
      <DeleteModal show={show} onClose={close} confirmDelete={confirmDelete} />
    </>
  )
}

export default PlaylistPopup
