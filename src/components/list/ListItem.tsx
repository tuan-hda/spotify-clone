import LazyLoad from 'react-lazy-load'
import { CustomLink } from '../common'
import PlayButton from '../common/PlayButton'
import { Fragment, useCallback } from 'react'

interface Props {
  track: SpotifyApi.TrackObjectFull
  setRef?: (ref: HTMLDivElement | null) => void
  setMaxHeight?: (value: number) => void
  itemRef?: HTMLDivElement | null
}

const ListItem = ({ track, setRef, setMaxHeight, itemRef }: Props) => {
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

  return (
    <div
      ref={onRefChange}
      className='group cursor-pointer rounded-lg bg-s-black-4 p-4 transition duration-300 hover:bg-s-gray-2'
    >
      <div className='relative'>
        <LazyLoad onContentVisible={onContentVisible}>
          <img
            src={track.album.images.at(0)?.url}
            alt={track.album.name}
            className='aspect-square w-full rounded object-cover'
          />
        </LazyLoad>
        <PlayButton className='absolute bottom-1 right-2 group-hover:-translate-y-2' />
      </div>
      <CustomLink to={`/album/${track.album.id}`} className='mt-4 block text-base font-bold'>
        <abbr title={track.album.name} className='ellipsis block no-underline'>
          {track.album.name}
        </abbr>
      </CustomLink>
      <p className='second-ellipsis mt-1 h-11 leading-[22px] text-s-gray-8'>
        {track.artists.map((artist, index) => (
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
