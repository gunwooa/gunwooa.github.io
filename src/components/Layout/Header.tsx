import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { IoLogoBuffer } from 'react-icons/io'
import { HiViewGrid } from 'react-icons/hi'
import { GiOverkill } from 'react-icons/gi'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'

import { StoreContext } from 'providers/StoreProvider'

import {
  pcMediaQuery,
  mobileMediaQuery,
  layoutWidth,
  headerFooterHeight,
  mainGradientAnimation,
} from 'styles'

const Header: React.VFC = () => {
  const { themeMode } = useContext(StoreContext)

  console.log('dark mode: ', themeMode)

  return (
    <HeaderBox>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: ${layoutWidth}rem;

          ${mobileMediaQuery} {
            width: 100%;
          }
        `}
      >
        <HomeLink to="/">
          <IoLogoBuffer css={homeIcon} />
          GW Devlog
        </HomeLink>

        <div
          css={css`
            display: flex;
          `}
        >
          {/* TODO: 리팩터링 */}
          <ToggleBtn
            checked={themeMode.theme === 'dark'}
            onClick={() => {
              themeMode.toggleTheme()
            }}
          >
            <BsFillSunFill
              css={theme => ({
                position: 'relative',
                top: '0.6rem',
                left: '0.6rem',

                color: theme.colors.gray900,

                height: `3rem`,
                width: !(themeMode.theme === 'dark') ? `3rem` : '0rem',

                transition: '0.5s',
                transform: !(themeMode.theme === 'dark') ? 'rotate(0deg)' : 'rotate(360deg)',
              })}
            />
            <BsFillMoonFill
              css={theme => ({
                position: 'absolute',
                top: '0.6rem',
                left: '0.6rem',

                color: theme.colors.white,

                height: `3rem`,
                width: themeMode.theme === 'dark' ? `3rem` : '0rem',

                transition: '0.5s',
                transform: themeMode.theme === 'dark' ? 'rotate(0deg)' : 'rotate(360deg)',
              })}
            />
          </ToggleBtn>

          <MenuLink
            css={css`
              margin-right: 1rem;
            `}
            to="/categories"
            aria-label="Category | GW Devlog"
          >
            <HiViewGrid css={styledIcon} />
          </MenuLink>

          <MenuLink to="/about" aria-label="About | GW Devlog">
            <GiOverkill css={styledIcon} />
          </MenuLink>
        </div>
      </div>
    </HeaderBox>
  )
}

const ToggleBtn = styled.div<{ checked: boolean }>`
  position: relative;
  width: 4.2rem;
  height: 4.2rem;
  margin-right: 1rem;

  border-radius: 50%;

  cursor: pointer;

  :hover {
    background-color: ${props => props.theme.colors.hoverBox};
  }
`

const HeaderBox = styled.div`
  position: sticky;
  top: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  width: 100%;
  height: ${headerFooterHeight.pc}rem;

  ${mainGradientAnimation};

  ${mobileMediaQuery} {
    height: ${headerFooterHeight.mobile}rem;
    padding: 0 1.6rem;
  }
`

const HomeLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 2.2rem;
  font-weight: bold;
  color: #ffffff;

  ${pcMediaQuery} {
    padding: 0.6rem;
    border-radius: 0.6rem;
    :hover {
      background-color: ${props => props.theme.colors.hoverBox};
    }
  }

  ${mobileMediaQuery} {
    font-size: 1.8rem;
    font-weight: 600;
  }
`

const MenuLink = styled(Link)`
  ${pcMediaQuery} {
    padding: 0.6rem;
    border-radius: 50%;
    :hover {
      background-color: ${props => props.theme.colors.hoverBox};
    }
  }
`

const styledIcon = css`
  width: 3rem;
  height: 3rem;
  color: #ffffff;

  ${mobileMediaQuery} {
    width: 2.6rem;
    height: 2.6rem;
  }
`

const homeIcon = css`
  ${styledIcon};
  margin-top: -0.2rem;
  margin-right: 0.6rem;

  ${mobileMediaQuery} {
    margin-right: 0.4rem;
  }
`

export default Header
