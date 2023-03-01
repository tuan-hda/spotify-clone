import { NavLink } from "react-router-dom"
import LogoImg from "assets/logo/Spotify_Logo_RGB_White.png"

export default function Logo() {
  return (
    <NavLink to='/' className='px-6 block'>
      <img src={LogoImg} className='h-10' />
    </NavLink>
  )
}
