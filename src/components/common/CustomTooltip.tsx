import classNames from 'classnames'
import { Tooltip, TooltipProps } from 'flowbite-react'

type Props = TooltipProps

const CustomTooltip = (props: Props) => {
  return (
    <Tooltip
      {...props}
      arrow={false}
      className={classNames('tooltip-shadow rounded-md bg-s-gray-2 px-[7px] py-[6px]', props.className)}
      trigger='hover'
    />
  )
}

export default CustomTooltip
