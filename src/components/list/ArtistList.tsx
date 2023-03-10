import { useSpotifyStore } from '~/store/spotify'
import useSWR from 'swr'
import Artist from './Artist'

const ArtistList = () => {
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const { data } = useSWR('/get-top-artists', async () => spotifyApi.getMyTopArtists({ limit: 6 }))

  return (
    <div className='transition-color mt-[22px] grid grid-cols-1 gap-y-3 gap-x-6 lg:grid-cols-2 lg:gap-y-4 xl:grid-cols-3'>
      {data?.body.items.map((item, index) => (
        <Artist isDefault={index === 0} {...item} key={item.id} />
      ))}
    </div>
  )
}

export default ArtistList
