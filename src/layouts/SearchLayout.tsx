import SearchIcon from 'assets/icons/Search.png'
import { ReactComponent as Close } from 'assets/icons/Close.svg'
import { useDebouncedCallback } from 'use-debounce'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { Suspense, useState } from 'react'
import { Tabs } from '~/components/search'
import Categories from '~/components/list/Categories'
import NotFound from '~/components/search/NotFound'
import { useSearch } from '~/hooks'

const Search = () => {
  const { value } = useParams()
  const [search, setSearch] = useState(value ?? '')
  const navigate = useNavigate()
  const { isNotFound } = useSearch(value)

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

      {/* Result */}
      <div className='px-4 lg:px-8'>
        {value && (
          <>
            {isNotFound() ? (
              <NotFound />
            ) : (
              <>
                <div className='sticky top-16 z-[1] -mx-4 bg-s-black-3 px-4 py-2 lg:-mx-8 lg:px-8'>
                  <Tabs />
                </div>
                <div className='min-h-[600px]'>
                  <Suspense fallback={<></>}>
                    <Outlet />
                  </Suspense>
                </div>
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
