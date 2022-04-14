import React, { useContext } from 'react'
import { ThemeProvider } from '@emotion/react'

import { StoreContext } from 'providers/StoreProvider'
import { colors } from 'styles'

const EmotionThemeProvider: React.FC = ({ children }) => {
  const {
    themeMode: { theme },
  } = useContext(StoreContext)

  const theme_ = () => ({
    colors: {
      ...colors,
      darkModeColor: theme === 'dark' ? colors.white : colors.black,
      darkModeBackground: theme === 'dark' ? colors.black : colors.white,
    },
  })

  return <ThemeProvider theme={theme_}>{children}</ThemeProvider>
}

export default EmotionThemeProvider
