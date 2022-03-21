import 'prismjs/themes/prism-tomorrow.css'

import React from 'react'
import { Global, ThemeProvider } from '@emotion/react'

import Header from './src/components/Layout/Header'
import Body from './src/components/Layout/Body'
import Footer from './src/components/Layout/Footer'
import { theme } from './src/styles'
import { resetStyles } from './src/styles/reset'

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
)

export const wrapPageElement = ({ element }) => (
  <>
    <Global styles={resetStyles} />
    <Header />
    <Body>{element}</Body>
    <Footer />
  </>
)
