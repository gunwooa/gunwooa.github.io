import '@emotion/react'

type Colors = {
  white: string
  black: string
  blue90: string
  blue100: string
  red100: string
  gray50: string
  gray100: string
  gray200: string
  gray300: string
  gray400: string
  gray500: string
  gray600: string
  gray700: string
  gray800: string
  gray900: string
  hoverBox: string
}

declare module '@emotion/react' {
  export interface Theme {
    colors: Colors
  }
}
