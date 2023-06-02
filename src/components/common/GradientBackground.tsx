import React, { useMemo } from 'react'
import { shallow } from 'zustand/shallow'
import useStyleStore from '~/store/style'

interface Props {
  children: React.ReactNode
}

const GradientBackground = ({ children }: Props) => {
  const [dashboardStartColor, defaultStartColor] = useStyleStore(
    (state) => [state.dashboardStartColor, state.defaultStartColor],
    shallow
  )

  const gradientFromStyle = useMemo(
    () =>
      ({
        '--start-color': dashboardStartColor || defaultStartColor
      } as React.CSSProperties),
    [dashboardStartColor, defaultStartColor]
  )

  return (
    <div className='gradient-transition min-h-[332px]' style={gradientFromStyle}>
      {children}
    </div>
  )
}

export default GradientBackground
