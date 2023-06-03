import { Route } from 'react-router-dom'
import { Fragment, lazy } from 'react'
import { MainSkeleton, SectionSkeleton } from '~/components/skeleton'
import Playlist from '~/pages/Playlist'
import NotFound from '~/pages/NotFound'
import MainLayout from '~/layouts/MainLayout'
import Main from '~/pages/Main'
import { AllResults } from '~/components/search'
import TypeResults from '~/pages/TypeResults'
import SearchLayout from '~/layouts/SearchLayout'
import SongResults from '~/pages/SongResults'
import Section from '~/pages/Section'
import YourLibrary from '~/pages/YourLibrary'
import LikedSongs from '~/pages/LikedSongs'
import Login from '~/pages/Login'

interface Path {
  path: string
  fallback?:
    | React.ExoticComponent<{
        children?: React.ReactNode
      }>
    | (() => JSX.Element)
  getTitle?: () => string
}

const APP_NAME = import.meta.env.VITE_APP_NAME || 'Spotify Clone'

export const paths: { [key: string]: Path } = {
  root: { path: '/', fallback: Fragment, getTitle: () => `${APP_NAME} - Web Player` },
  main: { path: '/', fallback: MainSkeleton },
  search: { path: '/search', getTitle: () => `${APP_NAME} - Search` },
  searchValue: { path: '/search/:value' },
  searchPlaylist: { path: '/search/:value/playlists' },
  searchAlbum: { path: '/search/:value/albums' },
  searchSong: { path: '/search/:value/songs' },
  searchArtist: { path: '/search/:value/artists' },
  section: { path: '/section/:section', fallback: SectionSkeleton },
  login: { path: '/login', fallback: Fragment },
  playlist: { path: '/playlist/:playlistId', fallback: Fragment },
  library: { path: '/collection/playlists' },
  tracks: { path: '/collection/tracks', fallback: Fragment }
}

export const searchPaths = [
  paths.searchValue.path,
  paths.searchPlaylist.path,
  paths.searchArtist.path,
  paths.searchSong.path,
  paths.searchAlbum.path
]

const routes = (
  <Route errorElement={<NotFound />}>
    <Route path={paths.main.path} element={<MainLayout />}>
      <Route index element={<Main />} />
      <Route path={paths.search.path} element={<SearchLayout />}>
        <Route path={paths.searchValue.path} element={<AllResults />} />
        <Route path={paths.searchPlaylist.path} element={<TypeResults />} />
        <Route path={paths.searchAlbum.path} element={<TypeResults />} />
        <Route path={paths.searchArtist.path} element={<TypeResults />} />
        <Route path={paths.searchSong.path} element={<SongResults />} />
      </Route>
      <Route path={paths.section.path} element={<Section />} />
      <Route path={paths.playlist.path} element={<Playlist />} />
      <Route path={paths.library.path} element={<YourLibrary />} />
      <Route path={paths.tracks.path} element={<LikedSongs />} />
    </Route>
    <Route path={paths.login.path} element={<Login />} />
  </Route>
)

export default routes
