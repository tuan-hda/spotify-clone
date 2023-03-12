import classNames from 'classnames'

interface ButtonProps {
  src: string
  className?: string
}

const Button = ({ src, className = 'h-[15px] w-4', ...props }: JSX.IntrinsicElements['button'] & ButtonProps) => {
  return (
    <button {...props} className='flex h-8 w-8 cursor-auto p-2 brightness-[0.7] hover:brightness-100'>
      <img src={src} alt='Shuffle' className={classNames('m-auto', className)} />
    </button>
  )
}

export default Button
