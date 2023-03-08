import { ArtistSkeleton, CardSkeleton } from "components/skeleton"
import { LineSkeleton } from "components/skeleton"
import { useEffect, useRef } from "react"
import { Scrollbars } from "react-custom-scrollbars"
import { useScrollPosition } from "store/scrollPosition"
import { useSpotifyStore } from "store/spotify"
import SpotifyWebApi from "spotify-web-api-node"
import { shallow } from "zustand/shallow"

const spotifyApi = new SpotifyWebApi({
  clientId: import.meta.env.VITE_CLIENT_ID,
})

export default function Main() {
  const [accessToken, setUser] = useSpotifyStore((state) => [state.accessToken, state.setUser], shallow)
  const ref = useRef<Scrollbars>(null)
  const setTop = useScrollPosition((state) => state.setTop)

  const handleScroll = () => {
    setTop(ref.current?.getScrollTop() || 0)
  }

  useEffect(() => {
    spotifyApi.setAccessToken(accessToken)
    spotifyApi.getMe().then((response) => {
      setUser(response.body)
    })
  }, [accessToken])

  return (
    <Scrollbars
      onScroll={handleScroll}
      ref={ref}
      className='custom-scrollbar-container -top-16 h-screen'
      renderThumbVertical={({ style, ...props }) => (
        <div
          {...props}
          className='custom-scrollbar bg-[#a6a6a6] bg-opacity-50  duration-300 hover:bg-[#ffffff] hover:bg-opacity-50'
        />
      )}
    >
      <div className='h-[332px] bg-gradient-to-b from-s-blue-2 to-s-black-3'>
        <div className='h-16' />
        <div className='px-8 py-6'>
          <LineSkeleton className='h-14 w-[500px]' />
          {/* <h1 className='text-3xl font-black'>Good evening</h1> */}
          <div className='transition-color mt-[22px] grid grid-cols-3 gap-6'>
            <ArtistSkeleton />
            <ArtistSkeleton />
            <ArtistSkeleton />
            <ArtistSkeleton />
            <ArtistSkeleton />
            <ArtistSkeleton />
          </div>

          <LineSkeleton className='mt-10 h-6 w-64' />

          <div className='mt-5 grid grid-cols-5 gap-6'>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      </div>
    </Scrollbars>
  )
}
