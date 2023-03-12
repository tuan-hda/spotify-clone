import { useState } from 'react'
import Shuffle from '~/assets/icons/Shuffle.png'
import Previous from '~/assets/icons/Previous.png'
import Next from '~/assets/icons/Next.png'
import Play from '~/assets/icons/Play.png'
import Repeat from '~/assets/icons/Repeat.png'
import { useResize } from '~/hooks'
import Button from './Button'
import ProgressBar from './ProgressBar'

const Control = () => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const maxWidth = ref?.offsetWidth || 1
  const offsetLeft = ref?.offsetLeft || 0
  const { width, setWidth, active, startResize, onResize, stopResize } = useResize(0, maxWidth, 0, offsetLeft)

  return (
    <div
      className='col-span-4 flex h-full flex-1 flex-col justify-center gap-2'
      role='presentation'
      onMouseUp={stopResize}
      onMouseMove={onResize}
    >
      {/* Control Bar */}
      <div className='mx-auto flex select-none gap-2'>
        <Button src={Shuffle} />
        <Button src={Previous} className='h-[14px] w-[14px]' />
        <button className='mx-2 flex cursor-auto hover:scale-[1.07]'>
          <img src={Play} alt='Shuffle' className='m-auto h-8 w-8' />
        </button>
        <Button src={Next} className='h-[14px] w-[14px]' />
        <Button src={Repeat} />
      </div>

      {/* Progress Bar Section */}
      <div className='flex items-center gap-2'>
        <span className='w-10 text-right text-ss font-light text-s-gray-7'>0:23</span>
        <ProgressBar
          active={active}
          offsetLeft={offsetLeft}
          maxWidth={maxWidth}
          setRef={setRef}
          setWidth={setWidth}
          startResize={startResize}
          width={width}
        />
        <span className='w-10 text-ss font-light text-s-gray-7'>3:58</span>
      </div>
    </div>
  )
}

export default Control
