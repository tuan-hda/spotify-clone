import { useCallback, useEffect, useRef } from 'react'

const useUnselectClickOutside = (func: (idx: number) => void) => {
  const ref = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return
      func(-1)
    },
    [func]
  )

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [func, handleClickOutside])

  return { ref }
}

export default useUnselectClickOutside
