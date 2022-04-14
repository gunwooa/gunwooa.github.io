import '@emotion/react'
import { colors } from './index'

type Colors = typeof colors

type ThemeColors = {
  darkModeColor: string
  darkModeBackground: string
}

declare module '@emotion/react' {
  export interface Theme {
    colors: Colors & ThemeColors
  }
}
