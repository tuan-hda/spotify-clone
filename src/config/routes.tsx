import { Route } from 'react-router-dom'
import MainLayout from '~/layouts/MainLayout'
import { lazy } from 'react'

const Main = lazy(() => import('~/components/main'))
const Login = lazy(() => import('~/components/user'))

const routes = (
  <Route>
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Main />} />
      <Route path='/search' element={<Main />} />
    </Route>
    <Route path='/login' element={<Login />} />
  </Route>
)

export default routes
