import useSWR from 'swr'
import { useMatch, useParams } from 'react-router-dom'
import { useSpotifyStore } from '~/store/spotify'
import { ListItem } from '~/components/list'
import { paths } from '~/config/routes'

const TypeResult = () => {
  const { value } = useParams()
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const { data } = useSWR(
    value ? ['/search-types', value] : null,
    async ([, value]) => spotifyApi.search(value, ['album', 'artist', 'playlist']),
    { suspense: false }
  )
  const matchPlaylist = useMatch({
    path: paths.searchPlaylist.path,
    end: true
  })
  const matchAlbum = useMatch({
    path: paths.searchAlbum.path,
    end: true
  })
  const matchArtist = useMatch({
    path: paths.searchArtist.path,
    end: true
  })

  return (
    <div className='mt-5 grid grid-cols-5 gap-6 overflow-hidden'>
      {matchPlaylist &&
        data?.body.playlists?.items.map((item) => (
          <ListItem owner={item.owner.display_name} key={item.id} item={item} />
        ))}

      {matchAlbum &&
        data?.body.albums?.items.map((item) => (
          <ListItem releaseDate={item.release_date} key={item.id} artists={item.artists} item={item} />
        ))}

      {matchArtist && data?.body.artists?.items.map((item) => <ListItem key={item.id} item={item} />)}
    </div>
  )
}

export default TypeResult
