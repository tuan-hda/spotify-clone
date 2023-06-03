import { Modal, ModalProps } from 'flowbite-react'
import { useSpring, animated } from '@react-spring/web'
import classNames from 'classnames'

type Props = ModalProps & {
  children: React.ReactNode
  bg?: 'dark' | 'light'
  contentClassName?: string
}

const CustomModal = ({ children, contentClassName, size = 'md', bg = 'light', ...props }: Props) => {
  const styles = useSpring({
    opacity: props.show ? 1 : 0,
    y: props.show ? 0 : -40,
    config: {
      easing: (t) => t,
      duration: 100,
      immediate: true // Start the animation immediately
    }
  })

  return (
    <Modal {...props} dismissible size={size}>
      <animated.div
        style={styles}
        className={classNames(
          'custom-modal m-auto flex min-h-[210px] w-full flex-col rounded-lg p-6',
          bg === 'light' ? 'bg-white' : 'bg-s-gray-2',
          contentClassName
        )}
      >
        {children}
      </animated.div>
    </Modal>
  )
}

export default CustomModal
