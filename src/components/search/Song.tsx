import classNames from 'classnames'
import { MdPlayArrow, MdOutlinePause } from 'react-icons/md'
import { shallow } from 'zustand/shallow'
import { useSpotifyStore } from '~/store/spotify'
import { convertMsToTime } from '~/utils/utils'
import { CustomTooltip } from '../common'
import ArtistCredit from '../common/ArtistCredit'
import { HiDotsHorizontal } from 'react-icons/hi'
import Like from '~/assets/icons/Like.png'

interface Props {
  track: SpotifyApi.TrackObjectFull
  index?: number
  paddingLeft?: string
  paddingRight?: string
  hideAlbum?: boolean
}

const Song = ({ track, index, paddingLeft, paddingRight, hideAlbum }: Props) => {
  const duration = convertMsToTime(track.duration_ms)
  const [spotifyApi, device_id, playbackState, player] = useSpotifyStore(
    (state) => [state.spotifyApi, state.deviceId, state.playbackState, state.spotifyPlayer],
    shallow
  )

  const play = async () => {
    await player?.activateElement()
    if (playbackState?.track_window.current_track.id !== track.id)
      await spotifyApi.play({
        device_id,
        uris: [track.uri]
      })
    else await player?.togglePlay()
  }

  const isCurrentPlaying = () => {
    return playbackState && !playbackState.paused && playbackState?.track_window.current_track.id === track.id
  }

  const getPlayTooltipContent = () => {
    let result = ` ${track.name} by ${track.artists.map((artist) => artist.name).join(', ')}`
    if (isCurrentPlaying()) result = 'Pause ' + result
    else result = 'Play ' + result
    return result
  }

  const ToggleButton = ({ disableToggle }: { disableToggle?: boolean }) => {
    let Element = MdPlayArrow
    if (isCurrentPlaying()) Element = MdOutlinePause
    return (
      <Element
        onClick={disableToggle ? undefined : play}
        className={classNames(
          'h-5 w-5 cursor-default text-white group-hover:block',
          index ? 'top-4' : 'absolute',
          isCurrentPlaying() ? 'block' : 'hidden'
        )}
      />
    )
  }

  return (
    <div
      key={track.id}
      className={classNames(
        'group relative grid cursor-default grid-cols-12 rounded py-[6px] px-2',
        isCurrentPlaying() ? 'bg-s-gray-13' : 'hover:bg-s-gray-9'
      )}
      style={{ paddingLeft, paddingRight }}
    >
      <div className='col-span-7 flex flex-shrink-0 items-center gap-[14px]'>
        {index && (
          <div className='w-5'>
            <p
              className={classNames(
                'text-center text-base text-s-gray-7 group-hover:hidden',
                isCurrentPlaying() && 'hidden'
              )}
            >
              {index}
            </p>
            <CustomTooltip content={getPlayTooltipContent()}>
              <ToggleButton />
            </CustomTooltip>
          </div>
        )}

        {/* Image */}
        <CustomTooltip raw={index} content={getPlayTooltipContent()}>
          <div
            className='flex h-10 w-10 flex-shrink-0 cursor-default items-center justify-center'
            role='presentation'
            onClick={play}
          >
            <img
              className={classNames('h-full w-full', !index && 'group-hover:brightness-50')}
              src={track.album.images[0].url}
              alt={track.name}
            />
            {!index && <ToggleButton disableToggle />}
          </div>
        </CustomTooltip>

        <div className='min-w-0 flex-1'>
          <h4 className={classNames('ellipsis text-base', isCurrentPlaying() && 'text-s-green-1')}>{track.name}</h4>
          <p className='ellipsis'>
            {track.artists.map((artist, index) => (
              <ArtistCredit disableColorChange={false} artist={artist} index={index} key={artist.id} />
            ))}
          </p>
        </div>
      </div>

      {/* Name, Album & Duration */}
      <div className='col-span-5 flex items-center'>
        <span className={classNames('ellipsis hidden text-s-gray-7 group-hover:text-white', !hideAlbum && 'lg:inline')}>
          {track.album.name}
        </span>

        <div className='min-w-0 flex-1' />

        <CustomTooltip content='Save to your library'>
          <button className='mt-1 ml-4 min-w-[18px] cursor-default opacity-0 brightness-75 hover:brightness-100 group-hover:opacity-100'>
            <img src={Like} alt='Save to library' className='h-4' />
          </button>
        </CustomTooltip>
        <span className='ml-8 text-s-gray-8'>{duration}</span>
        <CustomTooltip
          content={`More options for ${track.name} by ${track.album.artists.map((artist) => artist.name).join(', ')}`}
        >
          <button className='ml-3 mt-1 cursor-default opacity-0 group-hover:opacity-100'>
            <HiDotsHorizontal className='text-lg' />
          </button>
        </CustomTooltip>
      </div>
    </div>
  )
}

export default Song
