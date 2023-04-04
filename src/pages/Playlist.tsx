import { ReactComponent as PlaylistSvg } from 'assets/icons/Playlist.svg'
import { ReactComponent as EditSvg } from 'assets/icons/Edit.svg'
import { CustomLink, CustomTooltip, Divider, Menu } from '~/components/common'
import FallbackUserImg from 'assets/icons/User.png'
import { HiDotsHorizontal } from 'react-icons/hi'
import { default as Popup } from 'reactjs-popup'
import { useState } from 'react'

const Playlist = () => {
  const menuItems = ['Go to playlist radio', 'Remove from profile', 'Delete', 'About recommendations']
  const [hover, setHover] = useState(false)

  return (
    <>
      <div className='-top-16 flex h-[340px] items-end bg-gradient-to-b from-[#535353] to-[#2C2C2C] pb-6'>
        {/* Image */}
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className='mx-8 flex h-[192px] w-[192px] flex-col items-center justify-center gap-2 bg-s-gray-2 shadow-s-5 xl:h-[232px] xl:w-[232px]'
        >
          {hover ? (
            <>
              <EditSvg height='50px' width='50px' fill='#fff' />
              <p className='text-base text-white'>Choose photo</p>
            </>
          ) : (
            <PlaylistSvg fill='#757575' height='64px' width='64px' />
          )}
        </div>

        {/* Description */}
        <div className='ml-6'>
          <p className='text-sm font-black text-white'>Playlist</p>
          <h1 className='mt-4 text-8xl font-bold tracking-tighter text-white'>New Playlist</h1>
          <div className='mt-5 flex items-center gap-1'>
            {/* Avatar */}
            <img
              src={
                'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2111420632460477&height=50&width=50&ext=1683173727&hash=AeTGZBQqu0cTCV9B26M' ??
                FallbackUserImg
              }
              alt='User Avatar'
              className='h-6 w-6 rounded-full'
            />
            <CustomLink to='#' className='font-bold text-white hover:underline'>
              Hoàng Đình Anh Tuấn
            </CustomLink>
          </div>
        </div>
      </div>

      {/* Body */}
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
    </>
  )
}

export default Playlist
