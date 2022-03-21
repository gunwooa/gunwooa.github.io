import React from 'react'
import { graphql } from 'gatsby'
import { IGatsbyImageData, GatsbyImage } from 'gatsby-plugin-image'
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

const ThumbnailImage = styled(GatsbyImage)`
  /* width: 100%; */
`

type Thumbnail = {
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData
  }
}

type Edge = {
  node: {
    frontmatter: {
      categories: string[]
      date: string
      summary: string
      title: string
      thumbnail: Thumbnail
    }
    id: string
  }
}

type IndexPageProps = {
  data: {
    allMarkdownRemark: {
      edges: Edge[]
    }
    file: Thumbnail
  }
}

const IndexPage: React.VFC<IndexPageProps> = function ({
  data: {
    allMarkdownRemark: { edges },
    file: {
      childImageSharp: { gatsbyImageData: profileImage },
    },
  },
}) {
  const {
    node: {
      frontmatter: {
        thumbnail: {
          childImageSharp: { gatsbyImageData },
        },
      },
    },
  } = edges[0]

  console.log(gatsbyImageData)
  console.log(profileImage)

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
      <ThumbnailImage image={gatsbyImageData} alt="Post Item Image" />
      <GatsbyImage image={profileImage} alt="Post Item Image" />
    </div>
  )
}

export const indexQuery = graphql`
  query getPostList {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }) {
      edges {
        node {
          id
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 300, height: 200)
              }
            }
          }
        }
      }
    }
    file(name: { eq: "profile" }) {
      childImageSharp {
        gatsbyImageData(width: 120, height: 120)
      }
    }
  }
`

export default IndexPage
