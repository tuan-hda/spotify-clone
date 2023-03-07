import { NavLink, NavLinkProps } from "react-router-dom"
import { useHistory } from "store/history"
import { shallow } from "zustand/shallow"

const CustomLink = ({ onClick, state, ...props }: NavLinkProps) => {
  const [incLength, incIndex] = useHistory((state) => [state.incLength, state.incIndex], shallow)
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    onClick && onClick(e)
    incLength()
    incIndex()
  }

  return <NavLink state={{ ...state, from: "available" }} onClick={handleClick} {...props} />
}

export default CustomLink
