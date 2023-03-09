import { useSpotifyStore } from '~/store/spotify'
import { AiFillCaretDown } from 'react-icons/ai'
import HistoryButton from './HistoryButton'
import { useMemo } from 'react'
import { useScrollPosition } from '~/store/scrollPosition'
import useSWR from 'swr'

const OPAQUE_POINT = 280

const Header = () => {
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const { data: user, isLoading } = useSWR('/get-me', async () => spotifyApi.getMe())
  const top = useScrollPosition((state) => state.top)
  const opacity = useMemo(() => Math.min(top / OPAQUE_POINT, 1), [top])

  const style = useMemo(() => {
    return {
      '--tw-bg-opacity': opacity
    }
  }, [opacity]) as React.CSSProperties

  if (isLoading) return null

  return (
    <header className='pointer-events-none sticky z-[1] flex w-auto flex-1 gap-4 bg-[#2E3D5A] py-4 px-8' style={style}>
      <HistoryButton type='back' />
      <HistoryButton type='forward' />

      <button
        className='pointer-events-auto ml-auto flex h-8 w-[180px] items-center gap-[6px] rounded-full bg-[#0D1118] hover:bg-s-gray-2'
        data-tooltip-target='tooltip-user-fullname'
      >
        <img src={user?.body?.images?.at(0)?.url} alt='User Avatar' className='w-8 max-w-full rounded-full p-0.5' />
        <span className='overflow-hidden text-ellipsis whitespace-nowrap font-bold'>{user?.body?.display_name}</span>
        <AiFillCaretDown className='ml-auto mr-1 w-6 text-white' />
      </button>
      <div
        id='tooltip-user-fullname'
        role='tooltip'
        className='tooltip invisible absolute z-10 inline-block rounded-lg bg-s-gray-2 px-2 py-[6px] text-sm font-medium text-white opacity-0 shadow-lg shadow-black/50 transition-opacity duration-300'
      >
        {user?.body?.display_name}
      </div>
    </header>
  )
}

export default Header
