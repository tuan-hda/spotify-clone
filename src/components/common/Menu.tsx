import classNames from 'classnames'
import { Fragment } from 'react'
import MenuItem from './MenuItem'
import ScrollView from './ScrollView'

export type CustomReactNode =
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
  scroll?: boolean
}

type WrapperProps = { scroll?: boolean; children?: React.ReactNode }

const Menu = ({ items, scroll = false, dividerIndexes }: Props) => {
  const Wrapper = ({ scroll = false, children }: WrapperProps) => {
    if (scroll)
      return (
        <div className='h-[400px]'>
          <ScrollView disableScrollSideEffect>{children}</ScrollView>
        </div>
      )
    return <>{children}</>
  }

  return (
    <Wrapper scroll={scroll}>
      <ul className='mt-2 rounded bg-s-gray-2 p-1 text-sm shadow-s-4'>
        {items?.map((item, index) => (
          <Fragment key={index}>
            <MenuItem item={item} />
            {dividerIndexes?.includes(index) && <div className='border-t border-s-gray-14' />}
          </Fragment>
        ))}
      </ul>
    </Wrapper>
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
