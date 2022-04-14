import React, { useContext } from 'react'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'

import styled from '@emotion/styled'

import { StoreContext } from 'providers/StoreProvider'

import { pcMediaQuery } from 'styles'

type ThemeModeToggleBtnProps = {
  size: number
  padding: number
}

const ThemeModeToggleBtn: React.VFC<ThemeModeToggleBtnProps> = ({ size, padding }) => {
  const { themeMode } = useContext(StoreContext)

  return (
    <BtnBox size={size + padding * 2} onClick={themeMode.toggleTheme}>
      <BsFillSunFill
        css={theme => ({
          position: 'relative',
          top: `${padding}rem`,
          left: `${padding}rem`,
          height: `${size}rem`,
          width: !(themeMode.theme === 'dark') ? `${size}rem` : '0rem',
          color: theme.colors.gray900,
          transition: '0.5s',
          transform: !(themeMode.theme === 'dark') ? 'rotate(0deg)' : 'rotate(360deg)',
        })}
      />
      <BsFillMoonFill
        css={theme => ({
          position: 'absolute',
          top: `${padding}rem`,
          left: `${padding}rem`,
          height: `${size}rem`,
          width: themeMode.theme === 'dark' ? `${size}rem` : '0rem',
          color: theme.colors.white,
          transition: '0.5s',
          transform: themeMode.theme === 'dark' ? 'rotate(0deg)' : 'rotate(360deg)',
        })}
      />
    </BtnBox>
  )
}

const BtnBox = styled.div<{ size: number }>`
  position: relative;
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;

  ${pcMediaQuery} {
    border-radius: 50%;
    cursor: pointer;
    :hover {
      background-color: ${props => props.theme.colors.hoverBox};
    }
  }
`

export default ThemeModeToggleBtn
