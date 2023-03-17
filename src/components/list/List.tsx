import { useEffect, useState } from 'react'
import useSWR from 'swr'
import sectionRecord from '~/config/sectionRecord'
import { useSpotifyStore } from '~/store/spotify'
import getTitle from '~/utils/getTitle'
import { CustomLink } from '../common'
import ListItem from './ListItem'

interface Props {
  swrKey: keyof ReturnType<typeof sectionRecord>
}

const List = ({ swrKey }: Props) => {
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const [maxHeight, setMaxHeight] = useState(281)
  const { fetchFn, mapFn } = sectionRecord(spotifyApi)[swrKey]
  const { data } = useSWR(swrKey, fetchFn)

  useEffect(() => {
    const onResize = () => {
      setMaxHeight(ref?.offsetHeight || 281)
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [ref?.offsetHeight])

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
        {data &&
          data?.body.items
            .map((item, index) => mapFn(data.body.items, item, index))
            .map((item, index) => {
              if (item)
                return (
                  <ListItem
                    key={item.id}
                    item={item}
                    artists={item.type !== 'playlist' ? item.artists : undefined}
                    itemRef={ref}
                    setRef={index === 0 ? setRef : undefined}
                    setMaxHeight={index === 0 ? setMaxHeight : undefined}
                  />
                )
            })}
      </div>
    </>
  )
}

export default List
