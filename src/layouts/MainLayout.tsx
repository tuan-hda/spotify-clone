import Sidebar from "components/sidebar"
import { Login } from "components/user"
import { Outlet } from "react-router-dom"
import getTokenFromUrl from "utils/getTokenFromUrl"
import { useEffect } from "react"
import { useSpotifyStore } from "store/spotify"
import { shallow } from "zustand/shallow"
import { removeHash } from "utils"
import SpotifyWebApi from "spotify-web-api-js"
import Header from "components/header"
import { useState } from "react"
import useResize from "hooks/useResize"

const spotifyApi = new SpotifyWebApi()

export default function MainLayout() {
  const [accessToken, setAccessToken, setUser] = useSpotifyStore(
    (state) => [state.accessToken, state.setAccessToken, state.setUser],
    shallow
  )
  const { width, stopResize, startResize, onResize } = useResize()

  useEffect(() => {
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken)
      spotifyApi.getMe().then((data) => {
        setUser(data)
      })
    }
  }, [accessToken])

  useEffect(() => {
    const hash = getTokenFromUrl()
    removeHash()
    const token = hash.access_token
    if (token) {
      setAccessToken(token)
    }
  }, [])

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
