import Divider from "components/common/Divider"
import IconButton from "components/common/IconButton"
import Icons from "components/common/Icons"
import { Link } from "react-router-dom"
import Logo from "./Logo"
import Playlist from "./Playlist"
interface Props {
  width: number
}

export default function Sidebar({ width = 384 }: Props) {
  return (
    <nav
      className='scrollbar-hidden h-screen max-w-[24rem] overflow-auto bg-black py-6 text-sm text-s-gray-1'
      style={{ width }}
    >
      <Logo />
      <div className='mt-6 px-2'>
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
          type='button'
          className='px-6'
          icon={
            <div className='flex h-6 w-6 flex-shrink-0 rounded-sm bg-s-gray-1 transition duration-300 group-hover:bg-white'>
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
            <div className='liked-gradient flex h-6 w-6 flex-shrink-0 rounded-sm brightness-75 transition duration-300 group-hover:brightness-100'>
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
