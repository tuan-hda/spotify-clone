import classNames from "classnames"
interface ButtonProps<T extends React.ElementType> {
  as?: T
  children?: React.ReactNode
  className?: string
}

interface Props {
  icon?: JSX.Element
  isSelected?: boolean
}

export default function IconButton<T extends React.ElementType = "button">({
  icon,
  children,
  className,
  isSelected = false,
  as,
  ...props
}: ButtonProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>> & Props) {
  const Component = as || "button"

  return (
    <Component {...props} className={classNames("h-10 gap-4 flex items-center group", className)}>
      {icon}
      <span
        className={classNames("text-s-gray-1 group-hover:text-white font-bold transition duration-300", {
          "text-white": isSelected,
          "text-s-gray-1": !isSelected,
        })}
      >
        {children}
      </span>
    </Component>
  )
}
