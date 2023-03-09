import { useState } from 'react'

const MAX_WIDTH = 384
const MIN_WIDTH = 150

const useResize = () => {
  const [drag, setDrag] = useState({
    active: false,
    x: 0
  })
  const [width, setWidth] = useState<number>(Number(localStorage.getItem('sidebar-width')) || MAX_WIDTH)

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
      if (newW > MAX_WIDTH) {
        newW = MAX_WIDTH
        setDrag({ ...drag, x: MAX_WIDTH })
      } else if (newW < MIN_WIDTH) {
        newW = MIN_WIDTH
        setDrag({ ...drag, x: MIN_WIDTH })
      } else {
        setDrag({ ...drag, x: e.clientX })
      }
      setWidth(newW)
      localStorage.setItem('sidebar-width', String(newW))
    }
  }

  const stopResize = () => {
    setDrag({ ...drag, active: false })
  }

  return { width, startResize, onResize, stopResize }
}

export default useResize
