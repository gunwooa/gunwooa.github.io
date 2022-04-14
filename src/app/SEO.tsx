import React from 'react'
import Helmet from 'react-helmet'

import { graphql, useStaticQuery } from 'gatsby'

import { useSiteMetadata } from 'hooks/useGetSiteMetadata'

import { colors } from 'styles'

type SEOProps = {
  title?: string
  description?: string
  thumbnail?: string
}

const SEO: React.VFC<SEOProps> = ({ title, description, thumbnail }) => {
  const siteMetadata = useSiteMetadata()
  const { file: cover } = useStaticQuery<{
    file: {
      publicURL: string
    }
  }>(
    graphql`
      {
        file(name: { eq: "cover" }) {
          publicURL
        }
      }
    `,
  )

  const SEOTitle: string = title || siteMetadata.title
  const SEODescription: string = description || siteMetadata.description
  const SEOImg: string = thumbnail || cover.publicURL

  return (
    <Helmet
      title={SEOTitle}
      meta={[
        {
          name: 'google-site-verification',
          content: 'IoIuxRwQKonoW-xGNha5h4R1sLTXfbT9lEQyPhcUOvc',
        },
        {
          name: 'naver-site-verification',
          content: '43f272ca8d2013b5b4612decaaa99787b67c9d76',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
        {
          httpEquiv: 'Content-Type',
          content: 'text/html;charset=UTF-8',
        },
        {
          name: 'description',
          content: SEODescription,
        },
        {
          name: 'keywords',
          content:
            'Frontend, HTML, CSS, JavaScript, ES6, TypeScript, React, Next.JS, GitHub, ReactNative, Gatsby, Development, AWS',
        },
        {
          name: 'author',
          content: siteMetadata.author,
        },
        {
          property: 'og:title',
          content: SEOTitle,
        },
        {
          property: 'og:description',
          content: SEODescription,
        },
        {
          property: 'og:image',
          content: SEOImg,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:site_name',
          content: SEOTitle,
        },
        {
          name: 'twitter:title',
          content: SEOTitle,
        },
        {
          name: 'twitter:description',
          content: SEODescription,
        },
        {
          name: 'twitter:image',
          content: SEOImg,
        },
        {
          property: 'email',
          content: siteMetadata.email,
        },
        {
          name: 'theme-color',
          content: colors.white,
        },
      ]}
      htmlAttributes={{ lang: 'ko' }}
    />
  )
}

export default SEO
