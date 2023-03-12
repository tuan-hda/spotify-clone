import Button from './Button'
import FullScreen from '~/assets/icons/Full_screen.png'
import Lyrics from '~/assets/icons/Lyrics.png'
import Queue from '~/assets/icons/Queue.png'
import Volume from '~/assets/icons/Volume.png'
import Mute from '~/assets/icons/Mute.png'
import Connect from '~/assets/icons/Connect_to_a_device.png'
import ProgressBar from './ProgressBar'
import { useResize } from '~/hooks'
import { useState } from 'react'

let oldVolume = 0

const Utils = () => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const maxWidth = ref?.offsetWidth || 1
  const offsetLeft = ref?.offsetLeft || 0
  const { width, setWidth, active, startResize, onResize, stopResize } = useResize(0, maxWidth, maxWidth, offsetLeft)

  const toggleMute = () => {
    if (width) {
      oldVolume = width
      setWidth(0)
    } else {
      setWidth(oldVolume)
    }
  }

  return (
    <div
      className='col-span-3 flex h-full items-center justify-end'
      role='presentation'
      onMouseMove={onResize}
      onMouseUp={stopResize}
    >
      <Button src={Lyrics} />
      <Button src={Queue} />
      <Button src={Connect} />
      <div className='group flex items-center'>
        <Button src={width ? Volume : Mute} onClick={toggleMute} />
        <ProgressBar
          className='mx-1 w-[93px]'
          active={active}
          offsetLeft={offsetLeft}
          maxWidth={maxWidth}
          setRef={setRef}
          setWidth={setWidth}
          startResize={startResize}
          width={width}
        />
      </div>
      <Button src={FullScreen} className='h-[14px] w-[14px]' />
    </div>
  )
}

export default Utils
