import { Route } from 'react-router-dom'
import MainLayout from '~/layouts/MainLayout'
import { Fragment, lazy } from 'react'
import { MainSkeleton, SectionSkeleton } from '~/components/skeleton'

const Main = lazy(() => import('~/pages/Main'))
const Login = lazy(() => import('~/pages/Login'))
const Section = lazy(() => import('~/pages/Section'))
const NotFound = lazy(() => import('~/pages/NotFound'))
const Search = lazy(() => import('~/pages/Search'))
// const Album = lazy(() => import('~/pages/Album'))

export const paths = {
  root: { path: '/', fallback: Fragment },
  main: { path: '/', fallback: MainSkeleton },
  search: { path: '/search', fallback: Fragment },
  searchValue: { path: '/search/:value', fallback: Fragment },
  section: { path: '/section/:section', fallback: SectionSkeleton },
  login: { path: '/login', fallback: Fragment }
}

const routes = (
  <Route errorElement={<NotFound />}>
    <Route path={paths.main.path} element={<MainLayout />}>
      <Route index element={<Main />} />
      <Route path={paths.search.path} element={<Search />} />
      <Route path={paths.searchValue.path} element={<Search />} />
      <Route path={paths.section.path} element={<Section />} />
    </Route>
    <Route path={paths.login.path} element={<Login />} />
  </Route>
)

export default routes
