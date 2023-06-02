import useSWR from 'swr'
import { useSpotifyStore } from '~/store/spotify'
import ListItem from '../components/list/ListItem'
import { useParams } from 'react-router-dom'
import getTitle from '~/utils/getTitle'
import sectionRecord from '~/config/sectionRecord'
import { assertIsValidSection } from '~/utils/guards'

const Section = () => {
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const { section } = useParams()
  assertIsValidSection(section)
  const { fetchFn, mapFn } = sectionRecord(spotifyApi)[section]
  const { data } = useSWR(section, fetchFn)

  return (
    <>
      <div className='h-16' />
      <div className='px-4 pt-5 lg:px-8'>
        <header className='flex items-baseline justify-between'>
          <h1 className='text-2xl font-bold tracking-tight text-white'>{getTitle(section)}</h1>
        </header>

        <div
          className='mt-5 grid gap-6 overflow-hidden'
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
          }}
        >
          {data?.body.items
            .map((item, index) => mapFn(data.body.items, item, index))
            .map((item) => {
              if (item)
                return (
                  <ListItem key={item.id} item={item} artists={item.type !== 'playlist' ? item.artists : undefined} />
                )
            })}
        </div>
      </div>
    </>
  )
}

export default Section
