import { useEffect, useState } from 'react'
import { useResize } from '~/hooks'
import ProgressBar from './ProgressBar'
import { useSpotifyStore } from '~/store/spotify'
import { shallow } from 'zustand/shallow'
import { convertMsToTime, convertToC } from '~/utils/utils'
import useImmutableSWR from 'swr/immutable'
import ControlButtons from './ControlButtons'

const Control = () => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const [spotifyApi, playbackState, spotifyPlayer] = useSpotifyStore(
    (state) => [state.spotifyApi, state.playbackState, state.spotifyPlayer],
    shallow
  )
  const { data } = useImmutableSWR('/get-immutable-last-track', async () =>
    spotifyApi.getMyRecentlyPlayedTracks({ limit: 1 })
  )

  const maxWidth = ref?.offsetWidth || 1
  const offsetLeft = ref?.offsetLeft || 0

  const { width, setWidth, active, startResize, onResize, stopResize } = useResize(0, maxWidth, 0, offsetLeft, ref)

  // Interval to increase progress bar
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined
    if (playbackState && !playbackState.paused) {
      setWidth(() => convertToC(playbackState.position, playbackState.duration, maxWidth))
      interval = setInterval(() => {
        setWidth((prev) =>
          convertToC(convertToC(prev, maxWidth, playbackState.duration) + 1000, playbackState.duration, maxWidth)
        )
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [maxWidth, setWidth, playbackState])

  const pos = convertMsToTime(convertToC(width, maxWidth, playbackState?.duration))
  const duration = convertMsToTime(playbackState?.duration || data?.body.items.at(0)?.track.duration_ms || 0)

  const onStopResize = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (stopResize(e)) {
      const newPos = convertToC(width, maxWidth, playbackState?.duration)
      await spotifyPlayer?.seek(newPos)
    }
  }

  return (
    <div
      className='col-span-4 flex h-full flex-1 flex-col justify-center gap-2'
      role='presentation'
      onMouseUp={onStopResize}
      onMouseMove={onResize}
    >
      {/* Control Buttons */}
      <div className='mx-auto flex select-none gap-2'>
        <ControlButtons />
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
        <span className='w-10 text-ss font-light text-s-gray-7'>{duration}</span>
      </div>
    </div>
  )
}

export default Control
