import SearchIcon from '~/assets/icons/Search.png'
import { ReactComponent as Close } from '~/assets/icons/Close.svg'
import { useDebouncedCallback } from 'use-debounce'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Tabs } from '~/components/search'
import Categories from '~/components/list/Categories'

const Search = () => {
  const { value } = useParams()
  const [search, setSearch] = useState(value ?? '')
  const navigate = useNavigate()

  const debounce = useDebouncedCallback((value) => {
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
    debounce(e.target.value)
  }

  const clear = () => {
    setSearch('')
    debounce('')
  }

  return (
    <>
      <div className='absolute top-3 left-32 z-[2] flex h-10 w-[364px] items-center gap-3 rounded-full bg-white pl-[13px]'>
        <img src={SearchIcon} className='h-[22px] w-[23px]' alt='Search Icon' />
        <input
          value={search}
          onChange={onChange}
          className='flex-1 rounded-r-full text-black placeholder-s-gray-10 outline-none'
          placeholder='What do you want to listen to?'
        />
        <Close onClick={clear} className='absolute right-3' />
      </div>

      <div className='px-4 lg:px-8'>
        <div className='h-16' />
        {value && (
          <>
            <div className='mt-2 px-0.5'>
              <Tabs />
            </div>
            <Outlet />
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
