import React from 'react'

import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import { css } from '@emotion/react'
import styled from '@emotion/styled'

import SEO from 'app/SEO'

import CommentWidget from 'components/CommentWidget'
import Divider from 'components/Divider'
import Tags from 'components/Tags'

import { useWindowSize } from 'hooks/useWindowSize'

import { Edges } from 'types'

import { colors, layoutWidth, mobileMediaQuery } from 'styles'
import { markdownStyle } from 'styles/markdown'

type PostTemplateProps = {
  data: {
    allMarkdownRemark: {
      edges: Edges
    }
  }
}

const PostTemplate: React.VFC<PostTemplateProps> = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const { width: windowWidth } = useWindowSize()
  const {
    node: { html, timeToRead, frontmatter },
  } = edges[0]
  const tags = frontmatter.tag.map(tag => `#${tag}`).join(' ')

  return (
    <>
      <SEO
        title={`${frontmatter.category} | ${frontmatter.title}`}
        description={`${frontmatter.summary} ${tags}`}
        thumbnail={frontmatter.thumbnail.publicURL}
      />
      <PostTemplateBox>
        <div>
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
          <Tags tags={frontmatter.tag} size={windowWidth < layoutWidth ? 'small' : 'medium'} />
        </div>

        <Divider marginTop={windowWidth < layoutWidth ? 3 : 4} />

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
      </PostTemplateBox>
    </>
  )
}

export default PostTemplate

const PostTemplateBox = styled.div``

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
              publicURL
            }
          }
        }
      }
    }
  }
`
