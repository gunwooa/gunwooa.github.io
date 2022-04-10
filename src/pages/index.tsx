import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { Edges } from 'types'
import { layoutWidth, mobileMediaQuery, pcMediaQuery } from 'styles'

type IndexPageProps = {
  data: {
    postData: {
      edges: Edges
    }
  }
}

const THUMBNAIL_WIDTH = layoutWidth / 2 - 1

const IndexPage: React.VFC<IndexPageProps> = ({
  data: {
    postData: { edges: posts },
  },
}) => {
  return (
    <IndexBox>
      <PostList>
        {posts.map(({ node }) => {
          const {
            id,
            fields: { slug },
            timeToRead,
            frontmatter,
          } = node

          return (
            <PostLinkItem key={id} to={slug}>
              {frontmatter.thumbnail && (
                <GatsbyImage
                  css={css`
                    border-top-left-radius: 0.8rem;
                    border-top-right-radius: 0.8rem;
                    object-fit: cover;
                  `}
                  image={frontmatter.thumbnail.childImageSharp.gatsbyImageData}
                  alt="photo"
                />
              )}

              <PostDescriptionBox>
                <h1>
                  [{frontmatter.category}] {frontmatter.title}
                </h1>
                <p>{frontmatter.summary}</p>
                <div>
                  <span>{frontmatter.date}</span>
                  <span>{timeToRead} min read</span>
                </div>
              </PostDescriptionBox>
            </PostLinkItem>
          )
        })}
      </PostList>
    </IndexBox>
  )
}

const IndexBox = styled.div``

const PostList = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  ${mobileMediaQuery} {
    flex-direction: column;
    flex-wrap: nowrap;
  }
`

const PostLinkItem = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${THUMBNAIL_WIDTH}rem;
  margin-bottom: 2rem;
  border-radius: 0.8rem;
  box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1);

  ${pcMediaQuery} {
    transition: transform 0.2s ease-in-out;

    :hover {
      transform: scale(1.05) translateY(-1rem);
      cursor: pointer;
    }
  }

  ${mobileMediaQuery} {
    width: 100%;
  }
`

const PostDescriptionBox = styled.div`
  padding: 2rem;

  > h1 {
    margin-bottom: 1rem;
    font-size: 1.8rem;
    line-height: 1.5;
  }

  > p {
    margin-bottom: 2rem;
    font-size: 1.5rem;
    line-height: 1.5;
  }

  > div {
    display: flex;
    justify-content: space-between;
  }
  > div span {
    font-size: 1.3rem;
  }
`

export const indexQuery = graphql`
  {
    postData: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
      limit: 1000
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          timeToRead
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            summary
            category
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 700)
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
