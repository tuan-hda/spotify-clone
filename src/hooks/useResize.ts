import { useEffect, useState } from 'react'

const useResize = (minWidth: number, maxWidth: number, initialWidth?: number, offsetLeft = 0) => {
  const [drag, setDrag] = useState({
    active: false,
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
      active: true,
      x: e.clientX
    }))
  }

  const onResize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { active, x } = drag
    if (active) {
      let newW = width + e.clientX - x
      if (newW > maxWidth) {
        newW = maxWidth
        setDrag({ ...drag, x: offsetLeft + maxWidth })
      } else if (newW < minWidth) {
        newW = minWidth
        setDrag({ ...drag, x: offsetLeft + minWidth })
      } else {
        setDrag({ ...drag, x: e.clientX })
      }
      setWidth(newW)
    }
  }

  const stopResize = () => {
    setDrag({ ...drag, active: false })
  }

  return { width, setWidth, startResize, onResize, stopResize, active: drag.active }
}

export default useResize
