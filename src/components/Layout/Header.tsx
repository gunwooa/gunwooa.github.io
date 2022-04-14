import React from 'react'
import { GiOverkill } from 'react-icons/gi'
import { HiViewGrid } from 'react-icons/hi'
import { IoLogoBuffer } from 'react-icons/io'

import { Link } from 'gatsby'

import { css } from '@emotion/react'
import styled from '@emotion/styled'

import ThemeModeToggleBtn from 'components/ThemeModeToggleBtn'

import { useWindowSize } from 'hooks/useWindowSize'

import { headerFooterHeight, layoutWidth, mobileMediaQuery, pcMediaQuery } from 'styles'

const Header: React.VFC = () => {
  const { width: windowWidth } = useWindowSize()
  return (
    <HeaderBox className="header">
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
          <ThemeModeToggleBtn
            size={windowWidth > layoutWidth ? 2.8 : 2.4}
            padding={windowWidth > layoutWidth ? 0.8 : 0}
          />

          <MenuLink
            css={css`
              margin-left: 1rem;
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

const HeaderBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: ${headerFooterHeight.pc}rem;

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
