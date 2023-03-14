import Sidebar from '~/components/sidebar'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '~/components/header'
import useResize from '~/hooks/useResize'
import { useSpotifyStore } from '~/store/spotify'
import useAuth from '~/hooks/useAuth'
import { Suspense, useEffect } from 'react'
import Player from '~/components/player'
import { shallow } from 'zustand/shallow'

const MAX_WIDTH = 393
const MIN_WIDTH = 150

export default function MainLayout() {
  const [accessToken, spotifyPlayer] = useSpotifyStore((state) => [state.accessToken, state.spotifyPlayer], shallow)
  const { width, stopResize, startResize, onResize } = useResize(
    MIN_WIDTH,
    MAX_WIDTH,
    Number(localStorage.getItem('sidebar-width'))
  )
  useAuth()

  useEffect(() => {
    const onKeyDown: (this: Document, ev: KeyboardEvent) => void = (e) => {
      if (e.key === ' ') {
        e.preventDefault()
        spotifyPlayer?.togglePlay()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [spotifyPlayer])

  return (
    <>
      {accessToken ? (
        <main className='flex h-screen flex-col overflow-hidden'>
          <div
            role='presentation'
            className='relative flex flex-1 text-sm text-white'
            onMouseUp={stopResize}
            onMouseMove={onResize}
          >
            <Sidebar width={width} maxWidth={MAX_WIDTH} />
            <div
              role='presentation'
              className='group absolute top-0 z-[2] flex h-full w-2 cursor-e-resize'
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

          {accessToken ? <Player /> : <div className='h-[90px] bg-s-black-5' />}
        </main>
      ) : (
        <Navigate to='/login' />
      )}
    </>
  )
}
