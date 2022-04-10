import React from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'

import { markdownStyle } from 'styles/markdown'
import Divider from 'components/Divider'
import ProfileBox from 'components/ProfileBox'

type AboutPageProps = {
  data: {
    resume: {
      childrenMarkdownRemark: { html: string }[]
    }
  }
}

const AboutPage: React.VFC<AboutPageProps> = ({ data: { resume } }) => {
  return (
    <>
      <ProfileBox />
      <Divider marginBottom={4} />
      <ResumeRenderer dangerouslySetInnerHTML={{ __html: resume.childrenMarkdownRemark[0].html }} />
    </>
  )
}

const ResumeRenderer = styled.main`
  ${markdownStyle};

  strong {
    background: linear-gradient(to top, #54b5db 10%, transparent 40%);
  }
`

export const aboutQuery = graphql`
  {
    resume: file(name: { eq: "resume" }) {
      childrenMarkdownRemark {
        html
      }
    }
  }
`

export default AboutPage
