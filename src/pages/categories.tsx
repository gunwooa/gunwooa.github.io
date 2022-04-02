import React from 'react'
import { graphql, Link } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { colors, mainGradientAnimation, mobileMediaQuery, pcMediaQuery } from 'styles'

type Thumbnail = {
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData
  }
}

type Frontmatter = {
  title: string
  date: string
  summary: string
  thumbnail: Thumbnail
}

type Edge = {
  node: {
    id: string
    fields: {
      slug: string
    }
    frontmatter: Frontmatter
  }
}

type category = {
  fieldValue: string
  totalCount: number
  edges: Edge[]
}

type CategoriesPageProps = {
  data: {
    categories: {
      group: category[]
    }
  }
}

const CategoriesPage: React.VFC<CategoriesPageProps> = ({ data }) => {
  const {
    categories: { group: categories },
  } = data

  console.log(categories)

  return (
    <div
      css={css`
        padding: 5rem 0 10rem 0;

        ${mobileMediaQuery} {
          padding: 3rem 0 6rem 0;
        }
      `}
    >
      <ul
        css={css`
          border-radius: 1.6rem;
          box-shadow: 10px 10px 30px -22px rgba(0, 0, 0, 1);

          ${mobileMediaQuery} {
            box-shadow: 4px 4px 18px -10px rgba(0, 0, 0, 1);
          }
        `}
      >
        {categories.map((category, index) => {
          const { fieldValue, totalCount, edges } = category
          return (
            <li
              css={css`
                display: flex;

                ${pcMediaQuery} {
                  // 목차 처음과 끝 모서리 둥글게
                  :first-child > div {
                    border-top-left-radius: 1.6rem;
                  }
                  :last-child > div {
                    border-bottom-left-radius: 1.6rem;
                  }
                  :first-child > ul {
                    border-top-right-radius: 1.6rem;
                  }
                  :last-child > ul {
                    border-bottom-right-radius: 1.6rem;
                  }

                  // 목차 아이템 사이 line
                  :not(:last-child) {
                    border-bottom: 0.05rem solid ${colors.gray400};
                  }
                }

                ${mobileMediaQuery} {
                  flex-direction: column;
                }
              `}
              key={index}
            >
              <div
                css={css`
                  flex: 1;
                  display: flex;
                  flex-direction: column;
                  padding: 3rem;

                  ${mainGradientAnimation};
                  /* border-radius: 1.6rem; */

                  ${mobileMediaQuery} {
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.4rem;
                    border-top-left-radius: 1.2rem;
                    border-top-right-radius: 1.2rem;
                  }
                `}
              >
                <span
                  css={css`
                    font-size: 2rem;
                    font-weight: 700;
                    color: ${colors.white};

                    ${mobileMediaQuery} {
                      font-size: 1.6rem;
                    }
                  `}
                >
                  {fieldValue}
                </span>
                <span
                  css={css`
                    padding: 1rem 0 0 0.5rem;
                    font-size: 1.4rem;
                    font-weight: 500;
                    color: ${colors.gray200};

                    ${mobileMediaQuery} {
                      padding: 0;
                      font-size: 1.2rem;
                    }
                  `}
                >
                  {totalCount} lessons
                </span>
              </div>

              <ul
                css={css`
                  flex: 3;
                  display: flex;
                  flex-direction: column;
                  padding: 3rem 3rem 3rem 5rem;
                  background-color: ${colors.white};

                  ${mobileMediaQuery} {
                    padding: 1.4rem;
                  }
                `}
              >
                {edges.map(edge => {
                  const {
                    node: { id, fields, frontmatter },
                  } = edge

                  return (
                    <Link
                      key={id}
                      css={css`
                        display: flex;
                        padding: 1.2rem 0;

                        ${pcMediaQuery} {
                          :hover > span {
                            font-weight: 600;
                            color: ${colors.gray700};
                          }

                          :hover .tooltip-box {
                            display: block;
                          }
                        }

                        ${mobileMediaQuery} {
                          padding: 1rem 0;
                        }
                      `}
                      to={fields.slug}
                    >
                      <span
                        css={css`
                          margin-right: 0.8rem;
                          ${linkText};
                        `}
                      >
                        🔎
                      </span>
                      <span
                        css={css`
                          position: relative;
                          ${linkText};
                        `}
                      >
                        {frontmatter.title}
                        <span
                          className="tooltip-box"
                          css={css`
                            position: absolute;
                            display: none;
                            font-size: 2.2rem;

                            @keyframes loop {
                              0% {
                                top: 0px;
                                right: -4rem;
                              }
                              50% {
                                top: 0px;
                                right: -2.4rem;
                              }
                              100% {
                                top: 0px;
                                right: -4rem;
                              }
                            }

                            animation: loop 0.8s linear infinite;
                          `}
                        >
                          👈
                        </span>
                      </span>
                    </Link>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const linkText = css`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.4rem;
  color: ${colors.black};

  ${mobileMediaQuery} {
    font-size: 1.4rem;
  }
`

export const categoriesQuery = graphql`
  query {
    categories: allMarkdownRemark(limit: 100) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  }
`

export default CategoriesPage
