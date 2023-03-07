import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import MainLayout from "layouts/MainLayout"
import { Suspense, lazy } from "react"

const Main = lazy(() => import("components/main"))
const Album = lazy(() => import("components/album"))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Main />} />
      <Route path='/album' element={<Album />} />
    </Route>
  )
)
export default function App() {
  return (
    <Suspense fallback={<div className='bg-black'></div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
