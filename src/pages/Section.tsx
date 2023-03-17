import useSWR from 'swr'
import { useSpotifyStore } from '~/store/spotify'
import ListItem from '../components/list/ListItem'
import { useParams } from 'react-router-dom'
import getTitle from '~/utils/getTitle'
import sectionMap from '~/config/sectionMap'
import { assertIsValidSection } from '~/utils/utils'

const Section = () => {
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const { section } = useParams()
  assertIsValidSection(section)
  const { fetchFn, mapFn } = sectionMap(spotifyApi)[section]
  const { data } = useSWR(section, fetchFn)

  const findAlbum = (id: string, to: number) => {
    return data?.body.items.findIndex((value, index) => index < to && value.track.album.id === id) !== -1
  }

  return (
    <>
      <div className='h-16' />
      <div className='px-4 py-5 lg:px-8'>
        <header className='flex items-baseline justify-between'>
          <h1 className='text-2xl font-bold tracking-tight text-white'>{getTitle(section)}</h1>
        </header>

        <div className='mt-5 grid grid-cols-5 gap-6 overflow-hidden'>
          {data?.body.items.map((item, index) => {
            const sectionItem = mapFn(item)
            console.log(typeof sectionItem)
            if (!findAlbum(sectionItem.id, index))
              return <ListItem key={sectionItem.id} item={sectionItem} artists={item.track?.artists} />
          })}
        </div>
      </div>
    </>
  )
}

export default Section
