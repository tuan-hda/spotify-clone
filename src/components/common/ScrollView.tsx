import classNames from 'classnames'
import React, { useCallback, useRef } from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { useScrollPosition } from '~/store/scrollPosition'
import { useScrollRef } from '~/store/scrollRef'

interface Props {
  children?: React.ReactNode
  className?: string
  disableScrollSideEffect?: boolean
}

const ScrollView = ({ children, className, disableScrollSideEffect = false }: Props) => {
  const ref = useRef<Scrollbars | null>()

  const setTop = useScrollPosition((state) => state.setTop)
  const setScrollRef = useScrollRef((state) => state.setRef)
  const handleScroll = useCallback(() => {
    setTop(ref.current?.getScrollTop() || 0)
  }, [setTop])

  const onRefReady = (scrRef: Scrollbars) => {
    ref.current = scrRef
    setScrollRef(scrRef)
  }

  return (
    <Scrollbars
      onScroll={!disableScrollSideEffect ? handleScroll : undefined}
      ref={onRefReady}
      className={classNames('custom-scrollbar-container', className)}
      renderThumbVertical={({ ...props }) => (
        <div
          {...props}
          className='custom-scrollbar bg-[#a6a6a6] bg-opacity-50 hover:bg-[#ffffff] hover:bg-opacity-50'
        />
      )}
    >
      {children}
    </Scrollbars>
  )
}

export default ScrollView
