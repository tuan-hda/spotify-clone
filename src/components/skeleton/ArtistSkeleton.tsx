import LineSkeleton from './LineSkeleton'

const ArtistSkeleton = () => {
  return (
    <div className='flex items-center gap-4 overflow-hidden rounded bg-s-gray-4 bg-opacity-10 shadow-s-2'>
      <div className='animate-shine h-20 w-20 bg-s-gray-3 shadow-s-1' />
      <LineSkeleton className='mx-4 h-6 flex-1' />
    </div>
  )
}

export default ArtistSkeleton
