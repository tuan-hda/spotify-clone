import ArtistSkeleton from './ArtistSkeleton'

const ArtistListSkeleton = () => {
  return (
    <div className='transition-color mt-[22px] grid grid-cols-1 gap-y-3 gap-x-6 lg:grid-cols-2 lg:gap-y-4 xl:grid-cols-3'>
      {Array(6)
        .fill('')
        .map((_, index) => (
          <ArtistSkeleton key={index} />
        ))}
    </div>
  )
}

export default ArtistListSkeleton
