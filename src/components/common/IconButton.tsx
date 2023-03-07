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
    <Component {...props} className={classNames("group flex h-10 w-full items-center gap-4", className)}>
      {icon}
      <p
        className={classNames(
          "min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-bold text-s-gray-1 transition duration-300 group-hover:text-white",
          {
            "text-white": isSelected,
            "text-s-gray-1": !isSelected,
          }
        )}
      >
        {children}
      </p>
    </Component>
  )
}
