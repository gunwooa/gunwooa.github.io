import { useStaticQuery, graphql } from 'gatsby'

type SiteMetadata = {
  title: string
  description: string
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
          }
        }
      }
    `,
  )
  return site.siteMetadata
}
