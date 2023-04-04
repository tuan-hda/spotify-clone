import { ReactComponent as NewTab } from 'assets/icons/NewTab.svg'
import { useNavigate } from 'react-router-dom'
import { logout } from '~/api/spotify.api'
import { useSpotifyStore } from '~/store/spotify'

const Menu = () => {
  const navigate = useNavigate()
  const clearSession = useSpotifyStore((state) => state.clearSession)
  const handleLogout = async () => {
    try {
      await logout()
      clearSession()
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ul className='mt-2 rounded bg-s-gray-2 p-1 text-sm shadow-s-4'>
      <li className='rounded-sm bg-s-gray-2 text-white/90 hover:bg-s-gray-14 hover:text-white'>
        <button
          className='flex w-full cursor-default justify-between p-[10px] outline-none'
          onClick={() =>
            window
              .open(
                'https://www.spotify.com/vn-vi/account/overview/?utm_source=spotify&utm_medium=menu&utm_campaign=your_account',
                '_blank'
              )
              ?.focus()
          }
        >
          Account <NewTab fill='#fff' />
        </button>
      </li>
      <li className='rounded-sm bg-s-gray-2 p-[10px] text-white/90 hover:bg-s-gray-14 hover:text-white'>Profile</li>
      <li className='rounded-sm bg-s-gray-2 p-[10px] text-white/90 hover:bg-s-gray-14 hover:text-white'>Settings</li>
      <div className='border-t border-s-gray-14' />
      <li className='rounded-sm bg-s-gray-2 text-white/90 hover:bg-s-gray-14 hover:text-white'>
        <button className='w-full cursor-default p-[10px] text-left outline-none' onClick={handleLogout}>
          Logout
        </button>
      </li>
    </ul>
  )
}

export default Menu
