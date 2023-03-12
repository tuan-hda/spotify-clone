import { LineSkeleton, CardSkeleton, ArtistListSkeleton } from '~/components/skeleton'
import { useRef, useCallback, Suspense, useMemo } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { useScrollPosition } from '~/store/scrollPosition'
import ArtistList from '../list/ArtistList'
import GradientBackground from './GradientBackground'

export default function Main() {
  const ref = useRef<Scrollbars>(null)
  const setTop = useScrollPosition((state) => state.setTop)

  const handleScroll = useCallback(() => {
    setTop(ref.current?.getScrollTop() || 0)
  }, [setTop])

  const greeting = useMemo(() => {
    const midday = new Date()
    const evening = new Date()
    midday.setHours(12, 0, 0)
    evening.setHours(18, 0, 0)
    const current = new Date()

    if (current < midday) return 'morning'
    if (current < evening) return 'afternoon'
    return 'evening'
  }, [])

  return (
    <Scrollbars
      onScroll={handleScroll}
      ref={ref}
      className='custom-scrollbar-container -top-16'
      renderThumbVertical={({ ...props }) => (
        <div
          {...props}
          className='custom-scrollbar bg-[#a6a6a6] bg-opacity-50 transition-opacity hover:bg-[#ffffff] hover:bg-opacity-50'
        />
      )}
    >
      <GradientBackground>
        <div className='h-16' />
        <div className='px-4 py-6 lg:px-8'>
          <h1 className='text-3xl font-black'>Good {greeting}</h1>
          <Suspense fallback={<ArtistListSkeleton />}>
            <ArtistList />
          </Suspense>
        </div>
      </GradientBackground>

      <div className='px-4 lg:px-8'>
        <LineSkeleton className='mt-10 h-6 w-64' />
        <div className='mt-5 grid grid-cols-5 gap-6'>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>

      <div className='px-4 lg:px-8'>
        <LineSkeleton className='mt-10 h-6 w-64' />
        <div className='mt-5 grid grid-cols-5 gap-6'>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>

      <div className='px-4 lg:px-8'>
        <LineSkeleton className='mt-10 h-6 w-64' />
        <div className='mt-5 grid grid-cols-5 gap-6'>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>

      <div className='px-4 lg:px-8'>
        <LineSkeleton className='mt-10 h-6 w-64' />
        <div className='mt-5 grid grid-cols-5 gap-6'>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </Scrollbars>
  )
}
