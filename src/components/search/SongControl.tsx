import classNames from 'classnames'
import { shallow } from 'zustand/shallow'
import { useSpotifyStore } from '~/store/spotify'
import { CustomTooltip } from '../common'
import ArtistCredit from '../common/ArtistCredit'
import Bars from 'assets/icons/Bars.gif'
import { MdPlayArrow, MdOutlinePause } from 'react-icons/md'

interface Props {
  isSongTab?: boolean
  track: SpotifyApi.TrackObjectFull
  isCurrent: () => boolean
  pauseButton: 'bars' | 'pause'
  index: number
  selected: number
  find?: boolean
}

const SongControl = ({ selected, find, index, pauseButton, isSongTab, track, isCurrent }: Props) => {
  const [spotifyApi, device_id, playbackState, player] = useSpotifyStore(
    (state) => [state.spotifyApi, state.deviceId, state.playbackState, state.spotifyPlayer],
    shallow
  )

  const play = async () => {
    await player?.activateElement()
    console.log(track.id)
    if (playbackState?.track_window.current_track.id !== track.id)
      await spotifyApi.play({
        device_id,
        uris: [track.uri]
      })
    else await player?.togglePlay()
  }

  const isCurrentPlaying = () => {
    return isCurrent() && playbackState && !playbackState.paused
  }

  const getPlayTooltipContent = () => {
    let result = ` ${track.name} by ${track.artists.map((artist) => artist.name).join(', ')}`
    if (isCurrentPlaying()) result = 'Pause ' + result
    else result = 'Play ' + result
    return result
  }

  const ToggleButton = ({ disableToggle }: { disableToggle?: boolean }) => {
    let Element = MdPlayArrow
    if (isCurrentPlaying())
      Element =
        pauseButton === 'bars' && isSongTab
          ? () => <img src={Bars} className='h-[15px] w-[15px]' alt='Music Bars' />
          : MdOutlinePause
    return (
      <div className={classNames(isSongTab ? 'ml-1' : 'absolute')}>
        <Element
          onClick={disableToggle ? undefined : play}
          className={classNames(
            'h-5 w-5 cursor-default text-white group-hover:block',

            isCurrentPlaying() ? 'block' : 'hidden'
          )}
        />
      </div>
    )
  }

  return (
    <div className='col-span-7 flex flex-shrink-0 items-center gap-4'>
      {isSongTab && !find && (
        <div className='flex w-5 justify-end'>
          <p className={classNames('text-base text-s-gray-7 group-hover:hidden', isCurrentPlaying() && 'hidden')}>
            {index + 1}
          </p>
          <CustomTooltip content={getPlayTooltipContent()}>
            <ToggleButton />
          </CustomTooltip>
        </div>
      )}

      {/* Image */}
      <CustomTooltip raw={index + 1} content={getPlayTooltipContent()}>
        <div
          className='flex h-10 w-10 flex-shrink-0 cursor-default items-center justify-center'
          role='presentation'
          onClick={play}
        >
          <img
            className={classNames(
              'h-full w-full',
              !isSongTab && 'group-hover:brightness-50',
              !isSongTab && isCurrent() && 'brightness-50'
            )}
            src={track.album.images.at(0)?.url}
            alt={track.name}
          />
          {!isSongTab && <ToggleButton disableToggle />}
        </div>
      </CustomTooltip>

      <div className='min-w-0 flex-1'>
        <h4 className={classNames('ellipsis text-base', isCurrent() && 'text-s-green-1')}>{track.name}</h4>
        <p className='ellipsis'>
          {track.artists.map((artist, idx) => (
            <ArtistCredit
              isSelected={selected === index}
              disableColorChange={false}
              artist={artist}
              index={idx}
              key={artist.id}
            />
          ))}
        </p>
      </div>
    </div>
  )
}

export default SongControl
