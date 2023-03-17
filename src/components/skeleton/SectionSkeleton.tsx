import CardSkeleton from './CardSkeleton'
import LineSkeleton from './LineSkeleton'

const SectionSkeleton = () => {
  return (
    <>
      <div className='h-16' />
      <div className='px-4 py-5 lg:px-8'>
        <header className='flex items-baseline justify-between'>
          <LineSkeleton className='h-6 w-64' />
        </header>

        <div className='mt-5 grid grid-cols-5 gap-6 overflow-hidden'>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
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

export default SectionSkeleton
