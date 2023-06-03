import classNames from 'classnames'
import React, { forwardRef } from 'react'
import { Item } from './Menu'

type Props = Item & {
  className?: string
  closePopup?: () => void
}

const MenuItem = forwardRef<HTMLDivElement, Props>(({ closePopup, content: item, action, className }: Props, ref) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      ref={ref}
      className={classNames(
        'h-full w-full rounded-sm bg-s-gray-2 text-white/90 hover:bg-s-gray-14 hover:text-white',
        typeof item === 'string' && 'p-[10px]',
        className
      )}
      onClick={() => {
        action && action()
        closePopup && closePopup()
      }}
    >
      {item}
    </div>
  )
})

MenuItem.displayName = 'MenuItem'

export default MenuItem
