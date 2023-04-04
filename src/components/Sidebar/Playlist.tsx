import useSWR from 'swr'
import { useSpotifyStore } from '~/store/spotify'
import ScrollView from '../common/ScrollView'
import { useNavigate } from 'react-router-dom'

const Playlist = () => {
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const { data: playlistsData } = useSWR('/get-current-user-playlists', async () => spotifyApi.getUserPlaylists())
  const navigate = useNavigate()
  const playlists = playlistsData?.body.items

  const onClick = (id: string) => () => {
    navigate(`/playlist/${id}`, {
      state: { from: 'available' }
    })
  }

  return (
    <ScrollView disableScrollSideEffect>
      <div className='sticky top-0 z-[1] h-3 w-full bg-gradient-to-b from-black/80 to-black/0' />
      <ul className='relative'>
        {playlists?.map((playlist) => (
          <li key={playlist.id} className='overflow-hidden text-ellipsis whitespace-nowrap hover:text-white'>
            <button className='w-full cursor-default py-[6px] px-6 text-left outline-0' onClick={onClick(playlist.id)}>
              {playlist.name}
            </button>
          </li>
        ))}
      </ul>
      <div className='h-5 w-full' />
    </ScrollView>
  )
}

export default Playlist
