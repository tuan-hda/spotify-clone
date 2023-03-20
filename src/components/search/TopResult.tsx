import { CustomLink } from '../common'
import PlayButton from '../common/PlayButton'
import { useSpotifyStore } from '~/store/spotify'
import { shallow } from 'zustand/shallow'
import ArtistCredit from '../common/ArtistCredit'

interface Props {
  item:
    | SpotifyApi.PlaylistObjectSimplified
    | SpotifyApi.TrackObjectFull
    | SpotifyApi.ArtistObjectFull
    | SpotifyApi.AlbumObjectSimplified
  artists?: SpotifyApi.ArtistObjectSimplified[]
}

const TopResult = ({ item, artists }: Props) => {
  const [device_id, spotifyApi] = useSpotifyStore((state) => [state.deviceId, state.spotifyApi], shallow)

  const play = () => {
    spotifyApi.play({
      device_id,
      context_uri: item.uri
    })
  }

  const getImage = () => {
    if (item.type === 'track') return item.album.images[0].url
    return item.images[0].url
  }

  const getType = () => {
    if (item.type === 'track') return 'Song'
    return item.type[0].toUpperCase() + item.type.slice(1)
  }

  return (
    <div className='group relative cursor-pointer rounded-md bg-s-black-4 p-5 transition duration-300 hover:bg-s-gray-2'>
      <div>
        <img
          loading='lazy'
          src={getImage()}
          alt={item.name}
          className='aspect-square w-full max-w-[92px] rounded object-cover'
        />
        <PlayButton onClick={play} className='absolute bottom-3 right-5 group-hover:-translate-y-2' />
      </div>
      <CustomLink to={`/album/${item.id}`} className='mt-4 block text-base font-bold'>
        <abbr
          title={item.name}
          className='ellipsis leading block text-3xl leading-[56px] tracking-[-0.2px] no-underline'
        >
          {item.name}
        </abbr>
      </CustomLink>
      <p className='flex items-center gap-2'>
        <span className='text-s-gray-7'>{'owner' in item && 'By ' + item.owner.display_name}</span>
        {item.type !== 'playlist' && (
          <>
            {artists
              ? artists.map((artist, index) => (
                  <ArtistCredit disableColorChange key={artist.id} artist={artist} index={index} />
                ))
              : 'Artist'}
          </>
        )}
        <span className='rounded-full bg-s-black-7 px-2 py-[6px]'>{getType()}</span>
      </p>
    </div>
  )
}

export default TopResult
