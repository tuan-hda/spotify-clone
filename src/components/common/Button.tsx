import classNames from 'classnames'

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  ring?: boolean
  color?: keyof typeof COLORS_MAP
  fontSize?: string
  size?: string
}

const COLORS_MAP = {
  green: 'bg-s-green-1 hover:bg-s-green-2 active:bg-s-green-3 hover:scale-105 active:scale-100',
  white: 'bg-white hover:scale-[1.03]'
}
const Button = ({ ring = true, color = 'green', fontSize, size = 'normal', ...props }: Props) => {
  const getPadding = () => {
    if (size === 'small') return '0'
    if (color === 'green') return '16px'
    return '14px'
  }

  return (
    <button
      {...props}
      type='button'
      className={classNames(
        'rounded-full px-8 text-center text-sm font-bold tracking-widest text-black transition-colors focus:outline-none',
        COLORS_MAP[color],
        props.className,
        size === 'small' && 'flex h-12 items-center',
        ring && 'focus:ring focus:ring-black focus:ring-offset-4'
      )}
      style={{
        fontSize,
        paddingTop: getPadding(),
        paddingBlock: getPadding()
      }}
    />
  )
}

export default Button
