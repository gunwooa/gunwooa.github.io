import React from 'react'
import { graphql, Link } from 'gatsby'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import SEO from 'components/SEO'
import Layout from 'components/Layout'
import { colors, mainGradientAnimation, mobileMediaQuery, pcMediaQuery } from 'styles'
import { Edges } from 'types'

type CategoriesPageProps = {
  data: {
    categoryData: {
      group: {
        fieldValue: string
        totalCount: number
        edges: Edges
      }[]
    }
  }
}

const CategoriesPage: React.VFC<CategoriesPageProps> = ({
  data: {
    categoryData: { group: categories },
  },
}) => {
  return (
    <Layout>
      <SEO title="Category | GWDevlog" />
      <CategoriesBox>
        <Categories>
          {categories.map((category, index) => {
            const { fieldValue, totalCount, edges } = category
            return (
              <CategoriesItemBox key={index}>
                <CategoriesLeftItem>
                  <CategoriesLITitle>{fieldValue}</CategoriesLITitle>
                  <CategoriesLISubText>{totalCount} posts</CategoriesLISubText>
                </CategoriesLeftItem>

                <CategoriesRightItem>
                  {edges.map(edge => {
                    const {
                      node: { id, fields, frontmatter },
                    } = edge

                    return (
                      <CategoriesRILinkBox key={id} to={fields.slug}>
                        <CategoriesRILinkEmoji>🔎</CategoriesRILinkEmoji>
                        <CategoriesRILinkTitle>
                          {frontmatter.title}
                          <CategoriesRILinkAnimationEmoji className="tooltip-box">
                            👈
                          </CategoriesRILinkAnimationEmoji>
                        </CategoriesRILinkTitle>
                      </CategoriesRILinkBox>
                    )
                  })}
                </CategoriesRightItem>
              </CategoriesItemBox>
            )
          })}
        </Categories>
      </CategoriesBox>
    </Layout>
  )
}

const CategoriesBox = styled.div``

const Categories = styled.ul`
  border-radius: 1.6rem;
  box-shadow: 10px 10px 30px -22px rgba(0, 0, 0, 1);

  ${mobileMediaQuery} {
    box-shadow: 4px 4px 18px -10px rgba(0, 0, 0, 1);
  }
`

const CategoriesItemBox = styled.li`
  display: flex;

  ${pcMediaQuery} {
    // 목차 처음과 끝 모서리 둥글게
    :first-of-type > div {
      border-top-left-radius: 1.6rem;
    }
    :last-of-type > div {
      border-bottom-left-radius: 1.6rem;
    }
    :first-of-type > ul {
      border-top-right-radius: 1.6rem;
    }
    :last-of-type > ul {
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
`

const CategoriesLeftItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 3rem;
  ${mainGradientAnimation};

  ${mobileMediaQuery} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1.4rem;
    border-top-left-radius: 1.2rem;
    border-top-right-radius: 1.2rem;
  }
`
const CategoriesLITitle = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.white};

  ${mobileMediaQuery} {
    font-size: 1.6rem;
  }
`
const CategoriesLISubText = styled.span`
  padding: 1rem 0 0 0.5rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: ${colors.gray100};

  ${mobileMediaQuery} {
    padding: 0;
    font-size: 1.2rem;
  }
`

const CategoriesRightItem = styled.ul`
  flex: 3;
  display: flex;
  flex-direction: column;
  padding: 3rem 3rem 3rem 5rem;
  background-color: ${colors.white};

  ${mobileMediaQuery} {
    padding: 1.4rem;
  }
`
const CategoriesRILinkBox = styled(Link)`
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
`
const linkText = css`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.4rem;
  color: ${colors.black};

  ${mobileMediaQuery} {
    font-size: 1.4rem;
  }
`
const CategoriesRILinkEmoji = styled.span`
  margin-right: 0.8rem;
  ${linkText};
`
const CategoriesRILinkTitle = styled.span`
  position: relative;
  ${linkText};
`
const CategoriesRILinkAnimationEmoji = styled.span`
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
`

export const categoriesQuery = graphql`
  {
    categoryData: allMarkdownRemark(limit: 100) {
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
