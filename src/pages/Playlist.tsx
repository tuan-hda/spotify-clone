import { ReactComponent as PlaylistSvg } from 'assets/icons/Playlist.svg'
import { ReactComponent as EditSvg } from 'assets/icons/Edit.svg'
import { CustomLink } from '~/components/common'
import FallbackUserImg from 'assets/icons/User.png'
import { useState } from 'react'
import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import { useSpotifyStore } from '~/store/spotify'
import classNames from 'classnames'
import { PlaylistDetail } from '~/components/playlist'
import { convertMsToTotalTime } from '~/utils/utils'

const Playlist = () => {
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const { playlistId } = useParams()
  const { data } = useSWR(playlistId ? ['/get-playlist', playlistId] : null, async ([, id]) =>
    spotifyApi.getPlaylist(id || '')
  )
  const [hover, setHover] = useState(false)
  // const [ref, setRef] = useState<HTMLDivElement | null>(null)

  console.log(data?.body)

  const image = data?.body.images[0]?.url
  const totalTrack = data?.body.tracks.total || 0
  const totalDuration = data?.body.tracks.items.reduce((prev, curr) => prev + (curr.track?.duration_ms || 0), 0) || 0

  // const getFontSize = () => {
  //   const width = ref?.clientWidth || 0
  //   const fontSize = width / 0.625 / (data?.body.name.length || 1)
  //   return Math.min(fontSize, 96)
  // }

  // useEffect(() => {
  //   const element = document.querySelector('#main-container') as HTMLDivElement
  //   setRef(element)
  // }, [])

  return (
    <>
      <div className='-top-16 flex h-[340px] items-end bg-gradient-to-b from-[#535353] to-[#2C2C2C] pb-6'>
        {/* Image */}
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className='relative ml-8 h-[192px] w-[192px] gap-2 shadow-s-5 xl:h-[232px] xl:w-[232px]'
        >
          {image && <img src={image} alt={data.body.name} className='h-full w-full object-cover' />}
          <div
            className={classNames('absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center', {
              'bg-black/70': hover && image,
              'bg-s-gray-2': !image
            })}
          >
            {hover && (
              <>
                <EditSvg height='50px' width='50px' fill='#fff' />
                <p className='text-base text-white'>Choose photo</p>
              </>
            )}
            {!hover && !image && <PlaylistSvg fill='#757575' height='64px' width='64px' />}
          </div>
        </div>

        {/* Description */}
        <div className='ml-6'>
          <p className='text-sm font-black text-white'>Playlist</p>
          <h1 className='mt-4 font-bold tracking-tighter text-white'>{data?.body.name}</h1>
          <div className='mt-5 flex items-center gap-1'>
            {/* Avatar */}
            <img
              src={
                'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2111420632460477&height=50&width=50&ext=1683173727&hash=AeTGZBQqu0cTCV9B26M' ??
                FallbackUserImg
              }
              alt='User Avatar'
              className='h-6 w-6 rounded-full'
            />
            <CustomLink to='#' className='font-bold text-white hover:underline'>
              Hoàng Đình Anh Tuấn
            </CustomLink>

            {totalTrack > 0 && (
              <>
                • {totalTrack} songs,
                <span className='opacity-70'>{convertMsToTotalTime(totalDuration)}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <PlaylistDetail />
    </>
  )
}

export default Playlist
