import SpotifyWebApi from 'spotify-web-api-node'
import { Response } from '~/types/index.type'

type CustomObjectContext =
  | SpotifyApi.PlayHistoryObject
  | SpotifyApi.ArtistObjectFull
  | SpotifyApi.TrackObjectFull
  | SpotifyApi.PlaylistObjectSimplified

interface CustomArtistObjectFull extends SpotifyApi.ArtistObjectFull {
  artists?: SpotifyApi.ArtistObjectSimplified[]
}

interface CustomListOfFeaturedPlaylistsResponse extends Omit<SpotifyApi.ListOfFeaturedPlaylistsResponse, 'playlists'> {
  items: SpotifyApi.PlaylistObjectSimplified[]
}

interface Section {
  fetchFn: (
    spotifyApi?: SpotifyWebApi
  ) => Promise<
    | Response<
        | SpotifyApi.UsersRecentlyPlayedTracksResponse
        | SpotifyApi.UsersTopArtistsResponse
        | SpotifyApi.UsersTopTracksResponse
        | CustomListOfFeaturedPlaylistsResponse
      >
    | undefined
  >
  mapFn: (
    items: CustomObjectContext[],
    item: CustomObjectContext,
    index: number
  ) =>
    | SpotifyApi.AlbumObjectSimplified
    | CustomArtistObjectFull
    | SpotifyApi.TrackObjectFull
    | SpotifyApi.PlaylistObjectSimplified
    | undefined
  getItems?: (body: SpotifyApi.ListOfCurrentUsersPlaylistsResponse) => SpotifyApi.PlaylistObjectSimplified[]
}

const findAlbum = (items: CustomObjectContext[], id: string, to: number) => {
  return items.findIndex((value, index) => 'track' in value && index < to && value.track.album.id === id) !== -1
}

type keys = 'recently-played' | 'top-artists' | 'top-tracks' | 'featured-playlists'

const sectionRecord = (spotifyApi?: SpotifyWebApi): Record<keys, Section> => ({
  'recently-played': {
    fetchFn: async () => spotifyApi?.getMyRecentlyPlayedTracks(),
    mapFn: (items, item, index) => {
      if (item && 'track' in item && !findAlbum(items, item.track.album.id, index)) {
        return { ...item.track.album, artists: item.track.artists }
      }
    }
  },
  'top-artists': {
    fetchFn: async () => spotifyApi?.getMyTopArtists(),
    mapFn: (_, item) => {
      if ('type' in item) return item
    }
  },
  'top-tracks': {
    fetchFn: async () => spotifyApi?.getMyTopTracks(),
    mapFn: (_, item) => {
      if ('type' in item) return item
    }
  },
  'featured-playlists': {
    fetchFn: async () => {
      let res: Response<CustomListOfFeaturedPlaylistsResponse> = {}
      await spotifyApi?.getFeaturedPlaylists({}, (_, response) => {
        res = {
          ...response,
          body: {
            ...response.body,
            items: response.body.playlists.items
          }
        }
      })
      return res
    },
    mapFn: (_, item) => {
      if ('type' in item) return item
    }
  }
})

export default sectionRecord
