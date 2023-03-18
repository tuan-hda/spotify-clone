import { Fragment } from 'react'
import CustomLink from './CustomLink'
import { extractId } from '~/utils/utils'
import classNames from 'classnames'

interface Props {
  artist: SpotifyApi.ArtistObjectSimplified | Spotify.Entity
  index: number
  disableColorChange?: boolean
}

const ArtistCredit = ({ artist, index, disableColorChange = true }: Props) => {
  const getArtistId = () => {
    if ('type' in artist) return artist.id
    return extractId(artist.uri)
  }

  return (
    <Fragment>
      {index > 0 && ', '}
      <CustomLink
        to={`/artist/${getArtistId()}`}
        className={classNames('text-s-gray-8 hover:underline', !disableColorChange && 'group-hover:text-white')}
      >
        {artist.name}
      </CustomLink>
    </Fragment>
  )
}

export default ArtistCredit
