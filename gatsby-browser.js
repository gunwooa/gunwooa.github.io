import React from 'react'
import { Global } from '@emotion/react'

import { resetStyles } from './src/styles/reset'

export const wrapPageElement = ({ element }) => (
  <>
    <Global styles={resetStyles} />
    <div>{element}</div>
  </>
)
