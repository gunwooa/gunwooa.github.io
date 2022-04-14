import React from 'react'

import { ThemeProvider } from '@emotion/react'

import { colors } from 'styles'

export const EmotionThemeProvider: React.FC = ({ children }) => {
  const theme = () => ({
    colors: {
      ...colors,
    },
  })

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
