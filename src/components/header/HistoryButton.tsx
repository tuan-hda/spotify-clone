import classNames from "classnames"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import { useLocation, useNavigate } from "react-router-dom"
import { useHistory } from "store/history"
import { shallow } from "zustand/shallow"

interface Props {
  type?: string
}

const HistoryButton = ({ type = "back" }: Props) => {
  const [length, index, decIndex, incIndex] = useHistory(
    (state) => [state.length, state.index, state.decIndex, state.incIndex],
    shallow
  )
  const navigate = useNavigate()
  const location = useLocation()
  const Icon = type === "back" ? BsChevronLeft : BsChevronRight

  const handleClick = () => {
    if (type === "back") {
      navigate(-1)
      decIndex()
    } else {
      navigate(1)
      incIndex()
    }
  }

  const isEnabled = () => {
    if (type === "back") {
      if (location.state?.from) return true
    } else {
      if (index < length) return true
    }
    return false
  }

  return (
    <>
      <button
        data-tooltip-target={`tooltip-user-${type}`}
        onClick={handleClick}
        disabled={!isEnabled()}
        className={classNames(
          "pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full",
          isEnabled() ? "bg-s-black-2" : "bg-s-blue-1"
        )}
      >
        <Icon
          className={classNames(
            "h-5 w-5",
            isEnabled() ? "text-white" : "text-s-gray-1",
            type === "back" ? "mr-0.5" : "ml-0.5"
          )}
        />
      </button>
      <div
        id={`tooltip-user-${type}`}
        role='tooltip'
        className='tooltip invisible absolute z-10 inline-block rounded-lg bg-s-gray-2 px-2 py-[6px] text-sm font-medium text-white opacity-0 shadow-lg shadow-black/50 transition-opacity duration-300'
      >
        Go {type}
      </div>
    </>
  )
}

export default HistoryButton
