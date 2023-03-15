import { useEffect, useState, Fragment } from 'react'
import useSWR from 'swr'
import getTitle from '~/utils/getTitle'
import { CustomLink } from '../common'
import ListItem from './ListItem'

interface Response<T> {
  body: T
  headers: Record<string, string>
  statusCode: number
}

interface Props {
  fn: () => Promise<Response<SpotifyApi.UsersRecentlyPlayedTracksResponse>>
  swrKey: string
}

const List = ({ fn, swrKey }: Props) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const [maxHeight, setMaxHeight] = useState(200)
  const { data } = useSWR(swrKey, fn)

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
        <CustomLink to={`/section/${swrKey}`} className='text-s-gray-8 hover:underline'>
          Show all
        </CustomLink>
      </header>
      <div
        className='mt-5 grid grid-cols-5 gap-6 overflow-hidden'
        style={{
          maxHeight
        }}
      >
        {data?.body.items.map((item, index) => (
          <Fragment key={item.played_at}>
            {!findAlbum(item.track.album.id, index) ? (
              <ListItem
                track={item.track}
                itemRef={ref}
                setRef={index === 0 ? setRef : undefined}
                setMaxHeight={index === 0 ? setMaxHeight : undefined}
              />
            ) : null}
          </Fragment>
        ))}
      </div>
    </>
  )
}

export default List
