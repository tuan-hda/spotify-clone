import LineSkeleton from './LineSkeleton'

const style = {
  '--bg-from': '#333',
  '--bg-to': '#444'
} as React.CSSProperties

const CardSkeleton = () => {
  return (
    <div className='rounded-md bg-s-black-4 px-4 py-5 pt-4'>
      <div style={style} className='animate-shine aspect-square rounded bg-s-gray-3 shadow-s-2' />
      <LineSkeleton className='mt-4 h-6' />
      <LineSkeleton className='mt-2 h-5 w-24' />
    </div>
  )
}

export default CardSkeleton
