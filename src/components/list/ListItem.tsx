import { CustomLink } from '../common'
import PlayButton from '../common/PlayButton'
import { useCallback } from 'react'
import { useSpotifyStore } from '~/store/spotify'
import { shallow } from 'zustand/shallow'
import classNames from 'classnames'
import ArtistCredit from '../common/ArtistCredit'
import ViewArtist from '~/assets/icons/ViewArtist.png'

interface Props {
  item:
    | SpotifyApi.AlbumObjectSimplified
    | SpotifyApi.ArtistObjectFull
    | SpotifyApi.TrackObjectFull
    | SpotifyApi.PlaylistObjectSimplified
  artists?: SpotifyApi.ArtistObjectSimplified[]
  setRef?: (ref: HTMLDivElement | null) => void
  setMaxHeight?: (value: number) => void
  itemRef?: HTMLDivElement | null
}

const FallbackArtist = () => (
  <div className='flex aspect-square rounded-full bg-s-gray-12 p-[52px]'>
    <img src={ViewArtist} alt='Artist' className='m-auto aspect-square w-full brightness-[0.7]' />
  </div>
)

const ListItem = ({ item, artists, setRef, setMaxHeight, itemRef }: Props) => {
  const [device_id, spotifyApi] = useSpotifyStore((state) => [state.deviceId, state.spotifyApi], shallow)
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

  const play = () => {
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

  return (
    <div
      ref={onRefChange}
      className='group h-[281px] cursor-pointer rounded-md bg-s-black-4 p-4 transition duration-300 hover:bg-s-gray-2'
    >
      <div className='relative'>
        {getImage() ? (
          <img
            loading='lazy'
            onLoad={onContentVisible}
            src={getImage()}
            alt={item.name}
            className={classNames(
              'aspect-square w-full object-cover',
              item.type === 'artist' ? 'rounded-full' : 'rounded'
            )}
          />
        ) : (
          <FallbackArtist />
        )}
        <PlayButton onClick={play} className='absolute bottom-1 right-2 group-hover:-translate-y-2' />
      </div>
      <CustomLink to={`/album/${item.id}`} className='mt-4 block text-base font-bold'>
        <abbr title={item.name} className='ellipsis block no-underline'>
          {item.name}
        </abbr>
      </CustomLink>
      <p className='second-ellipsis mt-1 h-11 leading-[22px] text-s-gray-8'>
        {item.type !== 'playlist' && (
          <>
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
