import { useStaticQuery, graphql } from 'gatsby'

export type SiteMetadata = {
  title: string
  description: string
  author: string
  email: string
  siteUrl: string
}

export const useSiteMetadata = (): SiteMetadata => {
  const { site } = useStaticQuery<{
    site: {
      siteMetadata: SiteMetadata
    }
  }>(
    graphql`
      {
        site {
          siteMetadata {
            title
            description
            author
            email
            siteUrl
          }
        }
      }
    `,
  )
  return site.siteMetadata
}
