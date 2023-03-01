import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import MainLayout from "layouts/MainLayout"
import Main from "components/Main/Main"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Main />} />
    </Route>
  )
)
export default function App() {
  return <RouterProvider router={router} />
}
