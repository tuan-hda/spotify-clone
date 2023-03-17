import { useMemo } from 'react'
import GradientBackground from '../components/common/GradientBackground'
import { ArtistList, List } from '~/components/list'

export default function Main() {
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

      <div className='mt-5 px-4 lg:px-8'>
        <List swrKey='recently-played' />
      </div>

      <div className='mt-5 px-4 lg:px-8'>
        <List swrKey='recently-played' />
      </div>
    </>
  )
}
