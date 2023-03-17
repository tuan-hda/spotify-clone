import SpotifyWebApi from 'spotify-web-api-node'
import { Response } from '~/types/index.type'

interface Section {
  fetchFn: (
    spotifyApi?: SpotifyWebApi
  ) => Promise<Response<SpotifyApi.UsersRecentlyPlayedTracksResponse | SpotifyApi.UsersTopArtistsResponse> | undefined>
  mapFn:
    | ((
        item: SpotifyApi.PlayHistoryObject | SpotifyApi.ArtistObjectFull
      ) => SpotifyApi.AlbumObjectSimplified | SpotifyApi.ArtistObjectFull)
    | ((item: SpotifyApi.ArtistObjectFull) => SpotifyApi.ArtistObjectFull)
}

export const isAlbumObjectSimplified = (item: any): item is SpotifyApi.AlbumObjectSimplified => item.album === 'album'

const sectionMap = (spotifyApi?: SpotifyWebApi): Record<string, Section> => ({
  'recently-played': {
    fetchFn: async () => spotifyApi?.getMyRecentlyPlayedTracks(),
    mapFn: (item: SpotifyApi.PlayHistoryObject) => item.track.album
  },
  'top-artists': {
    fetchFn: async () => spotifyApi?.getMyTopArtists(),
    mapFn: (item: SpotifyApi.ArtistObjectFull) => item
  }
})

export default sectionMap
