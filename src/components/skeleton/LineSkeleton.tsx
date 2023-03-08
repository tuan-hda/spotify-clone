import classNames from "classnames"

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const customStyle = {
  "--bg-from": "#484848",
  "--bg-to": "#565656",
} as React.CSSProperties

const LineSkeleton = ({ className, style, ...props }: Props) => {
  return (
    <div
      style={{ ...style, ...customStyle }}
      {...props}
      className={classNames("animate-shine rounded-full bg-s-gray-3", className)}
    />
  )
}

export default LineSkeleton
