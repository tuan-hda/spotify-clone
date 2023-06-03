import React, { useEffect, useRef } from 'react'
import { ReactComponent as Time } from 'assets/icons/Time.svg'
import classNames from 'classnames'
import { useScrollPosition } from '~/store/scrollPosition'

type Props = {
  transparent?: boolean
}

function SongHeader({ transparent = false }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const top = useScrollPosition((state) => state.top)

  useEffect(() => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const isSticky = rect.top <= 64

    if (isSticky && transparent) {
      ref.current.style.backgroundColor = 'rgb(24 24 24 / var(--tw-bg-opacity))'
    } else if (transparent) {
      ref.current.style.backgroundColor = 'transparent'
    }
  }, [top, transparent])

  return (
    <div
      ref={ref}
      className={classNames('sticky z-[2] grid h-9 grid-cols-12 items-center border-b border-black/20 text-s-gray-7', {
        'top-16 -mx-8 bg-transparent px-12': transparent,
        'top-28 w-full bg-s-black-5 px-12 ': !transparent
      })}
    >
      <div className='col-span-7 flex items-center'>
        <span>#</span>
        <span className='ml-5'>Title</span>
      </div>
      <div className='col-span-5 flex items-center'>
        <span className='hidden lg:inline'>Album</span>
        <Time className='ml-auto mr-7 fill-s-gray-7' />
      </div>
    </div>
  )
}

export default SongHeader
