import useSWR from 'swr'
import { useLocation, useParams } from 'react-router-dom'
import { useSpotifyStore } from '~/store/spotify'
import { ListItem } from '../list'

const TypeResult = () => {
  const { value } = useParams()
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const { data } = useSWR(
    value ? ['/search', value] : null,
    async ([, value]) => spotifyApi.search(value, ['album', 'artist', 'playlist', 'track']),
    { suspense: false }
  )
  const location = useLocation()

  return (
    <div className='mt-5 grid grid-cols-5 gap-6 overflow-hidden'>
      {location.pathname.includes('playlists') &&
        data?.body.playlists?.items.map((item) => <ListItem key={item.id} item={item} />)}

      {location.pathname.includes('albums') &&
        data?.body.albums?.items.map((item) => <ListItem key={item.id} artists={item.artists} item={item} />)}

      {location.pathname.includes('songs') &&
        data?.body.tracks?.items.map((item) => <ListItem key={item.id} artists={item.artists} item={item} />)}

      {location.pathname.includes('artists') &&
        data?.body.artists?.items.map((item) => <ListItem key={item.id} item={item} />)}
    </div>
  )
}

export default TypeResult
