import classNames from 'classnames'
import React, { useState } from 'react'

interface Props<T extends React.ElementType> {
  label?: string
  as?: T
  containerClassName?: string
  className?: string
}

const TextInput = <T extends React.ElementType = 'input'>({
  label,
  className,
  containerClassName,
  as: Component = 'input' as T,
  ...props
}: React.ComponentPropsWithRef<T> & Props<T>) => {
  const [show, setShow] = useState(false)

  return (
    <div
      className={classNames(
        'relative flex w-full min-w-0 flex-shrink items-center rounded-md bg-s-gray-15 px-3 pt-0.5 focus-within:border focus-within:border-s-gray-6 focus-within:bg-s-gray-16',
        containerClassName
      )}
    >
      <span
        className={classNames(
          'absolute -top-2 left-2 text-xs text-white transition duration-300',
          !show && 'pointer-events-none opacity-0'
        )}
      >
        {label}
      </span>
      <Component
        {...props}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className={classNames(
          'w-full border-0 bg-transparent text-sm text-white outline-0 ring-0 focus:outline-0 focus:ring-0',
          className || 'placeholder:text-white '
        )}
      />
    </div>
  )
}

export default TextInput
