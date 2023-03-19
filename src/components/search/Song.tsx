import classNames from 'classnames'
import { MdPlayArrow, MdOutlinePause } from 'react-icons/md'
import { shallow } from 'zustand/shallow'
import { useSpotifyStore } from '~/store/spotify'
import { convertMsToTime } from '~/utils/utils'
import { CustomTooltip } from '../common'
import ArtistCredit from '../common/ArtistCredit'
import { HiDotsHorizontal } from 'react-icons/hi'

interface Props {
  track: SpotifyApi.TrackObjectFull
  index?: number
  paddingLeft?: string
  paddingRight?: string
  enableMore?: boolean
}

const Song = ({ track, enableMore, index, paddingLeft, paddingRight }: Props) => {
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
    return (
      <Element
        onClick={play}
        className={classNames(
          'hidden h-5 w-5 cursor-default text-white group-hover:block',
          index ? 'top-4' : 'absolute'
        )}
      />
    )
  }

  const ImageWrapper = ({ children }: { children: React.ReactNode }) => {
    if (index) return <>{children}</>
    return (
      <CustomTooltip
        content={`Play ${track.name} by ${track.artists.map((artist) => artist.name).join(', ')}`}
        arrow={false}
      >
        {children}
      </CustomTooltip>
    )
  }

  return (
    <div
      key={track.id}
      className={classNames(
        'group relative grid cursor-default grid-cols-12 rounded py-[6px]',
        isPlaying() ? 'bg-s-gray-13' : 'hover:bg-s-gray-9'
      )}
      style={{ paddingLeft, paddingRight }}
    >
      <div className='col-span-7 flex flex-shrink-0 items-center gap-[14px]'>
        {index && (
          <div className='w-5'>
            <p className='text-center text-base text-s-gray-7 group-hover:hidden'>{index}</p>
            <CustomTooltip
              content={`Play ${track.name} by ${track.artists.map((artist) => artist.name).join(', ')}`}
              arrow={false}
            >
              <ToggleButton />
            </CustomTooltip>
          </div>
        )}

        {/* Image */}
        <ImageWrapper>
          <div
            className='flex h-10 w-10 flex-shrink-0 cursor-default items-center justify-center'
            role='presentation'
            onClick={index ? undefined : play}
          >
            <img
              className={classNames('h-full w-full', !index && 'group-hover:brightness-50')}
              src={track.album.images[0].url}
              alt={track.name}
            />
            {!index && <ToggleButton />}
          </div>
        </ImageWrapper>

        <div className='min-w-0 flex-1'>
          <h4 className={classNames('ellipsis text-base', isPlaying() && 'text-s-green-1')}>{track.name}</h4>
          <p className='ellipsis'>
            {track.artists.map((artist, index) => (
              <ArtistCredit disableColorChange={false} artist={artist} index={index} key={artist.id} />
            ))}
          </p>
        </div>
      </div>

      <div className='col-span-5 flex items-center'>
        <span className='ellipsis hidden text-s-gray-7 group-hover:text-white lg:inline'>{track.album.name}</span>
        <span className='ml-auto text-s-gray-8'>{duration}</span>
        {enableMore && (
          <CustomTooltip
            content={`More options for ${track.name} by ${track.album.artists.map((artist) => artist.name).join(', ')}`}
          >
            <button className='ml-2 mt-1 opacity-0 group-hover:opacity-100'>
              <HiDotsHorizontal className='text-lg' />
            </button>
          </CustomTooltip>
        )}
      </div>
    </div>
  )
}

export default Song
