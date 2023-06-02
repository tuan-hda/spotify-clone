import classNames from 'classnames'
import { BsFillPlayFill } from 'react-icons/bs'
import { MdOutlinePause } from 'react-icons/md'
import { useSpotifyStore } from '~/store/spotify'

type Props = JSX.IntrinsicElements['button'] & {
  isCurrentPlaying?: boolean | null
  noDisappear?: boolean
  size?: 'normal' | 'big'
}

const PlayButton = ({ isCurrentPlaying, noDisappear, size = 'normal', ...props }: Props) => {
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
        'flex rounded-full bg-s-green-1 shadow-lg shadow-black/40 transition-all duration-300 hover:scale-105 hover:bg-s-green-6 hover:transition-none group-hover:opacity-100',
        props.className,
        {
          'opacity-0': !isCurrentPlaying && !noDisappear
        },
        {
          'h-12 w-12': size === 'normal',
          'h-14 w-14': size === 'big'
        }
      )}
    >
      {isCurrentPlaying ? (
        <MdOutlinePause className={classNames('m-auto text-black', size === 'normal' ? 'h-7 w-7' : 'h-8 w-8')} />
      ) : (
        <BsFillPlayFill className={classNames('m-auto text-black', size === 'normal' ? 'h-7 w-7' : 'h-8 w-8')} />
      )}
    </button>
  )
}

export default PlayButton
