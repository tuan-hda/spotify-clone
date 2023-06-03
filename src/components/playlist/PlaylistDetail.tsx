import { PlayButton } from '~/components/common'
import useSWR from 'swr'
import { useSpotifyStore } from '~/store/spotify'
import Song from '../search/Song'
import { useState } from 'react'
import SongHeader from '../search/SongHeader'
import PlaylistPopup from './PlaylistPopup'
import { darken } from 'polished'
import FindSong from './FindSong'
import { shallow } from 'zustand/shallow'

type Props = {
  hideMenu?: boolean
  fromColor: string
  tracks?: (SpotifyApi.TrackObjectFull | null)[]
  play?: () => void
  uri?: string
}

const PlaylistDetail = ({ play, uri, tracks = [], hideMenu = false, fromColor }: Props) => {
  const [spotifyApi, playbackState] = useSpotifyStore((state) => [state.spotifyApi, state.playbackState], shallow)
  const [selected, setSelected] = useState(-1)

  const { data: savedTracks, mutate: mutateSavedTracks } = useSWR(
    tracks.length !== 0 ? ['/saved-tracks', tracks] : null,
    async ([, tracks]) => {
      const trackIds = tracks.map((track) => track?.id || '')
      return spotifyApi.containsMySavedTracks(trackIds)
    }
  )

  const isCurrentPlaying = () => {
    if (playbackState && !playbackState.paused) {
      if (playbackState.context.uri === uri) return true
    }
    return false
  }

  return (
    <div className='min-h-[232px] w-full  px-8'>
      <div
        className='absolute -mx-8 h-[232px] w-full bg-gradient-to-b to-s-black-3'
        style={{
          '--tw-gradient-from': darken(0.1, fromColor),
          '--tw-gradient-to': '#121212',
          '--tw-gradient-stops': 'var(--tw-gradient-from), var(--tw-gradient-to)'
        }}
      />
      <div className='h-5' />

      <div className='flex items-center gap-8'>
        {tracks.length > 0 && (
          <PlayButton
            isCurrentPlaying={isCurrentPlaying()}
            onClick={play}
            size='big'
            noDisappear
            className='relative z-10'
          />
        )}

        {!hideMenu && <PlaylistPopup />}
      </div>

      <div className='h-4' />

      {tracks.length > 0 && (
        <>
          <SongHeader transparent />

          <div className='mt-4 w-full'>
            {tracks.map((track, index) => {
              if (track)
                return (
                  <Song
                    selected={selected}
                    setSelected={setSelected}
                    isSaved={savedTracks?.body[index]}
                    key={track.id + index}
                    onSaveTrack={mutateSavedTracks}
                    index={index}
                    track={track}
                    isSongTab
                  />
                )
            })}
          </div>
        </>
      )}

      <FindSong totalTracks={tracks.length} />
    </div>
  )
}

export default PlaylistDetail
