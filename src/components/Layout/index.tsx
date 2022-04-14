import React, { useContext } from 'react'

import { Global } from '@emotion/react'
import styled from '@emotion/styled'

import { StoreContext } from 'providers/StoreProvider'
import { Theme } from 'providers/StoreProvider/themeMode'

import Body from 'components/Layout/Body'
import Footer from 'components/Layout/Footer'
import Header from 'components/Layout/Header'

import { mainGradientAnimation } from 'styles'
import { resetStyles } from 'styles/reset'

const Layout: React.FC = ({ children }) => {
  const {
    themeMode: { theme },
  } = useContext(StoreContext)

  return (
    <>
      <Global styles={resetStyles} />
      <HeaderWrapper themeMode={theme}>
        <Header />
      </HeaderWrapper>
      <BodyWrapper themeMode={theme}>
        <Body>{children}</Body>
      </BodyWrapper>
      <FooterWrapper themeMode={theme}>
        <Footer />
      </FooterWrapper>
    </>
  )
}

const HeaderWrapper = styled.div<{ themeMode: Theme }>`
  position: sticky;
  top: 0;
  z-index: 99;

  .header {
    ${({ themeMode }) => themeMode === 'light' && mainGradientAnimation};
    background-color: ${({ theme, themeMode }) => themeMode === 'dark' && theme.colors.gray800};
  }
`

const BodyWrapper = styled.div<{ themeMode: Theme }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.5s ease-in-out;

  background-color: ${({ theme, themeMode }) => (themeMode === 'dark' ? theme.colors.gray900 : '')};

  h1,
  h2,
  h3,
  p,
  li,
  span {
    color: ${({ theme, themeMode }) => (themeMode === 'dark' ? theme.colors.white : '')};
  }

  .profile-icon {
    color: ${({ theme, themeMode }) => (themeMode === 'dark' ? theme.colors.white : '')};
  }

  .post-card {
    background-color: ${({ theme, themeMode }) =>
      themeMode === 'dark' ? theme.colors.gray800 : ''};
  }

  .tag {
    ${({ themeMode }) => themeMode === 'light' && mainGradientAnimation};
    background-color: ${({ theme, themeMode }) =>
      themeMode === 'dark' ? theme.colors.gray700 : ''};
  }

  .category-title-box {
    ${({ themeMode }) => themeMode === 'light' && mainGradientAnimation};
    background-color: ${({ theme, themeMode }) =>
      themeMode === 'dark' ? theme.colors.gray800 : ''};
  }

  .contents-title-box {
    background-color: ${({ theme, themeMode }) =>
      themeMode === 'dark' ? theme.colors.gray700 : ''};
  }
`
const FooterWrapper = styled.div<{ themeMode: Theme }>`
  .footer {
    background-color: ${({ theme, themeMode }) =>
      themeMode === 'dark' ? theme.colors.gray700 : ''};
  }

  a,
  span {
    color: ${({ theme, themeMode }) => (themeMode === 'dark' ? theme.colors.white : '')};
  }
`

export default Layout
