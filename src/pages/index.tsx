import React from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

const Text1 = styled.div<{ disable: boolean }>`
  font-size: 2rem;
  font-weight: 700;
  text-decoration: ${({ disable }) => (disable ? 'line-through' : 'none')};
`

const Text2 = styled('div')<{ disable: boolean }>(({ disable }) => ({
  fontSize: '2rem',
  color: 'blue',
  textDecoration: disable ? 'line-through' : 'none',
}))

const IndexPage: React.VFC = function () {
  return (
    <div>
      <p
        css={css`
          font-size: 2rem;
        `}
      >
        안녕
      </p>

      <Text1 disable={true}>나는 천제다</Text1>
      <Text2 disable={false}>나는 천제다</Text2>
    </div>
  )
}

export default IndexPage
