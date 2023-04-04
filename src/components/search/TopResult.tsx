import { CustomLink } from '../common'
import PlayButton from '../common/PlayButton'
import { useSpotifyStore } from '~/store/spotify'
import { shallow } from 'zustand/shallow'
import ArtistCredit from '../common/ArtistCredit'
import classNames from 'classnames'

interface Props {
  item:
    | SpotifyApi.PlaylistObjectSimplified
    | SpotifyApi.TrackObjectFull
    | SpotifyApi.ArtistObjectFull
    | SpotifyApi.AlbumObjectSimplified
  artists?: SpotifyApi.ArtistObjectSimplified[] | false
}

const TopResult = ({ item, artists }: Props) => {
  const [device_id, spotifyApi, playbackState, player] = useSpotifyStore(
    (state) => [state.deviceId, state.spotifyApi, state.playbackState, state.spotifyPlayer],
    shallow
  )

  const getType = () => {
    if (item.type === 'track') return 'Song'
    return item.type[0].toUpperCase() + item.type.slice(1)
  }

  const isCurrent = () => playbackState?.track_window.current_track.id === item.id

  const isCurrentPlaying = () => {
    return playbackState && !playbackState.paused && playbackState?.track_window.current_track.id === item.id
  }

  const getImage = () => {
    if (item.type === 'track') return item.album.images[0].url
    return item.images[0].url
  }

  const play = () => {
    if (getType() === 'Song') {
      if (isCurrent()) player?.togglePlay()
      else
        spotifyApi.play({
          device_id,
          uris: [item.uri]
        })
    } else {
      spotifyApi.play({
        device_id,
        context_uri: item.uri
      })
    }
  }

  const nameLink = () => {
    if (item.type === 'album') return '/album/' + item.id
    else if (item.type === 'track') return '/album/' + item.album.id
    else if (item.type === 'playlist') return '/playlist/' + item.id
    else return '/artist/' + item.id
  }

  return (
    <div className='group relative cursor-pointer rounded-md bg-s-black-4 p-5 transition duration-300 hover:bg-s-gray-2'>
      <div>
        <img
          loading='lazy'
          src={getImage()}
          alt={item.name}
          className='aspect-square w-full max-w-[92px] rounded object-cover'
        />
        <PlayButton
          onClick={play}
          isCurrentPlaying={isCurrentPlaying()}
          className={classNames(
            'absolute bottom-3 right-5 group-hover:-translate-y-2',
            isCurrent() && '-translate-y-2'
          )}
        />
      </div>
      <CustomLink to={nameLink()} className='mt-4 block text-base font-bold'>
        <abbr
          title={item.name}
          className='ellipsis leading block text-3xl leading-[56px] tracking-[-0.2px] no-underline'
        >
          {item.name}
        </abbr>
      </CustomLink>
      <div className='flex items-center text-s-gray-7'>
        <span>{'owner' in item && 'By ' + item.owner.display_name}</span>
        {item.type !== 'playlist' && (
          <div>
            {artists
              ? artists.map((artist, index) => (
                  <ArtistCredit disableColorChange key={artist.id} artist={artist} index={index} />
                ))
              : 'Artist'}
          </div>
        )}
        <span className='ml-2 rounded-full bg-s-black-7 px-3 py-[6px] font-bold text-white'>{getType()}</span>
      </div>
    </div>
  )
}

export default TopResult
