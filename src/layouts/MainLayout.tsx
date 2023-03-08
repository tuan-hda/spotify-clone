import Sidebar from "components/sidebar"
import { Login } from "components/user"
import { Outlet } from "react-router-dom"
import Header from "components/header"
import useResize from "hooks/useResize"
import { useSpotifyStore } from "store/spotify"

export default function MainLayout() {
  const accessToken = useSpotifyStore((state) => state.accessToken)
  const { width, stopResize, startResize, onResize } = useResize()

  return (
    <>
      {accessToken ? (
        <div className='relative flex h-screen text-sm text-white' onMouseUp={stopResize} onMouseMove={onResize}>
          <Sidebar width={width} />
          <div
            className='group absolute top-0 z-[2] flex h-screen w-2 cursor-col-resize'
            style={{
              left: width - 4,
            }}
            onMouseDown={startResize}
          >
            <div className='m-auto h-full border-[#4C4C4C] group-hover:border-r' />
          </div>
          <div className='relative flex-1 flex-shrink bg-s-black-3'>
            <Header />
            <Outlet />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  )
}
