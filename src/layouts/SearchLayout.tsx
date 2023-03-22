import SearchIcon from '~/assets/icons/Search.png'
import { ReactComponent as Close } from '~/assets/icons/Close.svg'
import { useDebouncedCallback } from 'use-debounce'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { Suspense, useState } from 'react'
import { Tabs } from '~/components/search'
import Categories from '~/components/list/Categories'
import useSWR from 'swr'
import { useSpotifyStore } from '~/store/spotify'
import NotFound from '~/components/search/NotFound'

const Search = () => {
  const { value } = useParams()
  const [search, setSearch] = useState(value ?? '')
  const spotifyApi = useSpotifyStore((state) => state.spotifyApi)
  const navigate = useNavigate()
  const { data } = useSWR(
    value ? ['/search', value] : null,
    async ([, value]) => spotifyApi.search(value, ['album', 'artist', 'playlist', 'track']),
    { suspense: false }
  )

  const updateUrl = useDebouncedCallback((value) => {
    if (!value) navigate('/search')
    else
      navigate(`/search/${value}`, {
        state: {
          from: 'available'
        }
      })
  }, 300)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    updateUrl(e.target.value)
  }

  const clear = () => {
    setSearch('')
    updateUrl('')
  }

  return (
    <>
      {/* Search bar */}
      <div className='sticky top-3 left-32 z-[2] mb-5 flex h-10 w-[364px] items-center gap-3 rounded-full bg-white pl-[13px]'>
        <img src={SearchIcon} className='h-[22px] w-[23px]' alt='Search Icon' />
        <input
          value={search}
          onChange={onChange}
          className='h-full flex-1 rounded-r-full text-black placeholder-s-gray-10 outline-none'
          placeholder='What do you want to listen to?'
        />
        {search && <Close onClick={clear} className='absolute right-3' />}
      </div>

      <div className='px-4 lg:px-8'>
        {value && (
          <>
            {data?.body.albums?.total === 0 &&
            data?.body.playlists?.total === 0 &&
            data?.body.tracks?.total === 0 &&
            data?.body.artists?.total === 0 ? (
              <NotFound />
            ) : (
              <>
                <div className='sticky top-16 z-[1] -mx-4 bg-s-black-3 px-4 pt-2 lg:-mx-8 lg:px-8'>
                  <Tabs />
                </div>
                <div className='h-2' />
                <Suspense fallback={<div />}>
                  <Outlet />
                </Suspense>
              </>
            )}
          </>
        )}
        {!value && (
          <>
            <h2 className='mt-8 text-2xl font-bold'>Browse all</h2>
            <Categories />
          </>
        )}
      </div>
    </>
  )
}

export default Search
