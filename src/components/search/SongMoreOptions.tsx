import React from 'react'
import Popup from 'reactjs-popup'
import { popupConfig } from '~/config/popupConfig'
import { CustomTooltip, Menu } from '../common'
import { HiDotsHorizontal } from 'react-icons/hi'
import MenuItem from '../common/MenuItem'

function SongMoreOptions() {
  const menuItems = [
    'Go to song radio',
    'Go to artist',
    'Go to album',
    'Show credits',
    <Popup
      key={1}
      trigger={
        <div className='border-t border-s-gray-3/70'>
          <MenuItem item='Add to playlist' />
        </div>
      }
      {...popupConfig}
      position='left top'
    >
      <Menu scroll items={['Hello', 'Hello', 'Hello', 'Hello', 'Hello']} />
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
