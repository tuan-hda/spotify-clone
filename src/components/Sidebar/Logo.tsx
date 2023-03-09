import { NavLink } from 'react-router-dom'
import LogoImg from '~/assets/logo/Spotify_Logo_RGB_White.png'

export default function Logo() {
  return (
    <NavLink to='/' className='block px-6 pb-2'>
      <img src={LogoImg} alt='Spotify Logo' className='max-h-10' />
    </NavLink>
  )
}
