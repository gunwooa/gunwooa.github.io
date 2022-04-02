import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { pcMediaQuery, mobileMediaQuery, layoutWidth, headerFooterHeight } from 'styles'

const Footer: React.VFC = () => {
  const today = new Date()

  return (
    <FooterBox>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: ${layoutWidth}rem;
        `}
      >
        <div>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="/categories">Category</StyledLink>
          <StyledLink to="/about">About</StyledLink>
        </div>

        <div
          css={css`
            display: flex;

            ${mobileMediaQuery} {
              flex-direction: column;
              align-items: flex-end;
            }
          `}
        >
          <span
            css={css`
              ${fontSize};
              margin-right: 0.3rem;

              ${mobileMediaQuery} {
                margin-right: 0;
                margin-bottom: 0.4rem;
              }
            `}
          >
            © {today.getFullYear()} 장건우
          </span>

          <div>
            <span css={fontSize}>powered by&nbsp;</span>

            <a
              css={css`
                ${fontSize};
                font-weight: bold;
                color: #542c85;
              `}
              href="https://www.gatsbyjs.com/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Gatsby"
            >
              Gatsby
            </a>
          </div>
        </div>
      </div>
    </FooterBox>
  )
}

const FooterBox = styled.footer`
  display: flex;
  justify-content: center;
  width: 100%;
  height: ${headerFooterHeight.pc}rem;
  background-color: rgba(98, 92, 96, 0.1);

  ${mobileMediaQuery} {
    height: ${headerFooterHeight.mobile}rem;
    padding: 0 1.6rem;
  }
`

const StyledLink = styled(Link)`
  margin-right: 2rem;
  font-size: 1.4rem;
  font-weight: bold;

  :nth-last-of-type(1) {
    margin-right: 0;
  }

  ${pcMediaQuery} {
    :hover {
      color: #448aff;
    }
  }

  ${mobileMediaQuery} {
    margin-right: 1rem;
    font-size: 1.2rem;
  }
`

const fontSize = css`
  font-size: 1.2rem;
  ${mobileMediaQuery} {
    font-size: 1.1rem;
  }
`

export default Footer
