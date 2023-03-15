import classNames from 'classnames'

type ButtonProps = {
  src?: string
  className?: string
  padding?: string
}

const Button = ({
  src,
  children,
  className = 'h-[15px] w-4',
  padding,
  ...props
}: JSX.IntrinsicElements['button'] & ButtonProps) => {
  return (
    <button
      {...props}
      className='flex h-8 w-8 cursor-auto items-center justify-center p-2 brightness-[0.7] hover:brightness-100'
      style={{
        padding
      }}
    >
      {src && <img src={src} alt='Shuffle' className={classNames('m-auto', className)} />}
      {!src && children}
    </button>
  )
}

export default Button
