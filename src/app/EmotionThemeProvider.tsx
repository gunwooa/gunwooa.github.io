import React from 'react'
import { ThemeProvider } from '@emotion/react'

import { colors } from 'styles'

const EmotionThemeProvider: React.FC = ({ children }) => {
  const theme = () => ({
    colors: {
      ...colors,
    },
  })
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default EmotionThemeProvider
