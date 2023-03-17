import ArtistListSkeleton from './ArtistListSkeleton'
import CardSkeleton from './CardSkeleton'
import LineSkeleton from './LineSkeleton'

const MainSkeleton = () => {
  return (
    <>
      <div className='h-16' />

      <div className='mt-5 px-4 lg:px-8 '>
        <LineSkeleton className='h-16 w-[500px]' />
        <ArtistListSkeleton />
      </div>

      <div className='mt-5 px-4 lg:px-8'>
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
        <LineSkeleton className='mt-5 h-6 w-64' />
        <div className='mt-5 grid grid-cols-5 gap-6'>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>

      <div className='px-4 lg:px-8'>
        <LineSkeleton className='mt-5 h-6 w-64' />
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

export default MainSkeleton
