import Like from '~/assets/icons/Like.png'

const Track = () => {
  return (
    <div className='col-span-3 flex h-14 items-center gap-[15px]'>
      <img
        src='https://i.scdn.co/image/ab67616d00004851bc16d1eefe86b079c8805f8f'
        className='aspect-square h-full flex-shrink-0 object-cover'
        alt='Current Track'
      />

      <div>
        <h5 className='overflow-hidden text-ellipsis whitespace-nowrap text-sm text-white'>Suzume</h5>
        <p className='overflow-hidden text-ellipsis whitespace-nowrap text-ss font-light text-s-gray-5'>
          RADWIMPS, Toaka
        </p>
      </div>

      <div className='ml-1 flex-shrink-0'>
        <button className='flex h-8 w-8 cursor-auto brightness-75 hover:brightness-100'>
          <img className='m-auto h-4' src={Like} alt='Like Button' />
        </button>
      </div>
    </div>
  )
}

export default Track
