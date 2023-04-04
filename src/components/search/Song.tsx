import classNames from 'classnames'
import { useSpotifyStore } from '~/store/spotify'
import { useState } from 'react'
import SongDescription from './SongDescription'
import SongControl from './SongControl'

interface Props {
  track: SpotifyApi.TrackObjectFull
  index: number
  paddingLeft?: string
  paddingRight?: string
  hideAlbum?: boolean
  isSaved?: boolean
  onSaveTrack?: () => void
  setSelected: (idx: number) => void
  selected: number
  isSongTab?: boolean
}

const Song = ({
  selected,
  setSelected,
  track,
  index,
  paddingLeft,
  paddingRight,
  hideAlbum,
  isSaved = false,
  isSongTab = false,
  onSaveTrack
}: Props) => {
  const playbackState = useSpotifyStore((state) => state.playbackState)
  const [pauseButton, setPauseButton] = useState<'bars' | 'pause'>('bars')

  const isCurrent = () => playbackState?.track_window.current_track.id === track.id

  const onMouseEnter = () => {
    if (isSongTab && isCurrent()) {
      setPauseButton('pause')
    }
  }

  const onMouseLeave = () => {
    if (isSongTab && isCurrent()) {
      setPauseButton('bars')
    }
  }

  return (
    <div
      key={track.id}
      className={classNames(
        'group relative grid cursor-default grid-cols-12 rounded py-[6px] px-2',
        selected === index ? 'bg-s-gray-13' : 'hover:bg-s-gray-9'
      )}
      onClick={() => setSelected(index)}
      role='presentation'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ paddingLeft, paddingRight }}
    >
      <SongControl
        selected={selected}
        index={index}
        pauseButton={pauseButton}
        isCurrent={isCurrent}
        track={track}
        isSongTab={isSongTab}
      />

      {/* Name, Album, Favorite, Duration */}
      <SongDescription track={track} hideAlbum={hideAlbum} isSaved={isSaved} onSaveTrack={onSaveTrack} />
    </div>
  )
}

export default Song
