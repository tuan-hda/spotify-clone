import React, { useRef, useState } from 'react'
import { ReactComponent as PlaylistSvg } from 'assets/icons/Playlist.svg'
import { ReactComponent as EditSvg } from 'assets/icons/Edit.svg'
import classNames from 'classnames'
import { useSpotifyStore } from '~/store/spotify'
import { shallow } from 'zustand/shallow'
import { handleError } from '~/utils/https'

type Props = {
  image?: string
  name?: string
  id?: string
  mutate?: () => void
}

function PlaylistCover({ id, image, name, mutate }: Props) {
  const [hover, setHover] = useState(false)
  const ref = useRef<HTMLInputElement | null>(null)
  const [spotifyApi] = useSpotifyStore((state) => [state.spotifyApi], shallow)

  const changeCover: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!id) {
      console.log('NULL PLAYLIST ID')
      return
    }
    if (!e.target.files || e.target.files.length === 0) {
      console.log('NO FILE CHOSEN')
      return
    }
    const reader = new FileReader()
    reader.onload = async () => {
      const base64Data = reader.result
      if (typeof base64Data === 'string') {
        try {
          length = 'data:image/png;base64,'.length
          if (base64Data.indexOf('data:image/jpeg') === 0) {
            length += 1
          }
          await spotifyApi.uploadCustomPlaylistCoverImage(id, base64Data.substring(length))
          mutate && mutate()
        } catch (error) {
          handleError(error)
        }
      }
    }

    reader.readAsDataURL(e.target.files[0])
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className='relative ml-8 h-[192px] w-[192px] gap-2 shadow-s-5 xl:h-[232px] xl:w-[232px]'
    >
      <input
        accept='image/jpeg, image/png, image/jpg'
        onChange={changeCover}
        ref={ref}
        type='file'
        className='hidden'
      />
      {image && <img src={image} alt={name} className='h-full w-full object-cover' />}

      <button
        className={classNames(
          'absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center outline-0',
          {
            'bg-black/70': hover && image,
            'bg-s-gray-2': !image
          }
        )}
        onClick={() => ref.current?.click()}
      >
        {hover && (
          <>
            <EditSvg height='50px' width='50px' fill='#fff' />
            <p className='text-base text-white'>Choose photo</p>
          </>
        )}
        {!hover && !image && <PlaylistSvg fill='#757575' height='64px' width='64px' />}
      </button>
    </div>
  )
}

export default PlaylistCover
