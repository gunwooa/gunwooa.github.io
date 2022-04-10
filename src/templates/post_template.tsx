import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'
import { GatsbyImage } from 'gatsby-plugin-image'

import { markdownStyle } from 'styles/markdown'
import { Edges } from 'types'
import { colors, mobileMediaQuery, layoutWidth } from 'styles'
import Tags from 'components/Tags'
import Divider from 'components/Divider'
import CommentWidget from 'components/CommentWidget'

type PostTemplateProps = {
  data: {
    allMarkdownRemark: {
      edges: Edges
    }
  }
}

const SCREEN_WIDTH = typeof window !== 'undefined' ? window.innerWidth / 10 : 0

const PostTemplate: React.VFC<PostTemplateProps> = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const {
    node: { html, timeToRead, frontmatter },
  } = edges[0]

  return (
    <div>
      <div css={css``}>
        <GatsbyImage
          css={css`
            max-height: 40rem;
            border-radius: 1.2rem;

            ${mobileMediaQuery} {
              max-height: 20rem;
            }
          `}
          image={frontmatter.thumbnail.childImageSharp.gatsbyImageData}
          alt="photo"
          objectFit="cover"
        />

        <h1
          css={css`
            margin-top: 4rem;
            font-size: 4.6rem;
            line-height: 1.3;
            color: ${colors.gray800};

            ${mobileMediaQuery} {
              margin-top: 3rem;
              font-size: 3rem;
            }
          `}
        >
          [{frontmatter.category}] {frontmatter.title}
        </h1>

        <p
          css={css`
            display: flex;
            margin: 2rem 0;
            font-size: 1.6rem;
            color: ${colors.gray700};

            ${mobileMediaQuery} {
              margin: 1.6rem 0;
              font-size: 1.4rem;
            }
          `}
        >
          {frontmatter.date} · {timeToRead} min read
        </p>
        <Tags tags={frontmatter.tag} size={SCREEN_WIDTH < layoutWidth ? 'small' : 'medium'} />
      </div>

      <Divider marginTop={SCREEN_WIDTH < layoutWidth ? 3 : 4} />

      <div
        css={css`
          ${markdownStyle};
          margin-bottom: 8rem;

          ${mobileMediaQuery} {
            margin-bottom: 5rem;
          }
        `}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <CommentWidget />
    </div>
  )
}

export default PostTemplate

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          timeToRead
          frontmatter {
            date(formatString: "YYYY.MM.DD")
            category
            title
            summary
            tag
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 768)
              }
            }
          }
        }
      }
    }
  }
`
