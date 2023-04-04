import { useSpotifyStore } from '~/store/spotify'
import { AiFillCaretDown } from 'react-icons/ai'
import HistoryButton from './HistoryButton'
import { useMemo } from 'react'
import { useScrollPosition } from '~/store/scrollPosition'
import useSWR from 'swr'
import useStyleStore from '~/store/style'
import { shallow } from 'zustand/shallow'
import { hexWithOpacityToRgba } from '~/utils/utils'
import DefaultAvatar from 'assets/img/default_avatar.png'
import { CustomTooltip, Menu, MenuButton } from '~/components/common'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'
import { paths } from '~/config/routes'
import { default as Popup } from 'reactjs-popup'
import { logout } from '~/api/spotify.api'
import { ReactComponent as NewTab } from 'assets/icons/NewTab.svg'

const Header = () => {
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const [dashboardStartColor, defaultStartColor] = useStyleStore(
    (state) => [state.dashboardStartColor, state.defaultStartColor],
    shallow
  )
  const { data: user } = useSWR('/get-me', async () => spotifyApi.getMe())

  const location = useLocation()
  const excludePaths = useMemo(
    () => [
      paths.searchValue.path,
      paths.searchAlbum.path,
      paths.searchArtist.path,
      paths.searchPlaylist.path,
      paths.searchSong.path
    ],
    []
  )
  const navigate = useNavigate()

  const top = useScrollPosition((state) => state.top)
  const opacity = useMemo(() => {
    const opaquePoint = excludePaths.find((path) => matchPath(path, location.pathname)) ? 50 : 280
    return Math.min(top / opaquePoint, 1)
  }, [excludePaths, location.pathname, top])

  const style = useMemo(() => {
    return {
      backgroundColor:
        location.pathname !== '/' ? '#0b0b0b' : hexWithOpacityToRgba(dashboardStartColor || defaultStartColor),
      opacity
    }
  }, [location.pathname, dashboardStartColor, defaultStartColor, opacity]) as React.CSSProperties

  const clearSession = useSpotifyStore((state) => state.clearSession)
  const handleLogout = async () => {
    try {
      await logout()
      clearSession()
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const menuItems = [
    <MenuButton key={1}>
      Account <NewTab fill='#fff' />
    </MenuButton>,
    'Profile',
    'Settings',
    <MenuButton key={2} onClick={handleLogout}>
      Log out
    </MenuButton>
  ]

  return (
    <div className='sticky z-[2]'>
      <div className='pointer-events-none absolute h-16 w-full flex-1 transition-colors duration-700' style={style} />
      <header className='relative z-[2] flex w-auto gap-4 bg-transparent py-4 px-4 lg:px-8'>
        <HistoryButton type='back' />
        <HistoryButton type='forward' />

        <div className='m-auto' />

        <Popup
          keepTooltipInside
          trigger={
            <div>
              <CustomTooltip content={user?.body.display_name}>
                <button
                  data-dropdown-toggle='dropdown'
                  className='pointer-events-auto ml-auto flex h-8 w-fit max-w-[180px] items-center gap-[6px] rounded-full bg-black bg-opacity-90 hover:bg-s-gray-2'
                >
                  <img
                    src={user?.body?.images?.at(0)?.url || DefaultAvatar}
                    alt='User Avatar'
                    loading='lazy'
                    className='aspect-square h-full flex-shrink-0 rounded-full p-0.5'
                  />
                  <span className='hidden overflow-hidden text-ellipsis whitespace-nowrap font-bold xl:inline'>
                    {user?.body?.display_name}
                  </span>
                  <AiFillCaretDown className='ml-auto mr-1 hidden w-6 text-white xl:inline' />
                </button>
              </CustomTooltip>
            </div>
          }
          position='bottom right'
          on='click'
          closeOnDocumentClick
          contentStyle={{ padding: '0px', border: 'none', background: 'transparent', boxShadow: 'none' }}
          arrow={false}
        >
          <Menu items={menuItems} dividerIndexes={[2]} />
        </Popup>
      </header>
    </div>
  )
}

export default Header
