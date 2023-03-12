import classNames from 'classnames'
import { useCallback } from 'react'

interface Props {
  setRef: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>
  width: number
  setWidth: React.Dispatch<React.SetStateAction<number>>
  startResize: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  active: boolean
  offsetLeft: number
  maxWidth: number
  className?: string
}

const ProgressBar = ({
  setRef,
  width,
  active,
  setWidth,
  startResize,
  maxWidth,
  offsetLeft,
  className = 'flex-1'
}: Props) => {
  const onRefChange = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        setRef(node)
      }
    },
    [setRef]
  )

  const progress = Math.round((100 * width) / maxWidth)

  const skip: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setWidth(e.clientX - offsetLeft)
  }

  const mouseDownHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    skip(e)
    startResize(e)
  }

  return (
    <div
      className={classNames('group flex h-3 items-center', className)}
      role='presentation'
      ref={onRefChange}
      onMouseDown={mouseDownHandler}
    >
      <div className='relative h-1 flex-1 rounded-full bg-s-gray-6'>
        <div
          className={classNames('h-1 rounded-full group-hover:bg-s-green-4', active ? 'bg-s-green-4' : 'bg-white')}
          style={{
            width: progress + '%'
          }}
        />
        <button
          className={classNames(
            'absolute -mt-2 h-3 w-3 cursor-auto rounded-full bg-white group-hover:block',
            !active && 'hidden'
          )}
          style={{
            left: `calc(${progress}% - 6px)`
          }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
