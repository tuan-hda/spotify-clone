import Button from './Button'
import { ModalProps } from 'flowbite-react'
import CustomModal from './CustomModal'

type Props = ModalProps & {
  confirmDelete?: () => void
}

const DeleteModal = ({ confirmDelete, ...props }: Props) => {
  return (
    <CustomModal {...props}>
      <h1 className='text-2xl font-bold tracking-tight'>Delete from Library</h1>
      <p className='mt-4 text-sm'>This will delete New Playlist from Your Library.</p>
      <div className='mt-auto ml-auto flex gap-4'>
        <Button color='white' size='small' onClick={props.onClose}>
          <span className='text-base tracking-tight'>Cancel</span>
        </Button>
        <Button fontSize='16px' size='small' onClick={confirmDelete}>
          <span className='tracking-tight'>Delete</span>
        </Button>
      </div>
    </CustomModal>
  )
}

export default DeleteModal
