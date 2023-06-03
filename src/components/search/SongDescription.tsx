import classNames from 'classnames'
import { Button, CustomTooltip } from '../common'
import Like from 'assets/icons/Like.png'
import LikeFill from 'assets/icons/LikeFill.png'
import { convertMsToTime } from '~/utils/utils'
import { useSpotifyStore } from '~/store/spotify'
import SongMoreOptions from './SongMoreOptions'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'

interface Props {
  track: SpotifyApi.TrackObjectFull
  hideAlbum?: boolean
  isSaved?: boolean
  find?: boolean
  onSaveTrack?: () => void
}

const SongDescription = ({ find, track, isSaved, hideAlbum, onSaveTrack }: Props) => {
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const duration = convertMsToTime(track.duration_ms)
  const { playlistId } = useParams()
  const { data, mutate } = useSWR(
    playlistId ? ['/get-playlist', playlistId] : null,
    async ([, id]) => spotifyApi.getPlaylist(id || ''),
    { suspense: false }
  )
  const getSaveTooltipContent = () => {
    if (isSaved) return 'Remove from your library'
    return 'Save to your library'
  }

  const saveTrack = async () => {
    try {
      if (isSaved) {
        await spotifyApi.removeFromMySavedTracks([track.id])
      } else {
        await spotifyApi.addToMySavedTracks([track.id])
      }
    } catch (error) {
      console.log(error)
    }
    onSaveTrack && onSaveTrack()
  }

  const addToPlaylist = async (uri: string) => {
    await spotifyApi.addTracksToPlaylist(playlistId || '', [uri])
    toast(
      <p>
        Added to <span className='font-bold'>{data?.body.name}</span>
      </p>
    )
    const res = await spotifyApi.getPlaylist(playlistId || '')
    mutate(res)
  }

  return (
    <div className='col-span-5 flex items-center'>
      <span className={classNames('ellipsis hidden text-s-gray-7 group-hover:text-white', !hideAlbum && 'lg:inline')}>
        {track.album.name}
      </span>

      <div className='min-w-0 flex-1' />

      {/* Duration */}
      {!find ? (
        <>
          {/* Favorite */}
          <CustomTooltip content={getSaveTooltipContent()}>
            <button
              onClick={saveTrack}
              className={classNames(
                'mt-1 min-w-[18px] cursor-default hover:brightness-100 group-hover:opacity-100',
                !isSaved && 'opacity-0 brightness-75'
              )}
            >
              <img src={isSaved ? LikeFill : Like} alt={getSaveTooltipContent()} className='h-[15px]' />
            </button>
          </CustomTooltip>
          <span className='ml-8 w-8 text-s-gray-8'>{duration}</span>
          <SongMoreOptions uri={track.uri} />
        </>
      ) : (
        <>
          <Button onClick={() => addToPlaylist(track.uri)} ring={false} color='transparent' size='tiny'>
            Add
          </Button>
        </>
      )}
    </div>
  )
}

export default SongDescription
