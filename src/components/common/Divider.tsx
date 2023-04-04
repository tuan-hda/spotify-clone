import classNames from 'classnames'

interface Props {
  className?: string
}

const Divider = ({ className }: Props) => {
  return <div className={classNames('border-t border-s-gray-2', className)} />
}

export default Divider
