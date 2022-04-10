// https://usehooks-ts.com/react-hook/use-window-size
import { useState } from 'react'

import { useEventListener } from 'hooks/useEventListener'
import { useIsomorphicLayoutEffect } from 'hooks/useIsomorphicLayoutEffect'

type WindowSize = {
  width: number
  height: number
}

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  })

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth / 10,
      height: window.innerHeight / 10,
    })
  }

  useEventListener('resize', handleSize)

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    handleSize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return windowSize
}
