import useStyleStore from '~/store/style'
import { useCallback, useEffect, useRef } from 'react'
import { shallow } from 'zustand/shallow'
import PlayButton from '../common/PlayButton'
import ViewAlbum from 'assets/icons/ViewAlbum.png'
import { useSpotifyStore } from '~/store/spotify'
import { darken } from 'polished'
import { useColor } from 'color-thief-react'

interface Props extends SpotifyApi.SingleArtistResponse {
  isDefault?: boolean
}

const Artist = ({ isDefault = false, ...props }: Props) => {
  const { images, name } = props
  const [setDashboardStartColor, setDefaultStartColor] = useStyleStore(
    (state) => [state.setDashboardStartColor, state.setDefaultStartColor],
    shallow
  )
  const [play] = useSpotifyStore((state) => [state.play], shallow)
  const ref = useRef<HTMLImageElement | null>(null)
  const image = images.at(0)?.url || ViewAlbum
  const { data: dominantData, loading } = useColor(image, 'hex', { crossOrigin: 'anonymous', quality: 1 })

  const dominantColor = darken(0.1, dominantData || '#000')

  const onMouseEnter = useCallback(() => {
    setDashboardStartColor(dominantColor)
  }, [dominantColor, setDashboardStartColor])

  const onMouseLeave = useCallback(() => {
    setDashboardStartColor('')
  }, [setDashboardStartColor])

  useEffect(() => {
    if (isDefault && !loading) {
      setDefaultStartColor(dominantColor)
    }
  }, [isDefault, dominantColor, setDefaultStartColor, loading])

  return (
    <div
      className='group flex cursor-pointer select-none items-center gap-4 overflow-hidden rounded bg-white bg-opacity-10 shadow-s-2 transition duration-300 hover:bg-opacity-20'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img
        draggable={false}
        crossOrigin='anonymous'
        ref={ref}
        src={image}
        alt={name}
        loading='lazy'
        className='h-16 w-16 object-cover shadow-s-1 xl:h-20 xl:w-20'
      />
      <p className='text-base font-bold'>{name}</p>

      <PlayButton onClick={() => play(props)} className='ml-auto mr-4' />
    </div>
  )
}

export default Artist
