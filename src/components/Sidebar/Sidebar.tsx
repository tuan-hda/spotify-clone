import Divider from "components/common/Divider"
import IconButton from "components/common/IconButton"
import Icons from "components/common/Icons"
import { Link } from "react-router-dom"
import Logo from "./Logo"
import Playlist from "./Playlist"

export default function Sidebar() {
  return (
    <nav className='text-s-gray-1 h-screen overflow-auto text-xs md:text-sm sm:max-w-[16rem] lg:max-w-[24rem] hidden md:block py-6 flex-1 scrollbar-hidden'>
      <Logo />

      <div className='px-2 mt-6'>
        <IconButton className='px-4' as={Link} to='/' isSelected icon={<Icons type='home' isSelected />}>
          Home
        </IconButton>
        <IconButton className='px-4' as={Link} to='/' icon={<Icons type='search' />}>
          Search
        </IconButton>
        <IconButton className='px-4' as={Link} to='/' icon={<Icons type='library' />}>
          Your Library
        </IconButton>
      </div>

      <div className='mt-6'>
        <IconButton
          className='px-6'
          icon={
            <div className='bg-s-gray-1 group-hover:bg-white rounded-sm w-6 h-6 flex transition duration-300'>
              <Icons className='m-auto' type='plus' />
            </div>
          }
        >
          Create Playlist
        </IconButton>
        <IconButton
          className='px-6'
          as={Link}
          to='/'
          icon={
            <div className='brightness-75 group-hover:brightness-100 rounded-sm w-6 h-6 flex transition duration-300 liked-gradient'>
              <Icons className='m-auto' isSelected type='heart' />
            </div>
          }
        >
          Liked Songs
        </IconButton>
      </div>

      <Divider className='mx-6 my-2' />

      <Playlist />
    </nav>
  )
}
