import { LineSkeleton, CardSkeleton } from '~/components/skeleton'
import { useMemo } from 'react'
import GradientBackground from './GradientBackground'
import { ArtistList, List } from '~/components/list'
import { useSpotifyStore } from '~/store/spotify'

export default function Main() {
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)

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
    <>
      <GradientBackground>
        <div className='h-16' />
        <div className='px-4 py-6 lg:px-8'>
          <h1 className='text-3xl font-black tracking-tight'>Good {greeting}</h1>
          <ArtistList />
        </div>
      </GradientBackground>

      <div className='mt-10 px-4 lg:px-8 '>
        <List fn={async () => spotifyApi.getMyRecentlyPlayedTracks()} swrKey='recently-played' />
      </div>

      <div className='mt-10 px-4 lg:px-8'>
        <LineSkeleton className='h-6 w-64' />
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
    </>
  )
}
