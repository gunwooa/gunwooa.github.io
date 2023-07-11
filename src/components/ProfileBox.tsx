import React from 'react'
import { SiLinkedin, SiNotion } from 'react-icons/si'
import { VscGithub } from 'react-icons/vsc'

import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import { css } from '@emotion/react'

import { Thumbnail } from 'types'

import { colors, mobileMediaQuery, pcMediaQuery } from 'styles'

const CONNECTS = [
  {
    label: 'linkedin',
    url: 'https://www.linkedin.com/in/%EA%B1%B4%EC%9A%B0-%EC%9E%A5-824a24236',
    icon: SiLinkedin,
    color: '#0B65C2',
  },
  { label: 'github', url: 'https://github.com/gunwooa', icon: VscGithub, color: '#000000' },
]

const ProfileBox: React.VFC = () => {
  const { profile } = useStaticQuery<{ profile: Thumbnail }>(
    graphql`
      {
        profile: file(name: { eq: "profile" }) {
          childImageSharp {
            gatsbyImageData(width: 150)
          }
        }
      }
    `,
  )

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        padding: 1rem;

        ${mobileMediaQuery} {
          flex-direction: column;
          padding: 0;
        }
      `}
    >
      <GatsbyImage
        css={css`
          isolation: isolate; // 사파리 브라우저 border-radius 동작되게 하는 속성
          border-radius: 50%;
          box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.8);
        `}
        image={profile.childImageSharp.gatsbyImageData}
        alt="photo"
      />

      <div
        css={css`
          display: flex;
          flex-direction: column;
          margin-left: 2.4rem;

          ${mobileMediaQuery} {
            margin-left: 0;
          }
        `}
      >
        <div>
          <h3
            css={css`
              font-size: 2.2rem;
              color: ${colors.gray900};

              ${mobileMediaQuery} {
                margin-top: 2rem;
                font-size: 1.8rem;
                text-align: center;
              }
            `}
          >
            장건우 (GWD)
          </h3>
          <p
            css={css`
              margin: 1.6rem 0;
              font-size: 1.8rem;
              line-height: 1.5;
              color: ${colors.gray700};

              ${mobileMediaQuery} {
                font-size: 1.5rem;
                text-align: center;
              }
            `}
          >
            코딩하기 딱 좋은 날씨네 ⛅️
          </p>
        </div>

        <ul
          css={css`
            display: flex;

            ${mobileMediaQuery} {
              justify-content: center;
            }
          `}
        >
          {CONNECTS.map(item => (
            <li
              key={item.label}
              css={css`
                margin-right: 2rem;

                ${pcMediaQuery} {
                  transition: transform 0.1s ease-in-out;

                  :hover {
                    transform: scale(1.1) translateY(-0.4rem);
                    cursor: pointer;
                  }
                }
              `}
            >
              <a href={item.url} target="_blank" rel="noreferrer noopener" aria-label={item.label}>
                <item.icon
                  className="profile-icon"
                  css={css`
                    width: 2.4rem;
                    height: 2.4rem;
                    color: ${item.color};
                  `}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProfileBox
