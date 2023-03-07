import { ArtistSkeleton } from "components/skeleton"
import { useRef } from "react"
import { Scrollbars } from "react-custom-scrollbars"
import { useScrollPosition } from "store/scrollPosition"
import { shallow } from "zustand/shallow"

export default function Main() {
  const ref = useRef<Scrollbars>(null)
  const setTop = useScrollPosition((state) => state.setTop)

  const handleScroll = () => {
    setTop(ref.current?.getScrollTop() || 0)
  }

  return (
    <Scrollbars
      onScroll={handleScroll}
      ref={ref}
      className='custom-scrollbar-container -top-16 h-screen'
      renderThumbVertical={({ style, ...props }) => (
        <div
          {...props}
          className='custom-scrollbar bg-[#a6a6a6] bg-opacity-50  duration-300 hover:bg-[#ffffff] hover:bg-opacity-50'
        />
      )}
    >
      <div className='h-[332px] bg-gradient-to-b from-s-blue-2 to-s-black-3'>
        <div className='h-16' />
        <div className='px-8 py-6'>
          <h1 className='text-3xl font-black'>Good evening</h1>
          <div className='transition-color mt-[22px] grid grid-cols-3 gap-6'>
            <ArtistSkeleton />
            <ArtistSkeleton />
            <ArtistSkeleton />
            <ArtistSkeleton />
            <ArtistSkeleton />
            <ArtistSkeleton />
          </div>
        </div>
      </div>
    </Scrollbars>
  )
}
