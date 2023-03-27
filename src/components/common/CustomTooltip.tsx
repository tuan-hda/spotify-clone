import classNames from 'classnames'
import { Tooltip, TooltipProps } from 'flowbite-react'

type Props = TooltipProps & {
  raw?: boolean | number
}

const CustomTooltip = ({ raw = false, ...props }: Props) => {
  if (raw) return <>{props.children}</>

  return (
    <Tooltip
      {...props}
      arrow={false}
      className={classNames(
        'tooltip-shadow whitespace-nowrap rounded-md bg-s-gray-2 px-[7px] py-[6px]',
        props.className
      )}
      trigger='hover'
    />
  )
}

export default CustomTooltip
