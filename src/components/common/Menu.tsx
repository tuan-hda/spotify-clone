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

export type Item = {
  content?: string | CustomReactNode
  action?: () => void
}

interface Props {
  items?: string[] | CustomReactNode[] | Item[]
  dividerIndexes?: number[]
  scroll?: boolean
  closePopup?: () => void
}

type WrapperProps = { scroll?: boolean; children?: React.ReactNode }

const Wrapper = ({ scroll = false, children }: WrapperProps) => {
  if (scroll)
    return (
      <div className='h-[400px]'>
        <ScrollView disableScrollSideEffect>
          {children}
          <div className='h-4' />
        </ScrollView>
      </div>
    )
  return <>{children}</>
}

const Menu = ({ items, closePopup, scroll = false, dividerIndexes }: Props) => {
  const isItem = (item: string | CustomReactNode | Item): item is Item => {
    return item !== null && item !== undefined && (item as Item).content !== undefined
  }

  const getItem = (item: string | CustomReactNode | Item) => {
    if (isItem(item)) {
      return {
        content: item.content || '',
        action: item.action || (() => 1)
      }
    }
    return {
      content: item,
      action: () => 1
    }
  }

  return (
    <Wrapper scroll={scroll}>
      <ul className='rounded bg-s-gray-2 p-1 text-sm shadow-s-4'>
        {items?.map((item, index) => {
          const { content, action } = getItem(item)
          return (
            <Fragment key={index}>
              <MenuItem closePopup={closePopup} action={action} content={content} />
              {dividerIndexes?.includes(index) && <div className='border-t border-s-gray-14' />}
            </Fragment>
          )
        })}
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
