import classNames from "classnames"
import { NavLink } from "react-router-dom"

interface ButtonProps<T extends React.ElementType> {
  as?: T
  children?: React.ReactNode
}

interface Props {
  icon?: JSX.Element
  isSelected?: boolean
}

export default function IconButton<T extends React.ElementType = "button">({
  icon,
  children,
  isSelected = false,
  as,
  ...props
}: ButtonProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>> & Props) {
  const Component = as || "button"

  return (
    <Component {...props} className='px-4 h-10 gap-4 flex items-center group'>
      {icon}
      <span
        className={classNames("text-s-gray group-hover:text-white font-bold transition duration-300", {
          "text-white": isSelected,
          "text-s-gray": !isSelected,
        })}
      >
        {children}
      </span>
    </Component>
  )
}
