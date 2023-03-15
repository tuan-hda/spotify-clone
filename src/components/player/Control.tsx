import { useEffect, useState } from 'react'
import { ReactComponent as Shuffle } from '~/assets/icons/Shuffle.svg'
import { ReactComponent as Repeat } from '~/assets/icons/Repeat.svg'
import { ReactComponent as RepeatOne } from '~/assets/icons/RepeatOne.svg'
import Previous from '~/assets/icons/Previous.png'
import Next from '~/assets/icons/Next.png'
import Play from '~/assets/icons/Play.png'
import Pause from '~/assets/icons/Pause.png'
import { useResize } from '~/hooks'
import Button from './Button'
import ProgressBar from './ProgressBar'
import { useSpotifyStore } from '~/store/spotify'
import loadPlayer from '~/utils/loadPlayer'
import { shallow } from 'zustand/shallow'
import { convertMsToTime, convertToC } from '~/utils/utils'
import useImmutableSWR from 'swr/immutable'
import classNames from 'classnames'
import { CustomTooltip } from '../common'

const Dot = () => <div className='absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-s-green-5' />

const Control = () => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const [player, spotifyApi, accessToken, playbackState, spotifyPlayer] = useSpotifyStore(
    (state) => [state.spotifyPlayer, state.spotifyApi, state.accessToken, state.playbackState, state.spotifyPlayer],
    shallow
  )
  const { data } = useImmutableSWR('/get-immutable-last-track', async () =>
    spotifyApi.getMyRecentlyPlayedTracks({ limit: 1 })
  )
  const maxWidth = ref?.offsetWidth || 1
  const offsetLeft = ref?.offsetLeft || 0

  const { width, setWidth, active, startResize, onResize, stopResize } = useResize(0, maxWidth, 0, offsetLeft, ref)

  const togglePlay = async () => {
    loadPlayer(true, spotifyApi, accessToken)
    player?.togglePlay()
  }

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined
    if (playbackState && !playbackState.paused) {
      interval = setInterval(() => {
        setWidth((prev) =>
          convertToC(convertToC(prev, maxWidth, playbackState.duration) + 1000, playbackState.duration, maxWidth)
        )
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [maxWidth, setWidth, playbackState])

  const pos = convertMsToTime(convertToC(width, maxWidth, playbackState?.duration))
  const duration = convertMsToTime(playbackState?.duration || data?.body.items.at(0)?.track.duration_ms || 0)

  const onStopResize = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (stopResize(e)) await spotifyPlayer?.seek(convertToC(width, maxWidth, playbackState?.duration))
  }

  const repeat = () => {
    if (playbackState?.repeat_mode === 0 && playbackState.context.uri) {
      spotifyApi.setRepeat('context')
    } else if (playbackState?.repeat_mode === 0 || playbackState?.repeat_mode === 1) {
      spotifyApi.setRepeat('track')
    } else {
      spotifyApi.setRepeat('off')
    }
  }

  const getRepeatTooltipMsg = () => {
    if (playbackState?.repeat_mode === 0 && playbackState.context.uri) return 'Enable repeat'
    if (playbackState?.repeat_mode === 0 || playbackState?.repeat_mode === 1) return 'Enable repeat one'
    return 'Disable repeat'
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
        <CustomTooltip content={playbackState?.shuffle ? 'Disable shuffle' : 'Enable shuffle'}>
          <Button padding='4px' onClick={() => spotifyApi.setShuffle(!playbackState?.shuffle)}>
            <Shuffle className={classNames(playbackState?.shuffle ? 'fill-s-green-5' : 'fill-white')} />
            {playbackState?.shuffle && <Dot />}
          </Button>
        </CustomTooltip>
        <CustomTooltip content='Previous track'>
          <Button src={Previous} onClick={() => spotifyPlayer?.previousTrack()} className='h-[14px] w-[14px]' />
        </CustomTooltip>
        <button className='mx-2 flex cursor-auto hover:scale-[1.07]' onClick={togglePlay}>
          <img src={!playbackState || playbackState.paused ? Play : Pause} alt='Shuffle' className='m-auto h-8 w-8' />
        </button>
        <CustomTooltip content='Next track'>
          <Button src={Next} onClick={() => spotifyPlayer?.nextTrack()} className='h-[14px] w-[14px]' />
        </CustomTooltip>
        <CustomTooltip content={getRepeatTooltipMsg()}>
          <Button padding='8px' onClick={repeat}>
            {playbackState?.repeat_mode === 2 ? (
              <RepeatOne className='fill-s-green-5' />
            ) : (
              <Repeat className={classNames('-mt-1', playbackState?.repeat_mode ? 'fill-s-green-5' : 'fill-white')} />
            )}
            {playbackState?.repeat_mode === 1 && <Dot />}
            {playbackState?.repeat_mode === 2 && <Dot />}
          </Button>
        </CustomTooltip>
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
