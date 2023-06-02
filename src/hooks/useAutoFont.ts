import React, { useEffect } from 'react'

function useAutoFont(textRef: React.MutableRefObject<HTMLHeadingElement | null>) {
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerWidth = entry.contentRect.width

        const fontSize = Math.min(Math.max(containerWidth / (textRef.current?.innerHTML.length || 10), 40), 90)
        if (textRef.current) {
          textRef.current.style.fontSize = `${fontSize}px`
          textRef.current.style.lineHeight = `${fontSize * 1.15}px`
        }
      }
    })

    textRef.current && resizeObserver.observe(textRef.current)

    return () => {
      textRef.current && resizeObserver.unobserve(textRef.current)
    }
  }, [textRef])
}

export default useAutoFont
