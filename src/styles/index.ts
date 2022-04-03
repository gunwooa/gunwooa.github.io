import { css } from '@emotion/react'

// 화면 절반의 넓이
export const layoutWidth = typeof window !== 'undefined' ? window.innerWidth * (1 / 2) * 0.1 : 0
export const headerFooterHeight = {
  pc: 6.5,
  mobile: 5,
}

export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  blue90: '#E5F0FF',
  blue100: '#0068FF',
  red100: '#FD3D30',
  gray50: `#F8F8F8`,
  gray100: `#F4F4F4`,
  gray200: `#F0F0F0`,
  gray300: `#E6E6E6`,
  gray400: `#E0E0E0`,
  gray500: `#C4C4C4`,
  gray600: `#9E9E9E`,
  gray700: `#5C5C5C`,
  gray800: `#424242`,
  gray900: `#222222`,
  hoverBox: `rgba(0, 0, 0, 0.2)`,
}

export const mainGradientAnimation = css`
  background-image: linear-gradient(to left, #eeaeca, #42a5f5, #26c6da);
  background-size: 300% 300%;
  animation: gradient 10s ease infinite;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`

export const theme = {
  colors: {
    hoverBox: colors.hoverBox,
  },
}

export const pcMediaQuery = `@media all and (min-width: 769px)`
export const mobileMediaQuery = `@media all and (min-width: 280px) and (max-width: 768px)`
