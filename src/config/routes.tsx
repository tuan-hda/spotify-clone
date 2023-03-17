import { Route } from 'react-router-dom'
import MainLayout from '~/layouts/MainLayout'
import { Fragment, lazy } from 'react'
import { MainSkeleton, SectionSkeleton } from '~/components/skeleton'

const Main = lazy(() => import('~/pages/Main'))
const Login = lazy(() => import('~/pages/Login'))
const Section = lazy(() => import('~/pages/Section'))
const NotFound = lazy(() => import('~/pages/NotFound'))
// const Album = lazy(() => import('~/pages/Album'))

export const paths = {
  root: { path: '/', fallback: Fragment },
  main: { path: '/', fallback: MainSkeleton },
  search: { path: '/', fallback: Fragment },
  section: { path: '/section/:section', fallback: SectionSkeleton },
  login: { path: '/login', fallback: Fragment }
}

const routes = (
  <Route errorElement={<NotFound />}>
    <Route path={paths.main.path} element={<MainLayout />}>
      <Route index element={<Main />} />
      <Route path={paths.search.path} element={<Main />} />
      <Route path={paths.section.path} element={<Section />} />
    </Route>
    <Route path={paths.login.path} element={<Login />} />
  </Route>
)

export default routes
