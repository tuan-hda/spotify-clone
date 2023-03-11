import Sidebar from '~/components/sidebar'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '~/components/header'
import useResize from '~/hooks/useResize'
import { useSpotifyStore } from '~/store/spotify'
import useAuth from '~/hooks/useAuth'
import { Suspense } from 'react'

export default function MainLayout() {
  const accessToken = useSpotifyStore((state) => state.accessToken)
  const { width, stopResize, startResize, onResize } = useResize()
  useAuth()

  return (
    <>
      {accessToken ? (
        <div
          role='presentation'
          className='relative flex h-screen text-sm text-white'
          onMouseUp={stopResize}
          onMouseMove={onResize}
        >
          <Sidebar width={width} />
          <div
            role='presentation'
            className='group absolute top-0 z-[2] flex h-screen w-2 cursor-e-resize'
            style={{
              left: width - 4
            }}
            onMouseDown={startResize}
          >
            <div className='m-auto h-full border-[#4C4C4C] group-hover:border-r' />
          </div>

          <div className='relative flex-1 flex-shrink bg-s-black-3'>
            <Suspense fallback={<div className='h-16 bg-black' />}>
              <Header />
            </Suspense>
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to='/login' />
      )}
    </>
  )
}
