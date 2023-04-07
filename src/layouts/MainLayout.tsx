import Sidebar from '~/components/sidebar'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Header from '~/components/header'
import useResize from '~/hooks/useResize'
import { useSpotifyStore } from '~/store/spotify'
import useAuth from '~/hooks/useAuth'
import { Suspense, useEffect } from 'react'
import Player from '~/components/player'
import { shallow } from 'zustand/shallow'
import getFallback from '~/utils/getFallback'
import useScrollTop from '~/hooks/useScrollTop'
import { useTitle } from '~/hooks'
import ScrollView from '~/components/common/ScrollView'

const MAX_WIDTH = 393
const MIN_WIDTH = 150

export default function MainLayout() {
  const [accessToken, spotifyPlayer] = useSpotifyStore((state) => [state.accessToken, state.spotifyPlayer], shallow)
  const location = useLocation()
  useScrollTop()

  // Custom hooks
  const { width, stopResize, startResize, onResize } = useResize(
    MIN_WIDTH,
    MAX_WIDTH,
    Number(localStorage.getItem('sidebar-width'))
  )
  useAuth()
  useTitle()

  const Fallback = getFallback(location.pathname)

  useEffect(() => {
    const onKeyDown: (this: Document, ev: KeyboardEvent) => void = (e) => {
      if (e.key === ' ' && e.target === document.body) {
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

            <div id='main-container' className='relative flex-1 flex-shrink bg-s-black-3'>
              <Suspense fallback={<div className='h-16 bg-black' />}>
                <Header />
              </Suspense>

              <Suspense fallback={<Fallback />}>
                <ScrollView className='-top-16'>
                  <Outlet />

                  {/* End divider */}
                  <div className='h-[220px] px-4 pt-[88px] lg:px-8'>
                    <div className='border-t border-s-gray-9' />
                  </div>
                </ScrollView>
              </Suspense>
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
