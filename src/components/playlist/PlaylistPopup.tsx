import React from 'react'
import { default as Popup } from 'reactjs-popup'
import { CustomTooltip, Menu } from '~/components/common'
import { HiDotsHorizontal } from 'react-icons/hi'
import { popupConfig } from '~/config/popupConfig'
function PlaylistPopup() {
  const menuItems = ['Go to playlist radio', 'Remove from profile', 'Delete', 'About recommendation']

  return (
    <Popup
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
  )
}

export default PlaylistPopup
