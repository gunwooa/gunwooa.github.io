import React from 'react'
import styled from '@emotion/styled'

import { mobileMediaQuery, layoutWidth, headerFooterHeight } from 'styles'

type LayoutProps = {}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <LayoutWrapper>{children}</LayoutWrapper>
}

const LayoutWrapper = styled.div`
  width: ${layoutWidth}rem;
  min-height: calc(100vh - ${headerFooterHeight.pc * 2}rem);
  margin: 0 auto;

  ${mobileMediaQuery} {
    width: 100%;
    min-height: calc(100vh - ${headerFooterHeight.mobile * 2}rem);
    padding: 0 1.6rem;
  }
`

export default Layout
