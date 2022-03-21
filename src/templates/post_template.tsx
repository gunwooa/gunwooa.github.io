import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'

type Edge = {
  node: {
    html: string
  }
}

type PostTemplateProps = {
  data: {
    allMarkdownRemark: {
      edges: Edge[]
    }
  }
}

const PostTemplate: React.FC<PostTemplateProps> = function ({
  data: {
    allMarkdownRemark: { edges },
  },
}) {
  const {
    node: { html },
  } = edges[0]

  return (
    <div
      css={css`
        // Renderer Style
        display: flex;
        flex-direction: column;
        width: 768px;
        margin: 0 auto;
        padding: 100px 0;
        word-break: break-all;

        // Markdown Style
        line-height: 1.8;
        font-weight: 400;

        // Apply Padding Attribute to All Elements
        p {
          padding: 3px 0;
          font-size: 1.6rem;
        }

        // Adjust Heading Element Style
        h1,
        h2,
        h3 {
          font-weight: 800;
          margin-bottom: 30px;
        }

        * + h1,
        * + h2,
        * + h3 {
          margin-top: 80px;
        }

        hr + h1,
        hr + h2,
        hr + h3 {
          margin-top: 0;
        }

        h1 {
          font-size: 3rem;
        }

        h2 {
          font-size: 2.5rem;
        }

        h3 {
          font-size: 2rem;
        }

        // Adjust Quotation Element Style
        blockquote {
          margin: 30px 0;
          padding: 5px 15px;
          border-left: 2px solid #000000;
          font-weight: 800;
        }

        // Adjust List Element Style
        ol,
        ul {
          margin-left: 20px;
          padding: 30px 0;
        }

        // Adjust Horizontal Rule style
        hr {
          border: 1px solid #000000;
          margin: 100px 0;
        }

        // Adjust Link Element Style
        a {
          color: #4263eb;
          text-decoration: underline;
        }

        // Adjust Code Style
        pre[class*='language-'] {
          margin: 30px 0;
          padding: 15px;
          font-size: 1.5rem;

          ::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.5);
            border-radius: 3px;
          }
        }

        code[class*='language-'],
        pre[class*='language-'] {
          tab-size: 2;
        }
      `}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default PostTemplate

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`
