import React from 'react'
import { Global } from '@emotion/react'

import Header from 'components/Layout/Header'
import Body from 'components/Layout/Body'
import Footer from 'components/Layout/Footer'
import { resetStyles } from 'styles/reset'

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Global styles={resetStyles} />
      <Header />
      <Body>{children}</Body>
      <Footer />
    </>
  )
}

export default Layout
