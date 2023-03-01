import Sidebar from "components/Sidebar"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div className='bg-black h-screen text-white font text-sm flex'>
      <Sidebar />
      <Outlet />
    </div>
  )
}
