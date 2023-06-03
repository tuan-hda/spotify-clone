import { CustomLink } from '../common'
import PlayButton from '../common/PlayButton'
import { useCallback } from 'react'
import { useSpotifyStore } from '~/store/spotify'
import { shallow } from 'zustand/shallow'
import classNames from 'classnames'
import ArtistCredit from '../common/ArtistCredit'
import ViewArtist from 'assets/icons/ViewArtist.png'
import { useNavigate } from 'react-router-dom'

interface Props {
  item:
    | SpotifyApi.AlbumObjectSimplified
    | SpotifyApi.ArtistObjectFull
    | SpotifyApi.TrackObjectFull
    | SpotifyApi.PlaylistObjectSimplified
  artists?: SpotifyApi.ArtistObjectSimplified[] | false
  setRef?: ((ref: HTMLDivElement | null) => void) | false
  setMaxHeight?: ((value: number) => void) | false
  itemRef?: HTMLDivElement | null
  releaseDate?: string | false
  owner?: string | false
  shadowFallback?: boolean
  navigateContainer?: boolean
  hidePlayButton?: boolean
}

const FallbackArtist = ({ shadowFallback }: { shadowFallback: boolean }) => (
  <div className='flex aspect-square rounded-full bg-s-gray-12 p-[52px]'>
    <img
      src={ViewArtist}
      alt='Artist'
      className={classNames('m-auto aspect-square w-full brightness-[0.7]', shadowFallback && ' shadow-s-4  ')}
    />
  </div>
)

const ListItem = ({
  shadowFallback = true,
  item,
  artists,
  setRef,
  setMaxHeight,
  itemRef,
  releaseDate,
  owner,
  navigateContainer = false,
  hidePlayButton = false
}: Props) => {
  const navigate = useNavigate()
  const [device_id, spotifyApi, playbackState, player] = useSpotifyStore(
    (state) => [state.deviceId, state.spotifyApi, state.playbackState, state.spotifyPlayer],
    shallow
  )
  const onRefChange = useCallback(
    (node: HTMLDivElement | null) => {
      if (node && setRef) {
        setRef(node)
      }
    },
    [setRef]
  )

  const onContentVisible = () => {
    setMaxHeight && setMaxHeight(itemRef?.offsetHeight || 200)
  }

  const isCurrentPlaying = () => {
    if (playbackState && !playbackState.paused) {
      if (playbackState.track_window.current_track.id === item.id && !playbackState.context.uri) return true
      if (playbackState.context.uri === item.uri) return true
    }
    return false
  }

  const isCurrent = () => {
    if (playbackState) {
      if (playbackState.track_window.current_track.id === item.id || playbackState.context.uri === item.uri) return true
    }
    return false
  }

  const play = () => {
    if (isCurrent() && player) {
      player.togglePlay()
      return
    }
    if (item.type === 'track')
      spotifyApi.play({
        device_id,
        uris: [item.uri]
      })
    else
      spotifyApi.play({
        device_id,
        context_uri: item.uri
      })
  }

  const getImage = () => {
    if (item.type === 'track') return item.album.images[0]?.url
    else return item.images[0]?.url
  }

  const containerClick = () => {
    if (navigateContainer) {
      navigate(`/playlist/${item.id}`, {
        state: {
          from: true
        }
      })
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      onClick={containerClick}
      ref={onRefChange}
      className='group cursor-pointer rounded-md bg-s-black-4 p-4 transition duration-300 hover:bg-s-gray-2'
    >
      <div className='relative'>
        {getImage() ? (
          <img
            loading='lazy'
            onLoad={onContentVisible}
            src={getImage()}
            alt={item.name}
            className={classNames(
              'aspect-square w-full object-cover shadow-s-4',
              item.type === 'artist' ? 'rounded-full' : 'rounded'
            )}
          />
        ) : (
          <FallbackArtist shadowFallback={shadowFallback} />
        )}
        {!hidePlayButton && (
          <PlayButton
            isCurrentPlaying={isCurrentPlaying()}
            onClick={(e) => {
              e.stopPropagation()
              play()
            }}
            className='absolute bottom-1 right-2 group-hover:-translate-y-2'
          />
        )}
      </div>
      <CustomLink
        to={item.type === 'playlist' ? `/playlist/${item.id}` : '#'}
        className='mt-[18px] block text-base font-bold'
      >
        <abbr title={item.name} className='ellipsis block no-underline'>
          {item.name}
        </abbr>
      </CustomLink>
      <p className='second-ellipsis mt-1 max-h-[44px] min-h-[32px] leading-[22px] text-s-gray-8'>
        {owner && 'By ' + owner}
        {item.type !== 'playlist' && (
          <>
            {releaseDate && releaseDate.slice(0, 4) + ' • '}
            {artists
              ? artists.map((artist, index) => (
                  <ArtistCredit disableColorChange key={artist.id} artist={artist} index={index} />
                ))
              : 'Artist'}
          </>
        )}
      </p>
    </div>
  )
}

export default ListItem
