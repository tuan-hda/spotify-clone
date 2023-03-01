import IconButton from "components/common/IconButton"
import Icons from "components/common/Icons"
import { Link } from "react-router-dom"
import Logo from "./Logo"

export default function Sidebar() {
  return (
    <nav className='text-s-gray h-screen overflow-y-auto text-xs md:text-sm sm:max-w-[16rem] lg:max-w-[24rem] hidden md:block py-6 flex-1'>
      <Logo />

      <div className='px-2 mt-6'>
        <IconButton as={Link} to='/' isSelected icon={<Icons type='home' isSelected />}>
          Home
        </IconButton>
        <IconButton as={Link} to='/' icon={<Icons type='search' />}>
          Search
        </IconButton>
        <IconButton as={Link} to='/' icon={<Icons type='library' />}>
          Your Library
        </IconButton>
      </div>

      <div className='px-2 mt-6'>
        <IconButton
          icon={
            <div className='bg-s-gray group-hover:bg-white rounded-sm w-6 h-6 flex transition duration-300'>
              <Icons className='m-auto' type='plus' />
            </div>
          }
        >
          Create Playlist
        </IconButton>
        <IconButton
          icon={
            <div className='brightness-75 group-hover:brightness-100 rounded-sm w-6 h-6 flex transition duration-300 liked-gradient'>
              <Icons className='m-auto' isSelected type='heart' />
            </div>
          }
        >
          Liked Songs
        </IconButton>
      </div>
    </nav>
  )
}
