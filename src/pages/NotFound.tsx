import { useRouteError } from 'react-router-dom'
import Logo from '~/assets/icons/Spotify_Icon_RGB_Green.png'
import { Button } from '~/components/common'

const NotFound = () => {
  const error = useRouteError()
  console.log(error)

  return (
    <div className='flex h-screen w-screen bg-s-black-3'>
      <div className='m-auto flex flex-col items-center'>
        <img src={Logo} alt='Spotify Logo' className='h-[60px] w-[60px]' />
        <h1 className='mt-[46px] text-5xl font-bold tracking-[-1.92px] text-white'>Page not found</h1>
        <p className='mt-4 text-s-gray-7'>We can’t seem to find the page you are looking for.</p>
        <a href='/'>
          <Button fontSize='16px' ring={false} color='white' className='mt-10 text-lg tracking-[-0.2px]'>
            Home
          </Button>
        </a>
        <a href='https://support.spotify.com' className='mt-[38px] font-bold text-white hover:underline'>
          Help
        </a>
      </div>
    </div>
  )
}

export default NotFound
