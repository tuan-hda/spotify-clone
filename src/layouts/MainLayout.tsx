import Sidebar from "components/sidebar"
import { Login } from "components/user"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <Login />
    // <div className='flex h-screen bg-black text-sm text-white'>
    //   <Sidebar />
    //   <Outlet />
    // </div>
  )
}
