import React from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import SEO from 'components/SEO'
import ProfileBox from 'components/ProfileBox'
import Divider from 'components/Divider'
import Tags from 'components/Tags'
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
    <>
      <SEO />
      <IndexBox>
        <ProfileBox />
        <Divider marginBottom={4} />
        <PostList>
          {posts.map(({ node }) => {
            const {
              id,
              fields: { slug },
              timeToRead,
              frontmatter,
            } = node

            return (
              <PostLinkItem key={id}>
                <Link to={slug}>
                  <GatsbyImage
                    css={css`
                      max-height: 18rem;
                      border-top-left-radius: 0.8rem;
                      border-top-right-radius: 0.8rem;
                    `}
                    image={frontmatter.thumbnail.childImageSharp.gatsbyImageData}
                    alt="photo"
                    objectFit="cover"
                  />

                  <PostDescriptionBox>
                    <div
                      css={css`
                        > h1 {
                          font-size: 1.8rem;
                          line-height: 1.5;
                        }
                        > p {
                          margin: 2rem 0;
                          font-size: 1.5rem;
                          line-height: 1.5;
                        }
                      `}
                    >
                      <h1>
                        [{frontmatter.category}] {frontmatter.title}
                      </h1>
                      <p>{frontmatter.summary}</p>
                      <Tags tags={frontmatter.tag} />
                    </div>
                    <div
                      css={css`
                        display: flex;
                        justify-content: space-between;
                        margin-top: 2rem;

                        > span {
                          font-size: 1.3rem;
                        }
                      `}
                    >
                      <span>{frontmatter.date}</span>
                      <span>{timeToRead} min read</span>
                    </div>
                  </PostDescriptionBox>
                </Link>
              </PostLinkItem>
            )
          })}
        </PostList>
      </IndexBox>
    </>
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

const PostLinkItem = styled.li`
  display: flex;
  flex-direction: column;

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
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
`

// skip: 1 -> static/resume.md
export const indexQuery = graphql`
  {
    postData: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
      limit: 1000
      skip: 1
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "YYYY-MM-DD")
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

export default IndexPage
