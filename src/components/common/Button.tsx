import classNames from 'classnames'

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  ring?: boolean
  color?: keyof typeof COLORS_MAP
  fontSize?: string
}

const COLORS_MAP = {
  green: 'bg-s-green-1 hover:bg-s-green-2 active:bg-s-green-3 hover:scale-105 active:scale-100 py-4',
  white: 'bg-white py-[14px] hover:scale-[1.03]'
}

const Button = ({ ring = true, color = 'green', fontSize, ...props }: Props) => {
  return (
    <button
      {...props}
      type='button'
      className={classNames(
        'rounded-full px-8 text-center text-sm font-bold tracking-widest text-black transition-colors focus:outline-none',
        COLORS_MAP[color],
        props.className,
        ring && 'focus:ring focus:ring-black focus:ring-offset-4'
      )}
      style={{
        fontSize
      }}
    />
  )
}

export default Button
