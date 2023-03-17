import { useEffect, useState } from 'react'
import { assertIsNode } from '~/utils/guards'

const useResize = (
  minWidth: number,
  maxWidth: number,
  initialWidth?: number,
  offsetLeft = 0,
  ref?: HTMLDivElement | null
) => {
  const [drag, setDrag] = useState({
    active: false,
    moved: false,
    x: 0
  })
  const [width, setWidth] = useState<number>(initialWidth || maxWidth)

  useEffect(() => {
    if (offsetLeft) {
      setDrag((prev) => ({
        ...prev,
        x: offsetLeft
      }))
    }
  }, [offsetLeft])

  useEffect(() => {
    if (initialWidth) {
      setWidth(initialWidth)
    }
  }, [initialWidth])

  const startResize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDrag(() => ({
      moved: false,
      active: true,
      x: e.clientX
    }))
  }

  const onResize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { active, x } = drag
    if (active) {
      if (!drag.moved) {
        setDrag((state) => ({
          ...state,
          moved: true
        }))
      }
      let newW = width + e.clientX - x
      if (newW > maxWidth) {
        newW = maxWidth
        setDrag((state) => ({ ...state, x: offsetLeft + maxWidth }))
      } else if (newW < minWidth) {
        newW = minWidth
        setDrag((state) => ({ ...state, x: offsetLeft + minWidth }))
      } else {
        setDrag((state) => ({ ...state, x: e.clientX }))
      }
      setWidth(newW)
    }
  }

  const stopResize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDrag({ ...drag, active: false, moved: false })
    if (drag.moved) return true
    if (!e) return false
    try {
      assertIsNode(e.target)
      if (ref?.contains(e.target)) return true
    } catch (error) {
      console.log(error)
    }
    return false
  }

  return { width, setWidth, startResize, onResize, stopResize, active: drag.active }
}

export default useResize
