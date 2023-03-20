import { useCallback, useEffect, useState } from 'react'

const useOneLineGrid = () => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  const [maxHeight, setMaxHeight] = useState(281)

  useEffect(() => {
    const onResize = () => {
      setMaxHeight(ref?.offsetHeight || 281)
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [ref?.offsetHeight])

  const Wrapper = useCallback(
    (props: JSX.IntrinsicElements['div']) => (
      <div
        {...props}
        className='autofill mt-5 gap-6 overflow-hidden'
        style={{
          maxHeight
        }}
      />
    ),
    [maxHeight]
  )

  return { ref, setMaxHeight, setRef, Wrapper }
}

export default useOneLineGrid
