import React from 'react'
import type { GatsbyBrowser } from 'gatsby'
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'

import EmotionThemeProvider from './EmotionThemeProvider'

deckDeckGoHighlightElement()

const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => {
  return <EmotionThemeProvider>{element}</EmotionThemeProvider>
}

export default wrapRootElement
