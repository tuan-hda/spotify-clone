import useStyleStore from '~/store/style'
import { useCallback, useRef, useState } from 'react'
import ColorThief from 'colorthief'
import { rgbToHex } from '~/utils/utils'
import LazyLoad from 'react-lazy-load'
import { shallow } from 'zustand/shallow'
import tinycolor from 'tinycolor2'
import PlayButton from '../common/PlayButton'

interface Props extends SpotifyApi.SingleArtistResponse {
  isDefault?: boolean
}

const Artist = ({ images, name, isDefault = false }: Props) => {
  const [dominantColor, setDominantColor] = useState<string>('#000')
  const [setDashboardStartColor, setDefaultStartColor] = useStyleStore(
    (state) => [state.setDashboardStartColor, state.setDefaultStartColor],
    shallow
  )
  const ref = useRef(null)

  const onMouseEnter = useCallback(() => {
    setDashboardStartColor(dominantColor)
  }, [dominantColor, setDashboardStartColor])

  const onMouseLeave = useCallback(() => {
    setDashboardStartColor('')
  }, [setDashboardStartColor])

  const onLoad = useCallback(() => {
    try {
      const colorThief = new ColorThief()
      const img = ref.current
      const result = colorThief.getColor(img, 25)
      const hex = rgbToHex(result[0], result[1], result[2])
      const darkerHex = tinycolor(hex).darken(30).toHexString()
      setDominantColor(darkerHex)
      if (isDefault) {
        setDefaultStartColor(darkerHex)
      }
    } catch (error) {
      console.log(error)
    }
  }, [isDefault, setDefaultStartColor])

  return (
    <div
      className='group flex cursor-pointer select-none items-center gap-4 overflow-hidden rounded bg-white bg-opacity-10 shadow-s-2 transition duration-300 hover:bg-opacity-20'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <LazyLoad>
        <img
          draggable={false}
          crossOrigin='anonymous'
          ref={ref}
          src={images.at(0)?.url}
          alt={name}
          className='h-16 w-16 object-cover shadow-s-1 xl:h-20 xl:w-20'
          onLoad={onLoad}
        />
      </LazyLoad>
      <p className='text-base font-bold'>{name}</p>

      <PlayButton className='ml-auto mr-4' />
    </div>
  )
}

export default Artist
