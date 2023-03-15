import classNames from 'classnames'
import { BsFillPlayFill } from 'react-icons/bs'

const PlayButton = (props: JSX.IntrinsicElements['button']) => {
  return (
    <button
      {...props}
      className={classNames(
        'flex h-12 w-12 rounded-full bg-s-green-1 opacity-0 shadow-lg shadow-black/40 transition-all duration-300 hover:scale-105 hover:transition-none group-hover:opacity-100',
        props.className
      )}
    >
      <BsFillPlayFill className='my-auto ml-[11px] h-7 w-7 text-black' />
    </button>
  )
}

export default PlayButton
