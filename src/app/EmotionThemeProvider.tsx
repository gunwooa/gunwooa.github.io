import React, { useContext } from 'react'
import { ThemeProvider } from '@emotion/react'

import { StoreContext } from './StoreProvider'
import { colors } from 'styles'

const EmotionThemeProvider: React.FC = ({ children }) => {
  const {
    darkMode: { isDarkMode },
  } = useContext(StoreContext)

  const theme = () => ({
    colors: {
      ...colors,
      themeColor: isDarkMode ? colors.white : colors.black,
      themeBackground: isDarkMode ? colors.black : colors.white,
    },
  })

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default EmotionThemeProvider
