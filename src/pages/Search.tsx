import SearchIcon from '~/assets/icons/Search.png'
import { useDebouncedCallback } from 'use-debounce'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

const Search = () => {
  const { value } = useParams()
  const [search, setSearch] = useState(value)
  const navigate = useNavigate()
  const debounce = useDebouncedCallback((value) => {
    if (!value) navigate('/search')
    else navigate(`/search/${value}`)
  }, 300)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    debounce(e.target.value)
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
      </div>
      <Outlet />
    </>
  )
}

export default Search
