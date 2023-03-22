import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
const useScrollTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    document.querySelector('.custom-scrollbar-container > div:first-child')?.scrollTo(0, 0)
  }, [pathname])
}

export default useScrollTop
