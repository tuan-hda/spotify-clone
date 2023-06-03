import React, { useRef } from 'react'
import useSWR from 'swr'
import { useSpotifyStore } from '~/store/spotify'
import { CustomLink } from '../common'
import useAutoFont from '~/hooks/useAutoFont'
import { convertDuration } from '~/utils/time'

type Props = {
  name?: string
  totalSongs?: number
  duration?: number
  owner?: SpotifyApi.UserObjectPublic
}

function PlaylistDescription({ name, owner, totalSongs = 0, duration = 0 }: Props) {
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const { data: currentUser } = useSWR('/get-me', async () => spotifyApi.getMe())
  const textRef = useRef<HTMLHeadingElement | null>(null)
  const user = owner ? (owner.id === currentUser?.body.id ? currentUser.body : owner) : currentUser?.body

  useAutoFont(textRef)

  return (
    <div className='ml-6 flex-1'>
      <p className='mb-2 text-sm font-black text-white'>Playlist</p>
      <h1 className='h-fit text-[90px] font-black leading-[100px]' ref={textRef}>
        {name}
      </h1>
      {/* <h2 className='mt-4 font-bold tracking-tighter text-white'>{name}</h2> */}
      <div className='mt-5 flex items-center gap-1'>
        {/* Avatar */}
        {user?.images?.at(0)?.url && (
          <img src={user?.images?.at(0)?.url} alt='User Avatar' className='mb-1 h-6 w-6 rounded-full' />
        )}
        <CustomLink to='#' className='font-bold text-white hover:underline'>
          {user?.display_name}
        </CustomLink>

        <div>
          {totalSongs > 0 && <>• {totalSongs} songs</>}
          {duration > 0 && <span className='text-white/70'>, {convertDuration(duration)}</span>}
        </div>
      </div>
    </div>
  )
}

export default PlaylistDescription
