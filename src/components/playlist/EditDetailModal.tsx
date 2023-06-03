import { ModalProps } from 'flowbite-react'
import { Button } from '../common'
import CustomModal from '../common/CustomModal'
import PlaylistCover from './PlaylistCover'
import { useSpotifyStore } from '~/store/spotify'
import { shallow } from 'zustand/shallow'
import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import TextInput from '../common/TextInput'
import { IoIosClose } from 'react-icons/io'
import { useEffect, useState } from 'react'

type Props = ModalProps

const EditDetailModal = ({ ...props }: Props) => {
  const { playlistId } = useParams()
  const [spotifyApi] = useSpotifyStore((state) => [state.spotifyApi], shallow)
  const { data, mutate } = useSWR(playlistId ? ['/get-playlist', playlistId] : null, async ([, id]) =>
    spotifyApi.getPlaylist(id || '')
  )
  const image = data?.body.images.at(0)?.url
  const name = data?.body.name
  const desc = data?.body.description

  //   })
  // }, [name, desc])

  const changeDetail = async () => {
    try {
      if (!playlistId) {
        return
      }
      await spotifyApi.changePlaylistDetails(playlistId, {})
      props.onClose && props.onClose()
    } catch (error) {
      console.log('CHANGE DETAIL ERROR')
      console.log(error)
    }
  }

  return (
    <CustomModal size='xl' bg='dark' {...props}>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold tracking-tight text-white'>Edit details</h1>
        <IoIosClose className='h-9 w-9 text-white/50 transition hover:text-white' onClick={props.onClose} />
      </div>
      <div className='h-6' />
      <div className='flex gap-4'>
        <PlaylistCover className='h-[180px] w-[180px]' id={playlistId} image={image} mutate={mutate} name={name} />
        <div className='flex flex-1 flex-col'>
          <TextInput containerClassName='h-10' label='Name' placeholder='Hello' />
          <div className='h-4' />
          <TextInput
            className='-mx-2 h-full w-[calc(100%+16px)] resize-none px-2 py-3 placeholder-white/50'
            containerClassName='flex-1'
            label='Description'
            as='textarea'
            placeholder='Add an optional description'
          />
        </div>
      </div>

      <div className='ml-auto mt-3 flex gap-4'>
        <Button color='white' size='small' onClick={changeDetail}>
          <span className='text-base tracking-tight'>Save</span>
        </Button>
      </div>

      <p className='mt-3 text-xs font-semibold text-white'>
        By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the
        right to upload the image.
      </p>
    </CustomModal>
  )
}

export default EditDetailModal
