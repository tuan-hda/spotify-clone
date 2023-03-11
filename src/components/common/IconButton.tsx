import classNames from 'classnames'
import { useMatch, useResolvedPath } from 'react-router-dom'
import Icons, { IconsProps } from './Icons'

interface ButtonProps<T extends React.ElementType> {
  as?: T
  children?: React.ReactNode
  className?: string
}

interface Props {
  iconType?: IconsProps['type']
  icon?: React.ReactNode
}

export default function IconButton<T extends React.ElementType = 'button'>({
  iconType,
  icon,
  children,
  className,
  as,
  to,
  ...props
}: ButtonProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>> & Props) {
  const Component = as || 'button'

  const resolved = useResolvedPath(to)
  const match = useMatch({
    path: resolved.pathname,
    end: true
  })

  return (
    <Component {...props} to={to} className={classNames('group flex h-10 w-full items-center gap-4', className)}>
      {iconType && <Icons type={iconType} isSelected={!!(to && match)} />}
      {icon}
      <p
        className={classNames(
          'min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-bold text-s-gray-1 transition duration-300 group-hover:text-white',
          {
            'text-white': to && match,
            'text-s-gray-1': !to || !match
          }
        )}
      >
        {children}
      </p>
    </Component>
  )
}
