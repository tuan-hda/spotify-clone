import { useEffect, useState } from 'react'
import Shuffle from '~/assets/icons/Shuffle.png'
import Previous from '~/assets/icons/Previous.png'
import Next from '~/assets/icons/Next.png'
import Play from '~/assets/icons/Play.png'
import Pause from '~/assets/icons/Pause.png'
import Repeat from '~/assets/icons/Repeat.png'
import { useResize } from '~/hooks'
import Button from './Button'
import ProgressBar from './ProgressBar'
import { useSpotifyStore } from '~/store/spotify'
import loadPlayer from '~/utils/loadPlayer'
import { shallow } from 'zustand/shallow'
import { convertMsToTime, convertToMs, convertToWidth } from '~/utils/utils'

const Control = () => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const [player, spotifyApi, accessToken, playbackState, spotifyPlayer] = useSpotifyStore(
    (state) => [state.spotifyPlayer, state.spotifyApi, state.accessToken, state.playbackState, state.spotifyPlayer],
    shallow
  )

  const maxWidth = ref?.offsetWidth || 1
  const offsetLeft = ref?.offsetLeft || 0

  const { width, setWidth, active, startResize, onResize, stopResize } = useResize(
    0,
    maxWidth,
    convertToWidth(playbackState?.position, playbackState?.duration, maxWidth),
    offsetLeft
  )

  const togglePlay = async () => {
    loadPlayer(true, spotifyApi, accessToken)
    player?.togglePlay()
  }

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined
    if (playbackState && !playbackState.paused) {
      interval = setInterval(() => {
        setWidth((prev) =>
          convertToWidth(convertToMs(prev, maxWidth, playbackState.duration) + 1000, playbackState.duration, maxWidth)
        )
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [maxWidth, setWidth, playbackState])

  const pos = convertMsToTime(convertToMs(width, maxWidth, playbackState?.duration))

  const onStopResize = async () => {
    await spotifyPlayer?.seek(convertToMs(width, maxWidth, playbackState?.duration))
    stopResize()
  }

  return (
    <div
      className='col-span-4 flex h-full flex-1 flex-col justify-center gap-2'
      role='presentation'
      onMouseUp={onStopResize}
      onMouseMove={onResize}
    >
      {/* Control Bar */}
      <div className='mx-auto flex select-none gap-2'>
        <Button src={Shuffle} />
        <Button src={Previous} className='h-[14px] w-[14px]' />
        <button className='mx-2 flex cursor-auto hover:scale-[1.07]' onClick={togglePlay}>
          <img src={!playbackState || playbackState.paused ? Play : Pause} alt='Shuffle' className='m-auto h-8 w-8' />
        </button>
        <Button src={Next} className='h-[14px] w-[14px]' />
        <Button src={Repeat} />
      </div>

      {/* Progress Bar Section */}
      <div className='flex items-center gap-2'>
        <span className='w-10 text-right text-ss font-light text-s-gray-7'>{pos}</span>
        <ProgressBar
          active={active}
          offsetLeft={offsetLeft}
          maxWidth={maxWidth}
          setRef={setRef}
          setWidth={setWidth}
          startResize={startResize}
          width={width}
        />
        <span className='w-10 text-ss font-light text-s-gray-7'>{convertMsToTime(playbackState?.duration || 0)}</span>
      </div>
    </div>
  )
}

export default Control
