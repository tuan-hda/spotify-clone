import classNames from 'classnames'
import { CustomTooltip } from '../common'
import { HiDotsHorizontal } from 'react-icons/hi'
import Like from '~/assets/icons/Like.png'
import LikeFill from '~/assets/icons/LikeFill.png'
import { useState } from 'react'
import { convertMsToTime } from '~/utils/utils'
import { useSpotifyStore } from '~/store/spotify'

interface Props {
  track: SpotifyApi.TrackObjectFull
  hideAlbum?: boolean
  isSaved?: boolean
  onSaveTrack?: () => void
}

const SongDescription = ({ track, isSaved, hideAlbum, onSaveTrack }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const duration = convertMsToTime(track.duration_ms)

  const getSaveTooltipContent = () => {
    if (isSaved) return 'Remove from your library'
    return 'Save to your library'
  }

  const saveTrack = async () => {
    if (loading) return
    try {
      setLoading(true)
      if (isSaved) {
        await spotifyApi.removeFromMySavedTracks([track.id])
      } else {
        await spotifyApi.addToMySavedTracks([track.id])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
    onSaveTrack && onSaveTrack()
  }

  return (
    <div className='col-span-5 flex items-center'>
      <span className={classNames('ellipsis hidden text-s-gray-7 group-hover:text-white', !hideAlbum && 'lg:inline')}>
        {track.album.name}
      </span>

      <div className='min-w-0 flex-1' />

      {/* Favorite */}
      <CustomTooltip content={getSaveTooltipContent()}>
        <button
          onClick={saveTrack}
          className={classNames(
            'mt-1 min-w-[18px] hover:brightness-100 group-hover:opacity-100',
            !isSaved && 'opacity-0 brightness-75',
            loading ? 'cursor-wait' : 'cursor-default'
          )}
        >
          <img src={isSaved ? LikeFill : Like} alt={getSaveTooltipContent()} className='h-[15px]' />
        </button>
      </CustomTooltip>

      {/* Duration */}
      <span className='ml-8 w-8 text-s-gray-8'>{duration}</span>

      <CustomTooltip
        content={`More options for ${track.name} by ${track.album.artists.map((artist) => artist.name).join(', ')}`}
      >
        <button className='ml-3 mt-1 cursor-default opacity-0 group-hover:opacity-100'>
          <HiDotsHorizontal className='text-lg' />
        </button>
      </CustomTooltip>
    </div>
  )
}

export default SongDescription
