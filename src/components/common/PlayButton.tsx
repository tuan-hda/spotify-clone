import classNames from 'classnames'
import { BsFillPlayFill } from 'react-icons/bs'
import { MdOutlinePause } from 'react-icons/md'
import { useSpotifyStore } from '~/store/spotify'

type Props = JSX.IntrinsicElements['button'] & {
  isCurrentPlaying?: boolean | null
}

const PlayButton = ({ isCurrentPlaying, ...props }: Props) => {
  const spotifyPlayer = useSpotifyStore((state) => state.spotifyPlayer)

  const onClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    await spotifyPlayer?.activateElement()
    props.onClick && props.onClick(e)
  }

  return (
    <button
      {...props}
      onClick={onClick}
      className={classNames(
        'flex h-12 w-12 rounded-full bg-s-green-1 shadow-lg shadow-black/40 transition-all duration-300 hover:scale-105 hover:bg-s-green-6 hover:transition-none group-hover:opacity-100',
        props.className,
        !isCurrentPlaying && 'opacity-0'
      )}
    >
      {isCurrentPlaying ? (
        <MdOutlinePause className='m-auto h-7 w-7 text-black' />
      ) : (
        <BsFillPlayFill className='my-auto ml-[11px] h-7 w-7 text-black' />
      )}{' '}
    </button>
  )
}

export default PlayButton
