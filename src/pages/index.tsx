import React from 'react'
import { graphql } from 'gatsby'
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

type edge = {
  node: {
    frontmatter: {
      categories: string[]
      date: string
      summary: string
      title: string
    }
    id: string
  }
}

type IndexPageProps = {
  data: {
    allMarkdownRemark: {
      edges: edge[]
    }
  }
}

const IndexPage: React.VFC<IndexPageProps> = function ({ data }) {
  console.log(data.allMarkdownRemark.edges[0].node.frontmatter.categories)

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

export const indexQuery = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
            date
            summary
            categories
          }
        }
      }
    }
  }
`

export default IndexPage
