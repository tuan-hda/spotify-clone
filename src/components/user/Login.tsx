import { Navigate } from 'react-router-dom'
import SpotifyLogo from '~/assets/logo/Spotify_Logo_RGB_Green.png'
import { Button } from '~/components/common'
import { loginUrl } from '~/config/spotify'
import { useSpotifyStore } from '~/store/spotify'

const Login = () => {
  const accessToken = useSpotifyStore((state) => state.accessToken)
  const handleClick = () => {
    window.location.href = loginUrl
  }

  return (
    <>
      {!accessToken ? (
        <div className='flex h-screen bg-black'>
          <div className='m-auto'>
            <img src={SpotifyLogo} alt='spotify logo' className='w-96' />
            <Button ring={false} className='mt-10 w-full' onClick={handleClick}>
              LOGIN TO SPOTIFY
            </Button>
          </div>
        </div>
      ) : (
        <Navigate to='/' />
      )}
    </>
  )
}

export default Login
