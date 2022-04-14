import React from 'react'
import { Global } from '@emotion/react'
import styled from '@emotion/styled'

import Header from 'components/Layout/Header'
import Body from 'components/Layout/Body'
import Footer from 'components/Layout/Footer'
import { resetStyles } from 'styles/reset'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Global styles={resetStyles} />
      <Header />
      <BodyWrapper>
        <Body>{children}</Body>
      </BodyWrapper>
      <Footer />
    </>
  )
}

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  color: ${props => props.theme.colors.darkModeColor};
  background-color: ${props => props.theme.colors.darkModeBackground};
`

export default Layout
