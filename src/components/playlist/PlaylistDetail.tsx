import { default as Popup } from 'reactjs-popup'
import { CustomTooltip, Divider, Menu } from '~/components/common'
import { HiDotsHorizontal } from 'react-icons/hi'

const PlaylistDetail = () => {
  const menuItems = ['Go to playlist radio', 'Remove from profile', 'Delete', 'About recommendations']

  return (
    <div className='h-[232px] w-[calc(100%+64px)] bg-gradient-to-b from-[#212121] to-s-black-3 px-8'>
      <div className='h-5' />

      <Popup
        position='bottom left'
        keepTooltipInside
        closeOnDocumentClick
        repositionOnResize
        trigger={
          <div className='w-fit'>
            <CustomTooltip content='More options for New Playlist'>
              <button className='cursor-default py-1 outline-0 brightness-50 hover:brightness-100'>
                <HiDotsHorizontal className='h-6 w-6' />
              </button>
            </CustomTooltip>
          </div>
        }
        contentStyle={{
          marginLeft: '-4px',
          marginTop: '-8px',
          background: 'transparent',
          border: 0,
          boxShadow: 'none'
        }}
        arrow={false}
        on='click'
      >
        <Menu items={menuItems} />
      </Popup>
      <Divider className='mt-12 bg-black' />
    </div>
  )
}

export default PlaylistDetail
