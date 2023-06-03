import { Route } from 'react-router-dom'
import { Fragment, lazy } from 'react'
import { MainSkeleton, SectionSkeleton } from '~/components/skeleton'
import Playlist from '~/pages/Playlist'

const MainLayout = lazy(() => import('~/layouts/MainLayout'))
const SearchLayout = lazy(() => import('~/layouts/SearchLayout'))
const Main = lazy(() => import('~/pages/Main'))
const Login = lazy(() => import('~/pages/Login'))
const Section = lazy(() => import('~/pages/Section'))
const NotFound = lazy(() => import('~/pages/NotFound'))
const AllResults = lazy(() => import('~/pages/AllResults'))
const TypeResults = lazy(() => import('~/pages/TypeResults'))
const SongResults = lazy(() => import('~/pages/SongResults'))
const YourLibrary = lazy(() => import('~/pages/YourLibrary'))
const LikedSongs = lazy(() => import('~/pages/LikedSongs'))

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
