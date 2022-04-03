import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { useSiteMetadata } from 'hooks/use-site-metadata'
import { Edges } from 'types'
import { layoutWidth, mobileMediaQuery } from 'styles'

type IndexPageProps = {
  data: {
    postData: {
      edges: Edges
    }
  }
}

const THUMBNAIL_WIDTH = layoutWidth / 2 - 2
const BOX_PADDING = layoutWidth / 50
const TITLE_FONT_SIZE = layoutWidth / 40 > 2 ? 2 : layoutWidth / 40
const SUMMARY_FONT_SIZE = layoutWidth / 50 > 1.8 ? 1.8 : layoutWidth / 50
const DATE_FONT_SIZE = layoutWidth / 56 > 1.4 ? 1.4 : layoutWidth / 56

console.log(THUMBNAIL_WIDTH)

const IndexPage: React.VFC<IndexPageProps> = ({
  data: {
    postData: { edges: posts },
  },
}) => {
  const { title, description } = useSiteMetadata()

  console.log(title)
  console.log(description)

  console.log(posts)

  return (
    <div>
      <ul
        css={css`
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;

          ${mobileMediaQuery} {
            flex-direction: column;
            flex-wrap: nowrap;
          }
        `}
      >
        {posts.map(post => {
          const {
            node: {
              id,
              fields: { slug },
              timeToRead,
              frontmatter,
            },
          } = post

          return (
            <li
              css={css`
                width: ${THUMBNAIL_WIDTH}rem;
                margin-bottom: 2rem;

                border-radius: 0.8rem;
                box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.1);

                ${mobileMediaQuery} {
                  width: 100%;
                }
              `}
              key={id}
            >
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  /* min-height: 20rem; */
                `}
              >
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

                <div
                  css={css`
                    /* padding: 1rem; */
                    padding: ${BOX_PADDING}rem;
                  `}
                >
                  <h1
                    css={css`
                      margin-bottom: 1rem;
                      font-size: ${TITLE_FONT_SIZE}rem;
                    `}
                  >
                    [{frontmatter.category}] {frontmatter.title}
                  </h1>
                  <p
                    css={css`
                      margin-bottom: 2rem;
                      font-size: ${SUMMARY_FONT_SIZE}rem;
                    `}
                  >
                    {frontmatter.summary}
                  </p>
                  <div
                    css={css`
                      display: flex;
                      justify-content: space-between;
                    `}
                  >
                    <span
                      css={css`
                        font-size: ${DATE_FONT_SIZE}rem;
                      `}
                    >
                      {frontmatter.date}
                    </span>

                    <span
                      css={css`
                        font-size: ${DATE_FONT_SIZE}rem;
                      `}
                    >
                      {timeToRead} min read
                    </span>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export const ql = graphql`
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
