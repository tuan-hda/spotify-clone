import classNames from 'classnames'
import React, { forwardRef } from 'react'
import { CustomReactNode } from './Menu'

interface Props {
  item?: string | CustomReactNode
}

const MenuItem = forwardRef<HTMLLIElement, Props>(({ item }: Props, ref) => {
  return (
    <li
      ref={ref}
      className={classNames(
        'h-full w-full rounded-sm bg-s-gray-2 text-white/90 hover:bg-s-gray-14 hover:text-white',
        typeof item === 'string' && 'p-[10px]'
      )}
    >
      {item}
    </li>
  )
})

MenuItem.displayName = 'MenuItem'

export default MenuItem
