import React from 'react'
import type { GatsbyBrowser } from 'gatsby'
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'

import StoreProvider from 'providers/StoreProvider'
import EmotionThemeProvider from 'providers/EmotionThemeProvider'

deckDeckGoHighlightElement()

const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => {
  return (
    <StoreProvider>
      <EmotionThemeProvider>{element}</EmotionThemeProvider>
    </StoreProvider>
  )
}

export default wrapRootElement
