import React from 'react'
import styled from '@emotion/styled'

import { mobileScreen } from 'styles'

type LayoutProps = {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <LayoutWrapper>{children}</LayoutWrapper>
}

const LayoutWrapper = styled.div`
  width: 72rem;
  margin: 0 auto;

  ${mobileScreen} {
    width: 100%;
    margin: 0;
    padding: 0 1.6rem;
  }
`

export default Layout
