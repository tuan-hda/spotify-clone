import CardSkeleton from './CardSkeleton'
import LineSkeleton from './LineSkeleton'

const ListSkeleton = () => {
  return (
    <>
      <LineSkeleton className='mt-10 h-6 w-64' />
      <div className='autofill mt-5 gap-6'>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </>
  )
}

export default ListSkeleton
