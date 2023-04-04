import Divider from '~/components/common/Divider'
import IconButton from '~/components/common/IconButton'
import Icons from '~/components/common/Icons'
import Logo from './Logo'
import Playlist from './Playlist'
import { CustomLink } from '~/components/common'
import useSWR from 'swr'
import { useSpotifyStore } from '~/store/spotify'

interface Props {
  width?: number
  maxWidth?: number
}

export default function Sidebar({ width = 393, maxWidth = 393 }: Props) {
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const { mutate } = useSWR('/get-current-user-playlists', async () => spotifyApi.getUserPlaylists())

  const createPlaylist = async () => {
    await spotifyApi.createPlaylist('New Playlist')
    mutate()
  }

  return (
    <nav className='scrollbar-hidden flex flex-col bg-black pt-6 text-sm text-s-gray-1' style={{ width, maxWidth }}>
      <Logo />
      <div className='mt-4 px-2'>
        <IconButton className='px-4' as={CustomLink} to='/' iconType='home'>
          Home
        </IconButton>
        <IconButton className='px-4' as={CustomLink} to='/search' iconType='search'>
          Search
        </IconButton>
        <IconButton className='px-4' as={CustomLink} to='/collection/playlists' iconType='library'>
          Your Library
        </IconButton>
      </div>

      <div className='mt-6'>
        <IconButton
          type='button'
          className='px-6'
          icon={
            <div className='flex h-6 w-6 flex-shrink-0 rounded-sm bg-s-gray-1 transition duration-300 group-hover:bg-white'>
              <Icons className='m-auto' type='plus' />
            </div>
          }
          onClick={createPlaylist}
        >
          Create Playlist
        </IconButton>
        <IconButton
          className='px-6'
          as={CustomLink}
          to='/collection/tracks'
          icon={
            <div className='liked-gradient flex h-6 w-6 flex-shrink-0 rounded-sm brightness-75 transition duration-300 group-hover:brightness-100'>
              <Icons className='m-auto' isSelected type='heart' />
            </div>
          }
        >
          Liked Songs
        </IconButton>
      </div>

      <Divider className='mx-6 mt-2' />

      <Playlist />
    </nav>
  )
}
