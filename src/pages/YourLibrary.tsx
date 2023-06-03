import useSWR from 'swr'
import { useSpotifyStore } from '~/store/spotify'
import { ListItem } from '~/components/list'
import { CustomLink } from '~/components/common'

const YourPlaylist = () => {
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const { data: savedData } = useSWR('/saved-tracks', async () =>
    spotifyApi.getMySavedTracks({
      limit: 50
    })
  )
  const { data } = useSWR('/get-current-user-playlists', async () => spotifyApi.getUserPlaylists())

  return (
    <>
      <div className='min-h-full bg-transparent bg-s-black-10 px-8 pt-20'>
        <h1 className='bg-transparent text-2xl font-bold tracking-tight hover:underline'>Playlists</h1>
        <div className='autofill mt-4 grid gap-6'>
          <div className='col-span-2 flex min-h-[200px] flex-col justify-end rounded-lg bg-gradient-to-br from-s-purple-1 to-s-purple-2 pl-5 pb-5'>
            <CustomLink to='/collection/tracks' className='h-[52px] text-3xl font-bold hover:underline'>
              Liked Songs
            </CustomLink>
            <p className='text-base font-normal'>{savedData?.body.total} liked songs</p>
          </div>
          {data?.body.items.map((item) => {
            if (item) return <ListItem navigateContainer shadowFallback={false} key={item.id} item={item} />
          })}
        </div>
      </div>
    </>
  )
}

export default YourPlaylist
