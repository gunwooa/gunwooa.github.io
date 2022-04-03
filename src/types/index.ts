import { IGatsbyImageData } from 'gatsby-plugin-image'

export type Thumbnail = {
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData
  }
}

export type Frontmatter = {
  title: string
  date: string
  category: string
  summary: string
  thumbnail: Thumbnail | null
}

export type Edges = {
  node: {
    id: string
    fields: {
      slug: string
    }
    timeToRead: number
    frontmatter: Frontmatter
  }
}[]
