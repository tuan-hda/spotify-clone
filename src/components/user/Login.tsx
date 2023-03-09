import SpotifyLogo from '~/assets/logo/Spotify_Logo_RGB_Green.png'
import { Button } from '~/components/common'
import { loginUrl } from '~/config/spotify'

const Login = () => {
  const handleClick = () => {
    window.location.href = loginUrl
  }

  return (
    <div className='flex h-screen bg-black'>
      <div className='m-auto'>
        <img src={SpotifyLogo} alt='spotify logo' className='w-96' />
        <Button ring={false} className='mt-10 w-full' onClick={handleClick}>
          LOGIN TO SPOTIFY
        </Button>
      </div>
    </div>
  )
}

export default Login
