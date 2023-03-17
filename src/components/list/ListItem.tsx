import { CustomLink } from '../common'
import PlayButton from '../common/PlayButton'
import { Fragment, useCallback } from 'react'
import { useSpotifyStore } from '~/store/spotify'
import { shallow } from 'zustand/shallow'

interface Props {
  item: SpotifyApi.AlbumObjectSimplified
  artists?: SpotifyApi.ArtistObjectSimplified[]
  setRef?: (ref: HTMLDivElement | null) => void
  setMaxHeight?: (value: number) => void
  itemRef?: HTMLDivElement | null
}

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
    spotifyApi.play({
      device_id,
      context_uri: item.uri
    })
  }

  return (
    <div
      ref={onRefChange}
      className='group h-[281px] cursor-pointer rounded-lg bg-s-black-4 p-4 transition duration-300 hover:bg-s-gray-2'
    >
      <div className='relative'>
        <img
          loading='lazy'
          onLoad={onContentVisible}
          src={item.images.at(0)?.url}
          alt={item.name}
          className='aspect-square w-full rounded object-cover'
        />
        <PlayButton onClick={play} className='absolute bottom-1 right-2 group-hover:-translate-y-2' />
      </div>
      <CustomLink to={`/album/${item.id}`} className='mt-4 block text-base font-bold'>
        <abbr title={item.name} className='ellipsis block no-underline'>
          {item.name}
        </abbr>
      </CustomLink>
      <p className='second-ellipsis mt-1 h-11 leading-[22px] text-s-gray-8'>
        {artists &&
          artists.map((artist, index) => (
            <Fragment key={artist.id}>
              {index > 0 && ', '}
              <CustomLink to={`/artist/${artist.id}`} className='hover:underline'>
                {artist.name}
              </CustomLink>
            </Fragment>
          ))}
      </p>
    </div>
  )
}

export default ListItem
