import classNames from "classnames"

interface Props {
  className?: string
}

const Divider = ({ className }: Props) => {
  return <hr className={classNames("border-s-gray-2", className)} />
}

export default Divider
