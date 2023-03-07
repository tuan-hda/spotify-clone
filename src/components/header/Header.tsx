import { useSpotifyStore } from "store/spotify"
import { AiFillCaretDown } from "react-icons/ai"
import HistoryButton from "./HistoryButton"
import { useMemo } from "react"
import { useScrollPosition } from "store/scrollPosition"
import classNames from "classnames"

const OPAQUE_POINT = 280

const Header = () => {
  const user = useSpotifyStore((state) => state.user)
  const top = useScrollPosition((state) => state.top)
  const opacity = useMemo(() => Math.min(top / OPAQUE_POINT, 1), [top])

  const style = useMemo(() => {
    return {
      "--tw-bg-opacity": opacity,
    }
  }, [top]) as React.CSSProperties

  return (
    <header className='pointer-events-none sticky z-[1] flex w-auto flex-1 gap-4 bg-[#2E3D5A] py-4 px-8' style={style}>
      <HistoryButton type='back' />
      <HistoryButton type='forward' />

      <button
        className='pointer-events-auto ml-auto flex h-8 w-[180px] items-center gap-[6px] rounded-full bg-[#0D1118] hover:bg-s-gray-2'
        data-tooltip-target='tooltip-user-fullname'
      >
        <img src={user?.images?.at(0)?.url} alt='User Avatar' className='w-8 max-w-full rounded-full p-0.5' />
        <span className='overflow-hidden text-ellipsis whitespace-nowrap font-bold'>{user?.display_name}</span>
        <AiFillCaretDown className='ml-auto mr-1 w-6 text-white' />
      </button>
      <div
        id='tooltip-user-fullname'
        role='tooltip'
        className='tooltip invisible absolute z-10 inline-block rounded-lg bg-s-gray-2 px-2 py-[6px] text-sm font-medium text-white opacity-0 shadow-lg shadow-black/50 transition-opacity duration-300'
      >
        {user?.display_name}
      </div>
    </header>
  )
}

export default Header
