import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

import SEO from 'components/SEO'
import Layout from 'components/Layout'
import { mobileMediaQuery } from 'styles'

const NotFoundPage: React.VFC = () => {
  return (
    <Layout>
      <SEO title="404 | GWDevlog" />
      <NotFoundPageWrapper>
        <NotFoundText>404</NotFoundText>
        <NotFoundDescription>
          찾을 수 없는 페이지입니다. <br />
          다른 콘텐츠를 보러 가보시겠어요?
        </NotFoundDescription>
        <GoToMainButton to="/">홈으로</GoToMainButton>
      </NotFoundPageWrapper>
    </Layout>
  )
}

const NotFoundPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 18rem;

  ${mobileMediaQuery} {
    padding-top: 12rem;
  }
`

const NotFoundText = styled.div`
  font-size: 15rem;
  font-weight: 800;

  ${mobileMediaQuery} {
    font-size: 10rem;
  }
`

const NotFoundDescription = styled.div`
  font-size: 2.5rem;
  text-align: center;
  line-height: 1.3;

  ${mobileMediaQuery} {
    font-size: 2rem;
  }
`

const GoToMainButton = styled(Link)`
  margin-top: 3rem;
  font-size: 2rem;
  text-decoration: underline;
`

export default NotFoundPage
