import { useSpotifyStore } from '~/store/spotify'
import { AiFillCaretDown } from 'react-icons/ai'
import HistoryButton from './HistoryButton'
import { useMemo } from 'react'
import { useScrollPosition } from '~/store/scrollPosition'
import useSWR from 'swr'
import LazyLoad from 'react-lazy-load'
import useStyleStore from '~/store/style'
import { shallow } from 'zustand/shallow'
import { hexWithOpacityToRgba } from '~/utils/utils'
import DefaultAvatar from '~/assets/img/default_avatar.png'
import { CustomTooltip } from '../common'
import { useLocation } from 'react-router-dom'

const OPAQUE_POINT = 280

const Header = () => {
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const [dashboardStartColor, defaultStartColor] = useStyleStore(
    (state) => [state.dashboardStartColor, state.defaultStartColor],
    shallow
  )
  const { data: user } = useSWR('/get-me', async () => spotifyApi.getMe())
  const location = useLocation()

  const top = useScrollPosition((state) => state.top)
  const opacity = useMemo(() => Math.min(top / OPAQUE_POINT, 1), [top])

  const style = useMemo(() => {
    return {
      backgroundColor:
        location.pathname !== '/' ? '#0b0b0b' : hexWithOpacityToRgba(dashboardStartColor || defaultStartColor),
      opacity
    }
  }, [opacity, dashboardStartColor, defaultStartColor, location]) as React.CSSProperties

  return (
    <div className='sticky z-[1]'>
      <div className='pointer-events-none absolute h-16 w-full flex-1 transition-colors duration-700' style={style} />
      <header className='relative z-[2] flex w-auto gap-4 bg-transparent py-4 px-4 lg:px-8'>
        <HistoryButton type='back' />
        <HistoryButton type='forward' />

        <div className='m-auto' />

        <CustomTooltip content={user?.body.display_name}>
          <button className='pointer-events-auto ml-auto flex h-8 w-fit items-center gap-[6px] rounded-full bg-black bg-opacity-90 hover:bg-s-gray-2 lg:w-[180px]'>
            <LazyLoad className='h-full flex-shrink-0 p-0.5'>
              <img
                src={user?.body?.images?.at(0)?.url || DefaultAvatar}
                alt='User Avatar'
                className='h-full w-full rounded-full'
              />
            </LazyLoad>
            <span className='hidden overflow-hidden text-ellipsis whitespace-nowrap font-bold lg:inline'>
              {user?.body?.display_name}
            </span>
            <AiFillCaretDown className='ml-auto mr-1 hidden w-6 text-white lg:inline' />
          </button>
        </CustomTooltip>
      </header>
    </div>
  )
}

export default Header
