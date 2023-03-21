import classNames from 'classnames'
import { CustomTooltip } from '../common'
import { ReactComponent as Shuffle } from '~/assets/icons/Shuffle.svg'
import { ReactComponent as Repeat } from '~/assets/icons/Repeat.svg'
import { ReactComponent as RepeatOne } from '~/assets/icons/RepeatOne.svg'
import Previous from '~/assets/icons/Previous.png'
import Next from '~/assets/icons/Next.png'
import Play from '~/assets/icons/Play.png'
import Pause from '~/assets/icons/Pause.png'
import Button from './Button'
import { useSpotifyStore } from '~/store/spotify'
import { shallow } from 'zustand/shallow'
import useImmutableSWR from 'swr/immutable'

const Dot = () => <div className='absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-s-green-5' />

const ControlButtons = () => {
  const [player, device_id, playbackState, spotifyApi] = useSpotifyStore(
    (state) => [state.spotifyPlayer, state.deviceId, state.playbackState, state.spotifyApi],
    shallow
  )
  const { data } = useImmutableSWR('/get-immutable-last-track', async () =>
    spotifyApi.getMyRecentlyPlayedTracks({ limit: 1 })
  )

  const togglePlay = async () => {
    await player?.activateElement()
    if (!playbackState?.track_window.current_track && data?.body.items[0]) {
      spotifyApi.play({
        device_id,
        uris: [data.body.items[0].track.uri]
      })
    } else {
      player?.togglePlay()
    }
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

  const next = async () => {
    if (playbackState?.track_window.next_tracks.length === 0) {
      const oldTracks = [...playbackState.track_window.previous_tracks, playbackState.track_window.current_track]

      const res = await spotifyApi.getRecommendations({
        seed_tracks: [...oldTracks.map((track) => track.id || '')],
        limit: 1
      })

      spotifyApi.play({
        device_id,
        uris: [...oldTracks.map((track) => track.uri), res.body.tracks[0].uri],
        offset: {
          position: oldTracks.length
        }
      })
    } else {
      player?.nextTrack()
    }
  }

  return (
    <>
      {/* Shuffle */}
      <CustomTooltip content={playbackState?.shuffle ? 'Disable shuffle' : 'Enable shuffle'}>
        <Button padding='4px' onClick={() => spotifyApi.setShuffle(!playbackState?.shuffle)}>
          <Shuffle className={classNames(playbackState?.shuffle ? 'fill-s-green-5' : 'fill-white')} />
          {playbackState?.shuffle && <Dot />}
        </Button>
      </CustomTooltip>

      {/* Previous */}
      <CustomTooltip content='Previous track'>
        <Button src={Previous} onClick={() => player?.previousTrack()} className='h-[14px] w-[14px]' />
      </CustomTooltip>

      {/* Play */}
      <button className='mx-2 flex cursor-auto hover:scale-[1.07]' onClick={togglePlay}>
        <img src={!playbackState || playbackState.paused ? Play : Pause} alt='Shuffle' className='m-auto h-8 w-8' />
      </button>

      {/* Next */}
      <CustomTooltip content='Next track'>
        <Button src={Next} onClick={next} className='h-[14px] w-[14px]' />
      </CustomTooltip>

      {/* Repeat */}
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
    </>
  )
}

export default ControlButtons
