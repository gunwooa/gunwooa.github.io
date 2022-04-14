import React from 'react'

import { css } from '@emotion/react'

import { colors } from 'styles'

type DividerProps = {
  height?: number
  marginTop?: number
  marginBottom?: number
}

const Divider: React.VFC<DividerProps> = ({ height = 0.1, marginTop = 2, marginBottom = 2 }) => {
  return (
    <div
      css={css`
        width: 100%;
        height: ${height}rem;
        margin-top: ${marginTop}rem;
        margin-bottom: ${marginBottom}rem;
        background-color: ${colors.gray400};
      `}
    />
  )
}

export default Divider
