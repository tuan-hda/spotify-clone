import classNames from 'classnames'
import { MdPlayArrow, MdOutlinePause } from 'react-icons/md'
import { shallow } from 'zustand/shallow'
import { useSpotifyStore } from '~/store/spotify'
import { convertMsToTime } from '~/utils/utils'
import { CustomTooltip } from '../common'
import ArtistCredit from '../common/ArtistCredit'

interface Props {
  track: SpotifyApi.TrackObjectFull
}

const Song = ({ track }: Props) => {
  const duration = convertMsToTime(track.duration_ms)
  const [spotifyApi, device_id, playbackState, player] = useSpotifyStore(
    (state) => [state.spotifyApi, state.deviceId, state.playbackState, state.spotifyPlayer],
    shallow
  )

  const play = () => {
    player?.activateElement()
    if (playbackState?.track_window.current_track.id !== track.id)
      spotifyApi.play({
        device_id,
        uris: [track.uri]
      })
    else player?.togglePlay()
  }

  const isPlaying = () => {
    return playbackState && !playbackState.paused && playbackState?.track_window.current_track.id === track.id
  }

  const ToggleButton = () => {
    let Element = MdPlayArrow
    if (isPlaying()) Element = MdOutlinePause
    return <Element className='absolute hidden h-5 w-5 text-white group-hover:block' />
  }

  return (
    <div
      key={track.id}
      className={classNames(
        'group flex cursor-pointer items-center gap-[14px] rounded p-2',
        isPlaying() ? 'bg-s-gray-13' : 'hover:bg-s-gray-9'
      )}
    >
      <CustomTooltip
        content={`Play ${track.name} by ${track.artists.map((artist) => artist.name).join(', ')}`}
        arrow={false}
      >
        <div
          className='relative flex h-10 w-10 cursor-default items-center justify-center'
          role='presentation'
          onClick={play}
        >
          <img className='h-full w-full group-hover:brightness-50' src={track.album.images[0].url} alt={track.name} />
          <ToggleButton />
        </div>
      </CustomTooltip>
      <div>
        <h4 className={classNames('text-base', isPlaying() && 'text-s-green-1')}>{track.name}</h4>
        <p>
          {track.artists.map((artist, index) => (
            <ArtistCredit artist={artist} index={index} key={artist.id} />
          ))}
        </p>
      </div>
      <span className='ml-auto text-s-gray-8'>{duration}</span>
    </div>
  )
}

export default Song
