import React from 'react'
import { Global, ThemeProvider } from '@emotion/react'
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'

import Header from './src/components/Layout/Header'
import Body from './src/components/Layout/Body'
import Footer from './src/components/Layout/Footer'
import { theme } from './src/styles'
import { resetStyles } from './src/styles/reset'

deckDeckGoHighlightElement()

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
)

export const wrapPageElement = ({ element }) => (
  <div>
    <Global styles={resetStyles} />
    <Header />
    <Body>{element}</Body>
    <Footer />
  </div>
)
