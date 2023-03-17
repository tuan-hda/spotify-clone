import { useEffect, useState } from 'react'
import useSWR from 'swr'
import sectionMap, { isAlbumObjectSimplified } from '~/config/sectionMap'
import { useSpotifyStore } from '~/store/spotify'
import getTitle from '~/utils/getTitle'
import { CustomLink } from '../common'
import ListItem from './ListItem'
import { AlbumObjectSimplified } from '~/config/sectionMap'

interface Props {
  swrKey: keyof ReturnType<typeof sectionMap>
}

const List = ({ swrKey }: Props) => {
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const [maxHeight, setMaxHeight] = useState(200)
  const { fetchFn, mapFn } = sectionMap(spotifyApi)[swrKey]
  const { data } = useSWR(swrKey, fetchFn)
  // console.log(data)

  useEffect(() => {
    const onResize = () => {
      setMaxHeight(ref?.offsetHeight || 200)
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [ref?.offsetHeight])

  const findAlbum = (id: string, to: number) => {
    return data?.body.items.findIndex((value, index) => index < to && value.track.album.id === id) !== -1
  }

  return (
    <>
      <header className='flex items-baseline justify-between'>
        <CustomLink to='/' className='text-2xl font-bold tracking-tight hover:underline'>
          {getTitle(swrKey)}
        </CustomLink>
        <CustomLink to={`/section/${swrKey}`} className='font-bold text-s-gray-8 hover:underline'>
          Show all
        </CustomLink>
      </header>
      <div
        className='mt-5 grid grid-cols-5 gap-6 overflow-hidden'
        style={{
          maxHeight
        }}
      >
        {data?.body.items.map((item, index) => {
          if (!findAlbum(item.track.album.id, index)) {
            const sectionItem = mapFn(item)
            if (isAlbumObjectSimplified(sectionItem)) {
              return (
                <ListItem
                  key={sectionItem.id}
                  item={sectionItem}
                  artists={item.track.artists}
                  itemRef={ref}
                  setRef={index === 0 ? setRef : undefined}
                  setMaxHeight={index === 0 ? setMaxHeight : undefined}
                />
              )
            }
          }
        })}
      </div>
    </>
  )
}

export default List
