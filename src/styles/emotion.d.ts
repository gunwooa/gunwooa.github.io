import '@emotion/react'
import { colors } from './index'

type Colors = typeof colors

declare module '@emotion/react' {
  export interface Theme {
    colors: Colors
  }
}
