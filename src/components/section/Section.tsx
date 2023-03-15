import useSWR from 'swr'
import { useSpotifyStore } from '~/store/spotify'
import { Fragment } from 'react'
import ListItem from '../list/ListItem'
import { useParams } from 'react-router-dom'
import getTitle from '~/utils/getTitle'

const Section = () => {
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const { section } = useParams()
  const { data } = useSWR(section, async () => spotifyApi.getMyRecentlyPlayedTracks())

  const findAlbum = (id: string, to: number) => {
    return data?.body.items.findIndex((value, index) => index < to && value.track.album.id === id) !== -1
  }

  return (
    <>
      <div className='px-4 py-6 lg:px-8'>
        <div className='h-16' />
        <header className='flex items-baseline justify-between'>
          <h1 className='text-2xl font-bold tracking-tight text-white hover:underline'>{getTitle(section)}</h1>
        </header>

        <div className='mt-5 grid grid-cols-5 gap-6 overflow-hidden'>
          {data?.body.items.map((item, index) => (
            <Fragment key={item.played_at}>
              {!findAlbum(item.track.album.id, index) ? <ListItem track={item.track} /> : null}
            </Fragment>
          ))}
        </div>
      </div>
    </>
  )
}

export default Section
