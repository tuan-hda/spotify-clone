import classNames from 'classnames'
import { Fragment } from 'react'

type CustomReactNode =
  | number
  | boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  | React.ReactFragment
  | React.ReactPortal
  | null
  | undefined

interface Props {
  items?: string[] | CustomReactNode[]
  dividerIndexes?: number[]
}

const Menu = ({ items, dividerIndexes }: Props) => {
  return (
    <ul className='mt-2 rounded bg-s-gray-2 p-1 text-sm shadow-s-4'>
      {items?.map((item, index) => (
        <Fragment key={index}>
          <li
            className={classNames(
              'rounded-sm bg-s-gray-2 text-white/90 hover:bg-s-gray-14 hover:text-white',
              typeof item === 'string' && 'p-[10px]'
            )}
          >
            {item}
          </li>
          {dividerIndexes?.includes(index) && <div className='border-t border-s-gray-14' />}
        </Fragment>
      ))}
    </ul>
  )
}

export const MenuButton = (
  props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
) => {
  return (
    <button
      {...props}
      className={classNames('flex w-full cursor-default justify-between p-[10px] outline-none', props.className)}
    />
  )
}

export default Menu
