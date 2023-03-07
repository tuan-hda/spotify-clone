import classNames from "classnames"

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  ring?: boolean
}

const Button = ({ ring = true, ...props }: Props) => {
  return (
    <button
      {...props}
      type='button'
      className={classNames(
        "focus:outline-non rounded-full bg-s-green-1 px-8 py-4 text-center text-sm font-bold tracking-widest text-black transition-colors hover:scale-105 hover:bg-s-green-2 active:scale-100 active:bg-s-green-3",
        props.className,
        ring && "focus:ring focus:ring-black focus:ring-offset-4"
      )}
    />
  )
}

export default Button
