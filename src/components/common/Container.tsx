import classNames from 'classnames'

interface Props {
  children?: React.ReactNode
  className?: string
}

const Container = ({ children, className }: Props) => {
  return <div className={classNames('px-4 lg:px-8', className)}>{children}</div>
}

export default Container
