export interface Response<T> {
  body: T
  headers: Record<string, string>
  statusCode: number
}

export interface CustomArtistObjectFull extends SpotifyApi.ArtistObjectFull {
  artists?: SpotifyApi.ArtistObjectSimplified[]
}
