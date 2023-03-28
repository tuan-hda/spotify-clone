import classNames from 'classnames'
import { MdPlayArrow, MdOutlinePause } from 'react-icons/md'
import { shallow } from 'zustand/shallow'
import { useSpotifyStore } from '~/store/spotify'
import { CustomTooltip } from '../common'
import ArtistCredit from '../common/ArtistCredit'
import Bars from '~/assets/icons/Bars.gif'
import { useState } from 'react'
import SongDescription from './SongDescription'

interface Props {
  track: SpotifyApi.TrackObjectFull
  index?: number
  paddingLeft?: string
  paddingRight?: string
  hideAlbum?: boolean
  isSaved?: boolean
  onSaveTrack?: () => void
}

const Song = ({ track, index, paddingLeft, paddingRight, hideAlbum, isSaved = false, onSaveTrack }: Props) => {
  const [spotifyApi, device_id, playbackState, player] = useSpotifyStore(
    (state) => [state.spotifyApi, state.deviceId, state.playbackState, state.spotifyPlayer],
    shallow
  )
  const [pauseButton, setPauseButton] = useState<'bars' | 'pause'>('bars')

  const play = async () => {
    await player?.activateElement()
    if (playbackState?.track_window.current_track.id !== track.id)
      await spotifyApi.play({
        device_id,
        uris: [track.uri]
      })
    else await player?.togglePlay()
  }

  const isCurrent = () => playbackState?.track_window.current_track.id === track.id

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
        pauseButton === 'bars'
          ? () => <img src={Bars} className='h-[15px] w-[15px]' alt='Music Bars' />
          : MdOutlinePause
    return (
      <div className='ml-1'>
        <Element
          onClick={disableToggle ? undefined : play}
          className={classNames(
            'h-5 w-5 cursor-default text-white group-hover:block',
            index ? 'top-4' : 'absolute',
            isCurrentPlaying() ? 'block' : 'hidden'
          )}
        />
      </div>
    )
  }

  const onMouseEnter = () => {
    if (index && isCurrent()) {
      setPauseButton('pause')
    }
  }

  const onMouseLeave = () => {
    if (index && isCurrent()) {
      setPauseButton('bars')
    }
  }

  return (
    <div
      key={track.id}
      className={classNames(
        'group relative grid cursor-default grid-cols-12 rounded py-[6px] px-2',
        isCurrent() ? 'bg-s-gray-13' : 'hover:bg-s-gray-9'
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ paddingLeft, paddingRight }}
    >
      <div className='col-span-7 flex flex-shrink-0 items-center gap-4'>
        {index && (
          <div className='flex w-5 justify-end'>
            <p className={classNames('text-base text-s-gray-7 group-hover:hidden', isCurrentPlaying() && 'hidden')}>
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
              className={classNames(
                'h-full w-full',
                !index && 'group-hover:brightness-50',
                !index && isCurrent() && 'brightness-50'
              )}
              src={track.album.images[0].url}
              alt={track.name}
            />
            {!index && <ToggleButton disableToggle />}
          </div>
        </CustomTooltip>

        <div className='min-w-0 flex-1'>
          <h4 className={classNames('ellipsis text-base', isCurrent() && 'text-s-green-1')}>{track.name}</h4>
          <p className='ellipsis'>
            {track.artists.map((artist, index) => (
              <ArtistCredit disableColorChange={false} artist={artist} index={index} key={artist.id} />
            ))}
          </p>
        </div>
      </div>

      {/* Name, Album, Favorite, Duration */}
      <SongDescription track={track} hideAlbum={hideAlbum} isSaved={isSaved} onSaveTrack={onSaveTrack} />
    </div>
  )
}

export default Song
