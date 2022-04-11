import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { useSiteMetadata } from 'hooks/use-site-metadata'
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
        // {
        //   name: 'google-site-verification',
        //   content: 'c1xO-enkE_JmnbHAdhBslQ12uqZpBfCDfSgZ8yIoL0U',
        // },
        // {
        //   name: 'naver-site-verification',
        //   content: '2cc40621eb11418be5791db057b14a2d2cc2800c',
        // },
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
          content: colors.blue100,
        },
      ]}
      htmlAttributes={{ lang: 'ko' }}
    />
  )
}

export default SEO
