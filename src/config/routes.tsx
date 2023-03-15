import { Route } from 'react-router-dom'
import MainLayout from '~/layouts/MainLayout'
import { Fragment, lazy } from 'react'
import { MainSkeleton } from '~/components/skeleton'

const Main = lazy(() => import('~/components/main'))
const Login = lazy(() => import('~/components/user'))
const Section = lazy(() => import('~/components/section'))

const Temp = () => <div className='h-full flex-1 bg-black' />

export const paths = {
  root: { path: '/', fallback: MainSkeleton },
  search: { path: '/', fallback: Fragment },
  section: { path: '/section/:section', fallback: Temp },
  login: { path: '/login', fallback: Fragment }
}

const routes = (
  <Route>
    <Route path={paths.root.path} element={<MainLayout />}>
      <Route index element={<Main />} />
      <Route path={paths.search.path} element={<Main />} />
      <Route path={paths.section.path} element={<Section />} />
    </Route>
    <Route path={paths.login.path} element={<Login />} />
  </Route>
)

export default routes
