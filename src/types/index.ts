import { IGatsbyImageData } from 'gatsby-plugin-image'

export type Thumbnail = {
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData
  }
  publicURL: string
}

export type Frontmatter = {
  title: string
  date: string
  category: string
  summary: string
  tag: string[]
  thumbnail: Thumbnail
}

export type Edges = {
  node: {
    id: string
    fields: {
      slug: string
    }
    html: string
    timeToRead: number
    frontmatter: Frontmatter
  }
}[]
